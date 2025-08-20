// WebGL-based media compositor with shader-driven border and rounded corners.
// Attach the returned ref to a <video> or <img>. The hook will overlay a canvas,
// draw the media via a fragment shader, apply a dynamic four-edge gradient stroke,
// and clip only the right corners by default.

import { useEffect, useRef } from 'react';

function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }

export default function useCornerColors({
  borderWidth = 8,         // stroke width in CSS pixels
  radiusRight = 19,        // px radius for right corners
  radiusLeft = 0,          // px radius for left corners
  sampleEveryMs = 240,     // edge color sampling cadence
  useVideoFrameAPI = true, // requestVideoFrameCallback when available
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isVideo = el.tagName === 'VIDEO';
    const parent = el.parentElement || el;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true, antialias: true });
    if (!gl) return;

    // Position overlay canvas exactly over the media
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  parent.style.position = parent.style.position || 'relative';
  // Mark parent for CSS overrides (disable old CSS border/background)
  parent.dataset.glcomposite = '1';
  // Place canvas early so controls/badges render above it
  if (parent.firstChild) parent.insertBefore(canvas, parent.firstChild);
  else parent.appendChild(canvas);

    // Hide source element visually (we'll draw it in the shader)
    const prevOpacity = el.style.opacity;
    el.style.opacity = '0';
    // Keep autoplay constraints for video
    if (isVideo) {
      try { el.muted = true; el.playsInline = true; el.autoplay = true; } catch {}
    }

    const vsSource = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = 0.5 * (a_pos + 1.0);
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;
  const fsSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform sampler2D u_tex;
      uniform vec2 u_res;          // canvas size in px
      uniform vec2 u_texRes;       // media's natural size in px
      uniform float u_border;      // px
      uniform float u_rLeft;       // px
      uniform float u_rRight;      // px
      uniform vec3 u_top;          // edge colors
      uniform vec3 u_right;
      uniform vec3 u_bottom;
      uniform vec3 u_left;

      // Convert px params to normalized UV space accounting for aspect
      vec2 pxToUV(vec2 px) { return px / u_res; }

      // Mask for a 0..1 quad with asymmetric radii: left corners rL, right corners rR
      float insideRoundedRect(vec2 uv, float rL, float rR) {
        // Base inside for axis-aligned rectangle 0..1
        float inBase = step(0.0, uv.x) * step(0.0, uv.y) * step(uv.x, 1.0) * step(uv.y, 1.0);
        // Right-top corner arc
        if (rR > 0.0 && uv.x > 1.0 - rR && uv.y < rR) {
          vec2 c = vec2(1.0 - rR, rR);
          return step(length(uv - c), rR);
        }
        // Right-bottom corner arc
        if (rR > 0.0 && uv.x > 1.0 - rR && uv.y > 1.0 - rR) {
          vec2 c = vec2(1.0 - rR, 1.0 - rR);
          return step(length(uv - c), rR);
        }
        // Left corners (rL may be zero)
        if (rL > 0.0) {
          if (uv.x < rL && uv.y < rL) {
            vec2 c = vec2(rL, rL);
            return step(length(uv - c), rL);
          }
          if (uv.x < rL && uv.y > 1.0 - rL) {
            vec2 c = vec2(rL, 1.0 - rL);
            return step(length(uv - c), rL);
          }
        }
        return inBase;
      }

      vec3 edgeGradient(vec2 uv) {
        // Simple four-edge mix using distances to edges
        float l = 1.0 - clamp(uv.x, 0.0, 1.0);
        float r = clamp(uv.x, 0.0, 1.0);
        float t = 1.0 - clamp(uv.y, 0.0, 1.0);
        float b = clamp(uv.y, 0.0, 1.0);
        // emphasize nearer edge
        float wl = pow(l, 3.0);
        float wr = pow(r, 3.0);
        float wt = pow(t, 3.0);
        float wb = pow(b, 3.0);
        vec3 c = u_left * wl + u_right * wr + u_top * wt + u_bottom * wb;
        float w = wl + wr + wt + wb + 1e-6;
        return c / w;
      }

      void main() {
        // Convert px radii/border to UV
        float rL = pxToUV(vec2(u_rLeft, u_rLeft)).x;  // use X for uniform scaling
        float rR = pxToUV(vec2(u_rRight, u_rRight)).x;
        float b = pxToUV(vec2(u_border, u_border)).x;

        float inOuter = insideRoundedRect(v_uv, rL, rR);
        float inInner = insideRoundedRect(vec2(clamp(v_uv.x, b, 1.0 - b), clamp(v_uv.y, b, 1.0 - b)), max(0.0, rL - b), max(0.0, rR - b));

        // object-fit: cover sampling
        vec2 canvasPx = u_res;
        vec2 texPx = u_texRes;
        float scale = max(canvasPx.x / texPx.x, canvasPx.y / texPx.y);
        vec2 scaled = texPx * scale;
        vec2 offset = 0.5 * (canvasPx - scaled);
        vec2 uv_px = v_uv * canvasPx;
        vec2 texCoord = (uv_px - offset) / scaled;
        // guard against sampling outside source
        vec2 tc = clamp(texCoord, 0.0, 1.0);
        vec4 tex = texture2D(u_tex, tc);

        // Border color
        vec3 stroke = edgeGradient(v_uv);

        // Compose: outside => transparent, border => stroke, inside => tex
        if (inOuter < 0.5) {
          discard;
        } else if (inInner < 0.5) {
          gl_FragColor = vec4(stroke, 1.0);
        } else {
          gl_FragColor = tex;
        }
      }
    `;

    function compile(gl, type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn('Shader compile error:', gl.getShaderInfoLog(sh));
      }
      return sh;
    }
    function link(gl, vs, fs) {
      const pr = gl.createProgram();
      gl.attachShader(pr, vs); gl.attachShader(pr, fs);
      gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
        console.warn('Program link error:', gl.getProgramInfoLog(pr));
      }
      return pr;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fsSource);
    const prog = link(gl, vs, fs);
    gl.useProgram(prog);

    const a_pos = gl.getAttribLocation(prog, 'a_pos');
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,  1, 1
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_pos);
    gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

    const u_tex = gl.getUniformLocation(prog, 'u_tex');
    const u_res = gl.getUniformLocation(prog, 'u_res');
    const u_texRes = gl.getUniformLocation(prog, 'u_texRes');
    const u_border = gl.getUniformLocation(prog, 'u_border');
    const u_rLeft = gl.getUniformLocation(prog, 'u_rLeft');
    const u_rRight = gl.getUniformLocation(prog, 'u_rRight');
    const u_top = gl.getUniformLocation(prog, 'u_top');
    const u_right = gl.getUniformLocation(prog, 'u_right');
    const u_bottom = gl.getUniformLocation(prog, 'u_bottom');
    const u_left = gl.getUniformLocation(prog, 'u_left');

    // Create texture
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    // Default edge colors
    let cTop = [0.7, 0.7, 0.7];
    let cRight = [0.6, 0.6, 0.6];
    let cBottom = [0.5, 0.5, 0.5];
    let cLeft = [0.6, 0.6, 0.6];

    // Lightweight CPU edge sampler using a tiny 2D canvas
    const samp = document.createElement('canvas');
    const sctx = samp.getContext('2d', { willReadFrequently: true });

    let rafId = null; let vfcId = null; let stop = false; let lastSample = 0;

    function sizeToEl() {
      const w = el.clientWidth || (isVideo ? el.videoWidth : el.naturalWidth) || 0;
      const h = el.clientHeight || (isVideo ? el.videoHeight : el.naturalHeight) || 0;
      if (!w || !h) return;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(u_res, w, h);
    }

    function updateTextureAndDraw(ts) {
      if (stop) return;
      sizeToEl();
      const w = (isVideo ? (el.videoWidth || el.clientWidth) : (el.naturalWidth || el.width)) || 1;
      const h = (isVideo ? (el.videoHeight || el.clientHeight) : (el.naturalHeight || el.height)) || 1;
      gl.uniform2f(u_texRes, w, h);
      // Upload current frame
      try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, el); } catch {}

      // Update edge colors at a throttled cadence
      if (!lastSample || (ts && ts - lastSample > sampleEveryMs)) {
        try {
          const sw = 64, sh = 64;
          samp.width = sw; samp.height = sh;
          sctx.drawImage(el, 0, 0, sw, sh);
          const top = sctx.getImageData(0, 0, sw, 1).data;
          const right = sctx.getImageData(sw - 1, 0, 1, sh).data;
          const bottom = sctx.getImageData(0, sh - 1, sw, 1).data;
          const left = sctx.getImageData(0, 0, 1, sh).data;
          function avg3(arr, step) {
            let r=0,g=0,b=0,n=0; for (let i=0;i<arr.length;i+=step) { r+=arr[i]; g+=arr[i+1]; b+=arr[i+2]; n++; }
            return [r/(255*n), g/(255*n), b/(255*n)];
          }
          cTop = avg3(top, 4); cRight = avg3(right, 4); cBottom = avg3(bottom, 4); cLeft = avg3(left, 4);
          lastSample = ts || (performance.now());
        } catch {}
      }

      // Uniforms
      gl.uniform1i(u_tex, 0);
      gl.uniform1f(u_border, borderWidth);
      gl.uniform1f(u_rLeft, radiusLeft);
      gl.uniform1f(u_rRight, radiusRight);
      gl.uniform3fv(u_top, new Float32Array(cTop));
      gl.uniform3fv(u_right, new Float32Array(cRight));
      gl.uniform3fv(u_bottom, new Float32Array(cBottom));
      gl.uniform3fv(u_left, new Float32Array(cLeft));

      gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    const tick = (ts) => { updateTextureAndDraw(ts); rafId = requestAnimationFrame(tick); };

    if (isVideo && useVideoFrameAPI && typeof el.requestVideoFrameCallback === 'function') {
      const vfcTick = () => { if (stop) return; updateTextureAndDraw(performance.now()); vfcId = el.requestVideoFrameCallback(vfcTick); };
      vfcId = el.requestVideoFrameCallback(vfcTick);
    } else {
      rafId = requestAnimationFrame(tick);
    }

    const onResize = () => sizeToEl();
    window.addEventListener('resize', onResize);
    sizeToEl();

    return () => {
      stop = true;
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (isVideo && vfcId && typeof el.cancelVideoFrameCallback === 'function') {
        try { el.cancelVideoFrameCallback(vfcId); } catch {}
      }
      if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
      if (parent && parent.dataset && parent.dataset.glcomposite) delete parent.dataset.glcomposite;
      el.style.opacity = prevOpacity;
      try {
        gl.deleteTexture(tex); gl.deleteBuffer(buf); gl.deleteProgram(prog);
        gl.deleteShader(vs); gl.deleteShader(fs);
      } catch {}
    };
  }, [borderWidth, radiusRight, radiusLeft, sampleEveryMs, useVideoFrameAPI]);

  return ref;
}

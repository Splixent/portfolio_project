// useCornerColors.js
// Samples the four corners of an image and sets CSS vars on the element:
// --corner-1 (top-left), --corner-2 (top-right), --corner-3 (bottom-right), --corner-4 (bottom-left)
// Also exposes a ref to attach to the <img>.

import { useEffect, useRef } from "react";

function rgbToCss([r, g, b, a]) {
  const alpha = typeof a === "number" ? a / 255 : 1;
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
}

function clamp01(x) { return Math.max(0, Math.min(1, x)); }

function weightSaturateAndBrighten([r, g, b, a]) {
  // Compute HSV-ish saturation and value for weighting preference.
  const R = r / 255, G = g / 255, B = b / 255;
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const v = max; // brightness
  const s = max === 0 ? 0 : (max - min) / max; // saturation
  // Weight favors saturated and bright pixels; tune exponents as needed.
  const weight = Math.pow(s, 1.4) * Math.pow(v, 1.15);
  return { weight, v, s };
}

function boostColor([r, g, b, a], amtSat = 0.25, amtLight = 0.08) {
  // Simple boost: increase saturation by pushing channels away from mean,
  // and gently lighten toward white to avoid muddy borders.
  const mean = (r + g + b) / 3;
  let rr = r + (r - mean) * amtSat;
  let gg = g + (g - mean) * amtSat;
  let bb = b + (b - mean) * amtSat;
  rr = rr + (255 - rr) * amtLight;
  gg = gg + (255 - gg) * amtLight;
  bb = bb + (255 - bb) * amtLight;
  rr = Math.max(0, Math.min(255, rr));
  gg = Math.max(0, Math.min(255, gg));
  bb = Math.max(0, Math.min(255, bb));
  return [rr, gg, bb, a ?? 255];
}

export default function useCornerColors({
  sampleSize = 8,
  preferBoost = true,
  sampling = 'edges', // 'edges' | 'corners'
  edgeThickness,
  stride = 2,
  preferWeighted = false,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
  const el = ref.current;
  if (!el) return;

  function apply() {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

    const isVideo = el.tagName === 'VIDEO';
    const w = (canvas.width = isVideo ? (el.videoWidth || el.clientWidth) : (el.naturalWidth || el.width));
    const h = (canvas.height = isVideo ? (el.videoHeight || el.clientHeight) : (el.naturalHeight || el.height));
        if (!w || !h) return;

    ctx.drawImage(el, 0, 0, w, h);

        const s = Math.max(2, sampleSize);
        const t = Math.max(1, edgeThickness ?? Math.round(Math.max(2, s) / 2));

        function averageRegion(x, y, rw, rh) {
          const data = ctx.getImageData(x, y, rw, rh).data;
          // Prefer weighted average only when requested; otherwise raw mean of edge pixels
          if (preferWeighted) {
            let rwSum = 0, gwSum = 0, bwSum = 0, awSum = 0, tw = 0;
            for (let yy = 0; yy < rh; yy += Math.max(1, stride)) {
              for (let xx = 0; xx < rw; xx += Math.max(1, stride)) {
                const idx = (yy * rw + xx) * 4;
                const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
                if (a < 8) continue;
                const { weight, v, s } = weightSaturateAndBrighten([r, g, b, a]);
                if (v < 0.12 || s < 0.12) continue; // gentle filter
                rwSum += r * weight; gwSum += g * weight; bwSum += b * weight; awSum += a * weight; tw += weight;
              }
            }
            if (tw > 0.0001) {
              const base = [rwSum / tw, gwSum / tw, bwSum / tw, awSum / tw];
              return preferBoost ? boostColor(base) : base;
            }
          }
          // Raw average with stride
          let rSum = 0, gSum = 0, bSum = 0, aSum = 0, count = 0;
          for (let yy = 0; yy < rh; yy += Math.max(1, stride)) {
            for (let xx = 0; xx < rw; xx += Math.max(1, stride)) {
              const idx = (yy * rw + xx) * 4;
              const a = data[idx + 3];
              if (a < 8) continue;
              rSum += data[idx]; gSum += data[idx + 1]; bSum += data[idx + 2]; aSum += a; count++;
            }
          }
          if (count === 0) return [0, 0, 0, 255];
          const base = [rSum / count, gSum / count, bSum / count, aSum / count];
          return preferBoost ? boostColor(base, 0.2, 0.06) : base;
        }

        if (sampling === 'edges') {
          const top = averageRegion(0, 0, w, t);
          const right = averageRegion(Math.max(0, w - t), 0, t, h);
          const bottom = averageRegion(0, Math.max(0, h - t), w, t);
          const left = averageRegion(0, 0, t, h);
          const c1 = rgbToCss(top);
          const c2 = rgbToCss(right);
          const c3 = rgbToCss(bottom);
          const c4 = rgbToCss(left);
          el.style.setProperty("--corner-1", c1);
          el.style.setProperty("--corner-2", c2);
          el.style.setProperty("--corner-3", c3);
          el.style.setProperty("--corner-4", c4);
          if (el.parentElement) {
            const p = el.parentElement;
            p.style.setProperty("--corner-1", c1);
            p.style.setProperty("--corner-2", c2);
            p.style.setProperty("--corner-3", c3);
            p.style.setProperty("--corner-4", c4);
          }
        } else {
          // legacy: corners mode
          const tl = ctx.getImageData(0, 0, s, s).data;
          const tr = ctx.getImageData(Math.max(0, w - s), 0, s, s).data;
          const br = ctx.getImageData(Math.max(0, w - s), Math.max(0, h - s), s, s).data;
          const bl = ctx.getImageData(0, Math.max(0, h - s), s, s).data;

          function preferredAverage(data) {
            let rwSum = 0, gwSum = 0, bwSum = 0, awSum = 0, tw = 0;
            const len = data.length;
            for (let i = 0; i < len; i += 4 * Math.max(1, stride)) {
              const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
              if (a < 8) continue;
              const { weight, v, s } = weightSaturateAndBrighten([r, g, b, a]);
              if (v < 0.15 || s < 0.15) continue;
              rwSum += r * weight; gwSum += g * weight; bwSum += b * weight; awSum += a * weight; tw += weight;
            }
            if (tw > 0.0001) {
              const base = [rwSum / tw, gwSum / tw, bwSum / tw, awSum / tw];
              return preferBoost ? boostColor(base) : base;
            }
            // fallback simple mean
            let r = 0, g = 0, b = 0, a = 0; const count = (s * s);
            for (let i = 0; i < len; i += 4) {
              r += data[i]; g += data[i + 1]; b += data[i + 2]; a += data[i + 3];
            }
            const base = [r / count, g / count, b / count, a / count];
            return preferBoost ? boostColor(base, 0.2, 0.06) : base;
          }

          const c1 = rgbToCss(preferredAverage(tl));
          const c2 = rgbToCss(preferredAverage(tr));
          const c3 = rgbToCss(preferredAverage(br));
          const c4 = rgbToCss(preferredAverage(bl));
          el.style.setProperty("--corner-1", c1);
          el.style.setProperty("--corner-2", c2);
          el.style.setProperty("--corner-3", c3);
          el.style.setProperty("--corner-4", c4);
          if (el.parentElement) {
            const p = el.parentElement;
            p.style.setProperty("--corner-1", c1);
            p.style.setProperty("--corner-2", c2);
            p.style.setProperty("--corner-3", c3);
            p.style.setProperty("--corner-4", c4);
          }
        }

        el.style.setProperty("--corner-1", c1);
        el.style.setProperty("--corner-2", c2);
        el.style.setProperty("--corner-3", c3);
        el.style.setProperty("--corner-4", c4);
      } catch (e) {
        // Cross-origin images without proper CORS headers will taint the canvas.
        // In that case, we just skip sampling and keep defaults.
      }
    }

  let timer;
    if (el.tagName === 'VIDEO') {
      // Kick off periodic sampling while the video is available.
      const onLoaded = () => {
        apply();
        if (timer) clearInterval(timer);
    timer = setInterval(apply, 300); // adjust cadence if needed
      };
      // Ensure autoplay constraints
      try {
        el.muted = true; // required for autoplay on most browsers
        el.playsInline = true;
        el.autoplay = true;
        el.loop = true;
        el.controls = false;
      } catch {}
      if (el.readyState >= 2) {
        onLoaded();
      } else {
        el.addEventListener('loadeddata', onLoaded, { once: true });
      }
      return () => { if (timer) clearInterval(timer); };
    } else {
      if (el.complete) {
        apply();
      } else {
        el.addEventListener("load", apply, { once: true });
        el.addEventListener("error", () => {}, { once: true });
      }
    }
  }, [sampleSize]);

  return ref;
}

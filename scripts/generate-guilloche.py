"""Guilloché rosette: bands of concentric rings whose radius ripples on a phase-shifted
sine, several per band so they interweave, the way certificate and banknote engraving is built.
Coordinates are doubled and rounded to integers, written as relative moves to keep the file small.

Usage: python3 scripts/generate-guilloche.py src/lib/assets/patterns/guilloche.svg
"""
import math, sys

S = 2  # coordinate scale, so integer rounding stays below a pixel at display size

def ring(r0, amp, petals, phase, samples_per_petal=6):
    n = petals * samples_per_petal
    pts = []
    for i in range(n):
        t = 2 * math.pi * i / n
        r = r0 + amp * math.sin(petals * t + phase)
        pts.append((round(S * r * math.cos(t)), round(S * r * math.sin(t))))
    d = f"M{pts[0][0]} {pts[0][1]}l"
    px, py = pts[0]
    for x, y in pts[1:]:
        d += f"{x - px} {y - py} "
        px, py = x, y
    return d.strip().replace(" -", "-") + "z"

# Bands packed so neighbours touch; petal count scales with radius so the wavelength stays even.
bands = [(r, 8, round(r / 2.6), 4) for r in range(234, 50, -16)]
paths = []
for r0, amp, petals, n in bands:
    for j in range(n):
        paths.append(ring(r0, amp, petals, 2 * math.pi * j / n))

R = 240 * S
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-R} {-R} {2*R} {2*R}" fill="none" '
       f'stroke="#184a3c" stroke-width="1.3">' + "".join(f'<path d="{d}"/>' for d in paths) + "</svg>")
open(sys.argv[1], "w").write(svg)
print(len(paths), "curves,", len(svg), "bytes")

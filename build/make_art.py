#!/usr/bin/env python3
"""Maldovia — voxel/pixel-art SVG sahna generatori.

Kontseptsiya: "Bitta dunyo, ikki qonun".
Chap yarim — SMP (yashil, qurilgan), o'ng yarim — Anarxiya (qizil, yongan),
o'rtada binafsha yoriq. Hammasi 20px blok gridga qurilgan.
Chiqish: public/art/*.svg
"""
import random, os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "art")
os.makedirs(OUT, exist_ok=True)
B = 20

MOSS = {
    "sky_top": "#04110E", "sky_bot": "#123A2B",
    "h3": "#0E2A22", "h3r": "#174033",
    "h2": "#154033", "h2r": "#1F5C42",
    "h1": "#1C5238", "h1r": "#2C7A4C",
    "grass": "#2F8F4E", "grass_hi": "#4FBE71", "dirt": "#3D2C1E", "dirt2": "#4A3526",
    "stone": "#141C18", "stone2": "#1B2620", "ore": "#34D399",
    "trunk": "#37281B", "trunk_hi": "#46331F",
    "leaf": "#236B3D", "leaf_hi": "#2F9152", "leaf_top": "#41AB61",
    "wall": "#6A5236", "wall_hi": "#806542", "beam": "#3B2B1B",
    "roof": "#7E3A2C", "roof_hi": "#95493A", "glow": "#FFD27A",
    "crop": "#B8903E", "crop_hi": "#E0BA5E", "water": "#1B5A78", "water_hi": "#2A7C9E",
}
EMBER = {
    "sky_top": "#12080A", "sky_bot": "#4A1A17",
    "h3": "#2A1315", "h3r": "#3A1C1B",
    "h2": "#38191A", "h2r": "#4C2420",
    "h1": "#4A211C", "h1r": "#63332A",
    "grass": "#5A3429", "grass_hi": "#7A4B3A", "dirt": "#33211B", "dirt2": "#3E2921",
    "stone": "#1C1516", "stone2": "#261D1D", "ore": "#F04E3E",
    "rock": "#3E3C46", "rock_hi": "#54515E", "rock_lo": "#26252D",
    "lava": "#FF5C27", "lava_hi": "#FFC24A", "lava_lo": "#C6350F",
    "ash": "#6A5A57",
}
IRIS, IRIS_HI = "#7C5CFF", "#A88CFF"


def r(x, y, w, h, c, o=None):
    op = f' opacity="{o}"' if o is not None else ""
    return f'<rect x="{int(x)}" y="{int(y)}" width="{int(w)}" height="{int(h)}" fill="{c}"{op}/>'


def j(seq):
    return "".join(seq)


def profile(rng, x0, x1, base, amp, step, smooth=0.55):
    out, h, x = [], base, x0
    while x < x1:
        target = base + rng.randint(-amp, amp) * B
        h = round((h + (target - h) * smooth) / B) * B
        out.append((x, h))
        x += step
    return out


def terrain(pts, step, floor, body, rim, rim_h=6):
    out = []
    for x, y in pts:
        out.append(r(x, y, step, floor - y, body))
        out.append(r(x, y, step, rim_h, rim))
    return j(out)


def lookup(pts, step, x, default):
    for px, py in pts:
        if px <= x < px + step:
            return py
    return default


def tree(x, g, p, h=5, w=5):
    out = [r(x, g - h * B, B, h * B, p["trunk"]), r(x + 12, g - h * B, 8, h * B, p["trunk_hi"])]
    rows = [(w, 4), (w, 3), (max(1, w - 2), 2)] if w >= 5 else [(3, 3), (3, 2), (1, 1)]
    for ri, (rw, dy) in enumerate(rows):
        for i in range(rw):
            bx = x - (rw // 2) * B + i * B
            col = p["leaf_top"] if ri == len(rows) - 1 and i % 2 == 0 else (
                p["leaf_hi"] if (i + ri) % 3 == 0 else p["leaf"])
            out.append(r(bx, g - (h + dy) * B, B, B, col))
    return j(out)


def house(x, g, p, w=7, h=4, lit=(1, 4)):
    out = []
    for cy in range(h):
        for cx in range(w):
            out.append(r(x + cx * B, g - (cy + 1) * B, B, B,
                         p["wall_hi"] if (cx * 3 + cy) % 5 == 0 else p["wall"]))
    for cx in range(0, w, 3):
        out.append(r(x + cx * B, g - h * B, B, h * B, p["beam"], 0.55))
    for i in range(h - 1):
        out.append(r(x - B + i * B, g - (h + 1 + i) * B, (w + 2 - i * 2) * B, B,
                     p["roof_hi"] if i == h - 2 else p["roof"]))
    for wx in lit:
        if wx < w:
            out.append(r(x + wx * B, g - 3 * B, B, B, p["glow"]))
            out.append(r(x + wx * B + 4, g - 3 * B + 4, 12, 12, "#FFF2CB"))
    out.append(r(x + (w // 2) * B, g - 2 * B, B, 2 * B, "#241A12"))
    return j(out)


def crops(x, g, p, cols=5):
    out = []
    for i in range(cols):
        cx = x + i * B
        out.append(r(cx, g - B, B, B, p["dirt2"]))
        out.append(r(cx + 4, g - 2 * B + 4, 12, 16, p["crop_hi"] if i % 2 else p["crop"]))
        out.append(r(cx + 8, g - 2 * B, 4, 8, p["crop_hi"]))
    return j(out)


def fence(x, g, p, cols=8):
    out = [r(x + i * B, g - 2 * B, 5, 2 * B, p["trunk"]) for i in range(cols)]
    out.append(r(x, g - 2 * B + 5, cols * B, 5, p["trunk"]))
    out.append(r(x, g - B, cols * B, 5, p["trunk"]))
    return j(out)


def pond(x, g, p, w=6):
    out = [r(x - 6, g, w * B + 12, 8, p["dirt2"]),                 # qirg'oq
           r(x, g + 4, w * B, 2 * B, p["water"]),
           r(x + 4, g + 8, w * B - 8, 5, p["water_hi"], 0.9)]
    for i in range(0, w, 3):
        out.append(r(x + i * B + 6, g + 16, 10, 3, "#7FD4EA", 0.3))
    return j(out)


def ruin(x, g, p, h=9, w=4, seed=0):
    rng = random.Random(seed or x)
    out, heights = [], []
    for i in range(w):
        heights.append(max(2, h - (rng.randint(0, 3) if i in (0, w - 1) else rng.randint(0, 1))))
    for cx in range(w):
        for cy in range(heights[cx]):
            if rng.random() < 0.08 and cy < heights[cx] - 1:
                continue
            col = p["rock_hi"] if (cx + cy) % 4 == 0 else (
                p["rock_lo"] if (cx * 2 + cy) % 7 == 0 else p["rock"])
            out.append(r(x + cx * B, g - (cy + 1) * B, B, B, col))
    out.append(r(x, g - B, w * B, B, p["rock_lo"]))
    out.append(r(x, g - heights[0] * B, 6, heights[0] * B, p["rock_hi"], 0.5))
    for _ in range(rng.randint(1, 3)):
        cy = rng.randint(1, max(2, h - 2))
        out.append(r(x + rng.randint(0, w - 1) * B, g - cy * B + 6, B, 5, p["lava"], 0.75))
    for i in range(rng.randint(2, 4)):
        out.append(r(x + rng.randint(-2, w + 1) * B, g - (h + 2 + i * 2) * B, B, B, p["rock"], 0.75))
    return j(out)


def lava_pool(x, g, p, w=5):
    """Yerga o'yilgan lava ko'li: kuygan qirg'oq + cho'kkan sirt + uchqunlar."""
    W_ = w * B
    out = [r(x - 6, g, W_ + 12, 6, p["ash"], 0.35),            # kuygan qirg'oq
           r(x, g, W_, 2 * B, p["lava_lo"]),
           r(x + 6, g + 6, W_ - 12, B + 8, p["lava"]),
           r(x + 6, g + 10, W_ - 12, 5, p["lava_hi"], 0.9)]
    for i in range(0, w, 2):                                    # ko'tarilayotgan uchqun
        out.append(r(x + i * B + 8, g - 14, 6, 10, p["lava"], 0.5))
        out.append(r(x + i * B + 12, g - 32, 4, 4, p["lava_hi"], 0.65))
    return j(out)


def embers(rng, x0, x1, y0, y1, p, n=18):
    out = []
    for _ in range(n):
        x, y = rng.randrange(x0, x1, 10), rng.randrange(y0, y1, 10)
        s = rng.choice([3, 4, 6])
        out.append(r(x, y, s, s, rng.choice([p["lava"], p["lava_hi"], p["ash"]]),
                     round(rng.uniform(0.25, 0.85), 2)))
    return j(out)


def floating(rng, x0, x1, y0, y1, p, n=10):
    out = []
    for _ in range(n):
        x, y = rng.randrange(x0 // B, x1 // B) * B, rng.randrange(y0 // B, y1 // B) * B
        w = rng.choice([1, 1, 2])
        for i in range(w):
            out.append(r(x + i * B, y, B, B, rng.choice([p["rock"], p["rock_lo"]]),
                         round(rng.uniform(0.4, 0.8), 2)))
        out.append(r(x + 4, y + B, w * B - 8, 4, p["lava"], 0.3))
    return j(out)


def motes(rng, x0, x1, y0, y1, color, n=26, maxo=0.55):
    out = []
    for _ in range(n):
        x, y = rng.randrange(x0, x1, 10), rng.randrange(y0, y1, 10)
        s = rng.choice([2, 3, 4])
        out.append(r(x, y, s, s, color, round(rng.uniform(0.15, maxo), 2)))
    return j(out)


def strata(rng, x0, x1, top, bottom, p, ore_n=14):
    out = [r(x0, top, x1 - x0, bottom - top, p["stone"])]
    for _ in range(26):
        x, y = rng.randrange(x0 // B, x1 // B) * B, rng.randrange(top // B, bottom // B) * B
        out.append(r(x, y, B, B, p["stone2"]))
    for _ in range(ore_n):
        x, y = rng.randrange(x0 // B, x1 // B) * B, rng.randrange((top + B) // B, bottom // B) * B
        out.append(r(x, y, B, B, p["ore"], 0.18))
        out.append(r(x + 5, y + 5, 10, 10, p["ore"], 0.85))
    return j(out)


def ground(rng, s, x0, x1, G, H, p, step=B * 4):
    g0 = profile(rng, x0, x1, G, 1, step)
    for gx, gyv in g0:
        s.append(r(gx, gyv, step, H - gyv, p["dirt"]))
        s.append(r(gx, gyv, step, B, p["grass"]))
        s.append(r(gx, gyv, step, 5, p["grass_hi"]))
    return g0


# ------------------------------------------------------------------ 1. HERO
def hero():
    W, H, G, SX = 1600, 780, 560, 800
    rng = random.Random(1907)
    L, E = MOSS, EMBER

    pts, x, y = [(SX, 0)], SX, 0
    while y < H:
        x = max(SX - 4 * B, min(SX + 4 * B, x + rng.choice([-2, -1, 0, 1, 2]) * B))
        y += B * 2
        pts.append((x, y))
    lpath = "M0,0 " + " ".join(f"L{a},{b}" for a, b in pts) + f" L0,{H} Z"
    rpath = f"M{W},0 " + " ".join(f"L{a},{b}" for a, b in pts) + f" L{W},{H} Z"
    seam = "M" + " L".join(f"{a},{b}" for a, b in pts)

    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Maldovia dunyosi: chap tomonda tinch SMP qishlogi, ong tomonda yongan anarxiya vayronalari, ortada yorqin yoriq.">']
    s.append("<defs>")
    s.append(f'<linearGradient id="skyL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{L["sky_top"]}"/><stop offset="1" stop-color="{L["sky_bot"]}"/></linearGradient>')
    s.append(f'<linearGradient id="skyR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{E["sky_top"]}"/><stop offset="1" stop-color="{E["sky_bot"]}"/></linearGradient>')
    s.append('<radialGradient id="emberGlow" cx="0.72" cy="0.74" r="0.5"><stop offset="0" stop-color="#FF5C27" stop-opacity="0.38"/><stop offset="1" stop-color="#FF5C27" stop-opacity="0"/></radialGradient>')
    s.append(f'<linearGradient id="seamG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{IRIS}" stop-opacity="0"/><stop offset="0.3" stop-color="{IRIS_HI}" stop-opacity="1"/><stop offset="1" stop-color="{IRIS}" stop-opacity="0.2"/></linearGradient>')
    s.append('<linearGradient id="fadeB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A0B0F" stop-opacity="0"/><stop offset="0.55" stop-color="#0A0B0F" stop-opacity="0.35"/><stop offset="1" stop-color="#0A0B0F" stop-opacity="0.96"/></linearGradient>')
    s.append('<linearGradient id="fadeT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A0B0F" stop-opacity="0.7"/><stop offset="1" stop-color="#0A0B0F" stop-opacity="0"/></linearGradient>')
    s.append(f'<clipPath id="clipL"><path d="{lpath}"/></clipPath><clipPath id="clipR"><path d="{rpath}"/></clipPath>')
    s.append("</defs>")

    s.append('<g clip-path="url(#clipL)">')
    s.append(r(0, 0, W, H, "url(#skyL)"))
    s.append(motes(rng, 0, SX + 200, 20, 400, "#A9F0C6", 34))
    s.append(r(600, 90, 70, 70, "#DCE9E2", 0.16))
    s.append(r(610, 100, 50, 50, "#E9F3EC", 0.92))
    s.append(r(640, 110, 20, 20, "#C6D9CF", 0.9))
    s.append(terrain(profile(rng, -60, SX + 220, 330, 3, B * 3), B * 3, G, L["h3"], L["h3r"]))
    s.append(terrain(profile(rng, -60, SX + 220, 420, 2, B * 2), B * 2, G, L["h2"], L["h2r"]))
    s.append(terrain(profile(rng, -60, SX + 220, 490, 1, B * 2), B * 2, G, L["h1"], L["h1r"]))
    g0 = ground(rng, s, -60, SX + 220, G, H, L)
    s.append(strata(rng, 0, SX + 220, G + B * 3, H, L, 14))
    gy = lambda xx: lookup(g0, B * 4, xx, G)
    s.append(tree(60, gy(60), L, 4, 3))
    s.append(tree(140, gy(140), L, 5, 5))
    s.append(house(240, gy(240), L, 7, 4))
    s.append(tree(440, gy(440), L, 6, 5))
    s.append(house(520, gy(520), L, 5, 3, lit=(1, 3)))
    s.append(fence(660, gy(660), L, 7))
    s.append(crops(680, gy(680), L, 5))
    s.append("</g>")

    s.append('<g clip-path="url(#clipR)">')
    s.append(r(0, 0, W, H, "url(#skyR)"))
    s.append(r(SX - 220, 0, W, H, "url(#emberGlow)"))
    s.append(motes(rng, SX - 200, W, 20, 420, "#FF9A6A", 36, 0.72))
    s.append(r(1180, 120, 80, 80, "#B8341C", 0.32))
    s.append(r(1190, 130, 60, 60, "#D2452A", 0.88))
    s.append(terrain(profile(rng, SX - 220, W + 60, 340, 3, B * 3), B * 3, G, E["h3"], E["h3r"]))
    s.append(terrain(profile(rng, SX - 220, W + 60, 425, 2, B * 2), B * 2, G, E["h2"], E["h2r"]))
    s.append(terrain(profile(rng, SX - 220, W + 60, 490, 1, B * 2), B * 2, G, E["h1"], E["h1r"]))
    h0 = ground(rng, s, SX - 220, W + 60, G, H, E)
    s.append(strata(rng, SX - 220, W, G + B * 3, H, E, 14))
    hy = lambda xx: lookup(h0, B * 4, xx, G)
    s.append(ruin(1000, hy(1000), E, 11, 4, 3))
    s.append(ruin(1260, hy(1260), E, 7, 3, 11))
    s.append(ruin(1460, hy(1460), E, 13, 4, 19))
    s.append(lava_pool(880, hy(880), E, 5))
    s.append(lava_pool(1140, hy(1140), E, 4))
    s.append(lava_pool(1360, hy(1360), E, 3))
    s.append(floating(rng, SX + 80, W - 40, 200, 420, E, 9))
    s.append(embers(rng, SX + 60, W, 260, G - 20, E, 24))
    s.append("</g>")

    s.append(f'<path d="{seam}" stroke="url(#seamG)" stroke-width="14" fill="none" opacity="0.5"/>')
    s.append(f'<path d="{seam}" stroke="url(#seamG)" stroke-width="4" fill="none"/>')
    for i, (px, py) in enumerate(pts):
        if i % 2 == 0:
            s.append(r(px - B // 2, py - B // 2, B, B, IRIS, round(0.1 + 0.2 * (i % 3), 2)))
    s.append(r(0, 0, W, 200, "url(#fadeT)"))
    s.append(r(0, 0, W, H, "url(#fadeB)"))
    s.append("</svg>")
    return j(s)


# ------------------------------------------------------------------ 2. SMP
def smp_scene():
    W, H, G = 900, 620, 430
    rng = random.Random(77)
    L = MOSS
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="SMP Survival rejimi: bugdoyzor, hovuz va yoritilgan uylar bolgan tinch qishloq.">']
    s.append(f'<defs><linearGradient id="smpSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{L["sky_top"]}"/><stop offset="1" stop-color="#1A4A35"/></linearGradient>')
    s.append('<linearGradient id="smpFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.5" stop-color="#0A0B0F" stop-opacity="0"/><stop offset="1" stop-color="#0A0B0F" stop-opacity="0.9"/></linearGradient>')
    s.append('<linearGradient id="smpSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0A0B0F" stop-opacity="0.8"/><stop offset="0.45" stop-color="#0A0B0F" stop-opacity="0"/></linearGradient></defs>')
    s.append(r(0, 0, W, H, "url(#smpSky)"))
    s.append(motes(rng, 0, W, 20, 320, "#A9F0C6", 26))
    s.append(r(690, 70, 78, 78, "#F3E6A8", 0.14))
    s.append(r(700, 80, 58, 58, "#FAF0C4", 0.95))
    s.append(terrain(profile(rng, -60, W + 60, 250, 3, B * 3), B * 3, G, L["h3"], L["h3r"]))
    s.append(terrain(profile(rng, -60, W + 60, 320, 2, B * 2), B * 2, G, L["h2"], L["h2r"]))
    s.append(terrain(profile(rng, -60, W + 60, 380, 1, B * 2), B * 2, G, L["h1"], L["h1r"]))
    g0 = ground(rng, s, -60, W + 60, G, H, L)
    s.append(strata(rng, 0, W, G + B * 3, H, L, 9))
    gy = lambda xx: lookup(g0, B * 4, xx, G)
    s.append(tree(70, gy(70), L, 5, 5))
    s.append(house(160, gy(160), L, 6, 4))
    s.append(pond(340, gy(340), L, 5))
    s.append(tree(480, gy(480), L, 6, 5))
    s.append(house(560, gy(560), L, 7, 5, lit=(1, 5)))
    s.append(fence(740, gy(740), L, 7))
    s.append(crops(760, gy(760), L, 5))
    s.append(r(0, 0, W, H, "url(#smpFade)"))
    s.append(r(0, 0, W, H, "url(#smpSide)"))
    s.append("</svg>")
    return j(s)


# ------------------------------------------------------------------ 3. ANARXIYA
def anarchy_scene():
    W, H, G = 900, 620, 430
    rng = random.Random(313)
    E = EMBER
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Anarxiya rejimi: lava kollari, vayron minoralar va havoda uchayotgan bloklar.">']
    s.append(f'<defs><linearGradient id="anSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{E["sky_top"]}"/><stop offset="1" stop-color="#55201B"/></linearGradient>')
    s.append('<radialGradient id="anGlow" cx="0.45" cy="0.78" r="0.55"><stop offset="0" stop-color="#FF5C27" stop-opacity="0.5"/><stop offset="1" stop-color="#FF5C27" stop-opacity="0"/></radialGradient>')
    s.append('<linearGradient id="anFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.5" stop-color="#0A0B0F" stop-opacity="0"/><stop offset="1" stop-color="#0A0B0F" stop-opacity="0.9"/></linearGradient>')
    s.append('<linearGradient id="anSide" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#0A0B0F" stop-opacity="0.8"/><stop offset="0.45" stop-color="#0A0B0F" stop-opacity="0"/></linearGradient></defs>')
    s.append(r(0, 0, W, H, "url(#anSky)"))
    s.append(motes(rng, 0, W, 20, 330, "#FFA271", 30, 0.7))
    s.append(r(150, 90, 86, 86, "#B8341C", 0.3))
    s.append(r(160, 100, 66, 66, "#D2452A", 0.9))
    s.append(terrain(profile(rng, -60, W + 60, 255, 3, B * 3), B * 3, G, E["h3"], E["h3r"]))
    s.append(terrain(profile(rng, -60, W + 60, 325, 2, B * 2), B * 2, G, E["h2"], E["h2r"]))
    s.append(terrain(profile(rng, -60, W + 60, 385, 1, B * 2), B * 2, G, E["h1"], E["h1r"]))
    g0 = ground(rng, s, -60, W + 60, G, H, E)
    s.append(strata(rng, 0, W, G + B * 3, H, E, 9))
    s.append(r(0, G - 240, W, 360, "url(#anGlow)"))
    gy = lambda xx: lookup(g0, B * 4, xx, G)
    s.append(ruin(80, gy(80), E, 12, 4, 5))
    s.append(ruin(400, gy(400), E, 7, 3, 13))
    s.append(ruin(620, gy(620), E, 10, 4, 29))
    s.append(lava_pool(260, gy(260), E, 5))
    s.append(lava_pool(540, gy(540), E, 3))
    s.append(lava_pool(790, gy(790), E, 4))
    s.append(floating(rng, 40, W - 40, 150, 380, E, 10))
    s.append(embers(rng, 20, W - 20, 220, G - 20, E, 26))
    s.append(r(0, 0, W, H, "url(#anFade)"))
    s.append(r(0, 0, W, H, "url(#anSide)"))
    s.append("</svg>")
    return j(s)


# ------------------------------------------------------------------ 4. LOGO
def logo():
    p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Maldovia logosi: ortasidan yorilgan blokli M harfi.">']
    p.append('<defs><linearGradient id="lgL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4FBE71"/><stop offset="1" stop-color="#1C5238"/></linearGradient>')
    p.append('<linearGradient id="lgR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F2705C"/><stop offset="1" stop-color="#8E2A20"/></linearGradient></defs>')
    grid = ["11000011", "11100111", "11111111", "11111111", "11011011", "11000011", "11000011", "11000011"]
    for ry, row in enumerate(grid):
        for cx, ch in enumerate(row):
            if ch == "1":
                p.append(f'<rect x="{cx*8}" y="{ry*8}" width="8" height="8" fill="{"url(#lgL)" if cx < 4 else "url(#lgR)"}"/>')
    p.append('<rect x="30" y="0" width="4" height="64" fill="#0A0B0F"/>')
    p.append(f'<rect x="31" y="0" width="2" height="64" fill="{IRIS_HI}"/>')
    p.append("</svg>")
    return j(p)


files = {
    "hero-panorama.svg": hero(),
    "mode-smp.svg": smp_scene(),
    "mode-anarxiya.svg": anarchy_scene(),
    "maldovia-logo.svg": logo(),
}
for name, data in files.items():
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(data)
    print(f"{name:22} {len(data)/1024:6.1f} KB")

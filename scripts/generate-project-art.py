#!/usr/bin/env python3
"""Generates the stylized SVG UI mockups in public/images/projects/.

These are illustrative screenshots for the case-study galleries; re-run this
script after editing to regenerate every asset."""

import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "projects")
W, H = 1200, 750
LIME = "#89f336"
MONO = "ui-monospace, SFMono-Regular, Menlo, monospace"


def lighten(hex_color, amt):
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
    r, g, b = (min(255, c + amt) for c in (r, g, b))
    return f"#{r:02x}{g:02x}{b:02x}"


def rect(x, y, w, h, fill, rx=8, opacity=1, stroke=None):
    s = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" opacity="{opacity}"'
    if stroke:
        s += f' stroke="{stroke}" stroke-opacity="0.25"'
    return s + "/>"


def bar(x, y, w, fill="#ffffff", opacity=0.25, h=10, rx=5):
    return rect(x, y, w, h, fill, rx=rx, opacity=opacity)


def circle(cx, cy, r, fill, opacity=1):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" opacity="{opacity}"/>'


def label(x, y, text, size=13, fill="#ffffff", opacity=0.55, weight=500, anchor="start"):
    return (
        f'<text x="{x}" y="{y}" font-family="{MONO}" font-size="{size}" fill="{fill}" '
        f'opacity="{opacity}" font-weight="{weight}" text-anchor="{anchor}" letter-spacing="0.08em">{text}</text>'
    )


def chrome(base, url):
    """Browser chrome across the top of the frame."""
    top = lighten(base, 12)
    return "".join(
        [
            rect(0, 0, W, 56, top, rx=0),
            circle(28, 28, 6.5, "#ff5f57"),
            circle(50, 28, 6.5, "#febc2e"),
            circle(72, 28, 6.5, "#28c840"),
            rect(320, 15, 560, 27, base, rx=13),
            label(600, 33, url, size=12, opacity=0.45, anchor="middle"),
        ]
    )


def frame(base, body, url=None, title=None):
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
        rect(0, 0, W, H, base, rx=0),
        f'<rect x="0" y="0" width="{W}" height="{H}" fill="url(#glow)"/>' if False else "",
    ]
    if url:
        parts.append(chrome(base, url))
    elif title:
        top = lighten(base, 12)
        parts += [
            rect(0, 0, W, 56, top, rx=0),
            circle(28, 28, 6.5, "#ff5f57"),
            circle(50, 28, 6.5, "#febc2e"),
            circle(72, 28, 6.5, "#28c840"),
            label(W / 2, 33, title, size=12, opacity=0.45, anchor="middle"),
        ]
    parts.append(body)
    parts.append("</svg>")
    return "".join(parts)


def sidebar(base, y0=56, items=6, active=0, w=220):
    panel = lighten(base, 6)
    out = [rect(0, y0, w, H - y0, panel, rx=0), circle(34, y0 + 40, 12, LIME, 0.9), bar(58, y0 + 34, 90, h=12)]
    for i in range(items):
        iy = y0 + 96 + i * 46
        if i == active:
            out.append(rect(16, iy - 8, w - 32, 34, lighten(base, 22), rx=8))
            out.append(bar(34, iy + 4, 110, fill=LIME, opacity=0.85))
        else:
            out.append(bar(34, iy + 4, 90 + (i * 37) % 50, opacity=0.2))
    return "".join(out)


def save(name, svg):
    with open(os.path.join(OUT, name), "w") as f:
        f.write(svg)
    print(name)


# ---------------------------------------------------------------- DAM
def dam_grid():
    base = "#1a1a2e"
    b = [sidebar(base, items=7, active=1)]
    b.append(rect(248, 84, 520, 40, lighten(base, 10), rx=20))
    b.append(label(272, 109, "Search 12,400 assets…", size=13, opacity=0.35))
    b.append(rect(1044, 84, 128, 40, LIME, rx=20, opacity=0.9))
    b.append(label(1108, 109, "Upload", size=13, fill="#0a0a14", opacity=0.9, weight=700, anchor="middle"))
    tags = ["photo", "video", "brand", "print", "3d"]
    for i, t in enumerate(tags):
        x = 248 + i * 96
        b.append(rect(x, 146, 82, 28, lighten(base, 14 if i else 30), rx=14))
        b.append(label(x + 41, 164, t, size=11, opacity=0.6 if i else 0.9, anchor="middle",
                       fill=LIME if not i else "#ffffff"))
    hues = [26, 14, 34, 20, 40, 16, 30, 22]
    for i in range(8):
        x = 248 + (i % 4) * 236
        y = 200 + (i // 4) * 258
        c = lighten(base, hues[i])
        b.append(rect(x, y, 216, 160, c, rx=10))
        b.append(circle(x + 108, y + 80, 30, "#ffffff", 0.08))
        b.append(bar(x, y + 176, 130, opacity=0.4))
        b.append(rect(x, y + 196, 64, 22, lighten(base, 18), rx=11))
        b.append(label(x + 32, y + 211, "ai·tag", size=10, fill=LIME, opacity=0.8, anchor="middle"))
        b.append(rect(x + 72, y + 196, 64, 22, lighten(base, 18), rx=11))
        b.append(label(x + 104, y + 211, "4k", size=10, opacity=0.5, anchor="middle"))
    return frame(base, "".join(b), url="dam.idearanch.com/library")


def dam_detail():
    base = "#1a1a2e"
    b = [sidebar(base, items=7, active=1)]
    b.append(rect(248, 84, 600, 460, lighten(base, 16), rx=12))
    b.append(circle(548, 314, 70, "#ffffff", 0.07))
    b.append(circle(548, 314, 44, LIME, 0.15))
    b.append(f'<path d="M534 314 l10 12 l20 -26" stroke="{LIME}" stroke-width="5" fill="none" stroke-linecap="round"/>')
    b.append(label(248, 578, "CAMPAIGN_HERO_V3.PSD", size=15, opacity=0.85, weight=700))
    b.append(bar(248, 596, 220, opacity=0.3))
    for i, t in enumerate(["outdoor", "lifestyle", "hero", "approved", "q3-campaign"]):
        x = 248 + i * 118
        b.append(rect(x, 622, 104, 30, lighten(base, 20), rx=15))
        b.append(label(x + 52, 641, t, size=11, fill=LIME, opacity=0.75, anchor="middle"))
    px = 880
    b.append(rect(px, 84, 292, 568, lighten(base, 8), rx=12))
    b.append(label(px + 24, 122, "AI ENRICHMENT", size=11, fill=LIME, opacity=0.8, weight=700))
    rows = [("Labels", 180), ("Colors", 130), ("Faces", 90), ("Text", 150), ("Similar", 200)]
    for i, (name, wd) in enumerate(rows):
        ry = 150 + i * 64
        b.append(label(px + 24, ry, name, size=12, opacity=0.45))
        b.append(bar(px + 24, ry + 12, wd, opacity=0.22))
        b.append(bar(px + 24, ry + 30, wd - 40, fill=LIME, opacity=0.35, h=6))
    b.append(rect(px + 24, 500, 244, 44, LIME, rx=10, opacity=0.9))
    b.append(label(px + 146, 527, "Send to InDesign", size=13, fill="#0a0a14", weight=700, anchor="middle"))
    return frame(base, "".join(b), url="dam.idearanch.com/asset/8214")


# ---------------------------------------------------- Alberta Boot Builder
def boot(x, y, s, fill, accent):
    """Simple cowboy-boot silhouette."""
    return (
        f'<g transform="translate({x},{y}) scale({s})">'
        f'<path d="M40 0 h96 v150 q0 18 14 26 l64 36 q22 12 22 34 v22 h-196 q-24 0 -32 -22 l-4 -12 v-60 q0 -14 12 -20 l24 -12 z" '
        f'fill="{fill}"/>'
        f'<path d="M40 0 h96 v24 h-96 z" fill="{accent}" opacity="0.9"/>'
        f'<path d="M56 60 q32 30 64 0 M56 96 q32 30 64 0" stroke="{accent}" stroke-width="5" fill="none" opacity="0.8"/>'
        f'<path d="M8 246 h196 v22 h-160 q-30 0 -36 -22 z" fill="{accent}" opacity="0.35"/>'
        "</g>"
    )


def boots_configurator():
    base = "#2b1d12"
    tan = "#c98d4b"
    b = []
    b.append(rect(48, 96, 660, 560, lighten(base, 8), rx=16))
    b.append(circle(378, 400, 190, "#ffffff", 0.04))
    b.append(boot(270, 240, 1.05, lighten(base, 46), tan))
    b.append(label(78, 138, "STEP 3 / 6 — LEATHER", size=12, fill=LIME, weight=700, opacity=0.9))
    b.append(bar(78, 156, 240, fill=LIME, opacity=0.5, h=5))
    b.append(bar(318, 156, 300, opacity=0.15, h=5))
    px = 744
    b.append(label(px, 128, "CHOOSE YOUR LEATHER", size=14, opacity=0.85, weight=700))
    swatches = ["#8a5a2b", "#5c3a1e", "#a0703c", "#3d2a17", "#c98d4b", "#704820"]
    for i, c in enumerate(swatches):
        x = px + (i % 3) * 140
        y = 160 + (i // 3) * 150
        sel = i == 4
        b.append(rect(x, y, 120, 96, c, rx=12, stroke=LIME if sel else None))
        if sel:
            b.append(f'<rect x="{x - 4}" y="{y - 4}" width="128" height="104" rx="14" fill="none" stroke="{LIME}" stroke-width="3"/>')
        b.append(bar(x, y + 110, 84, opacity=0.35))
    b.append(rect(px, 486, 408, 88, lighten(base, 10), rx=12))
    b.append(label(px + 24, 522, "Ranahan · Whiskey Bison", size=14, opacity=0.8))
    b.append(label(px + 24, 550, "$745 CAD — made to order", size=12, fill=LIME, opacity=0.8))
    b.append(rect(px, 598, 196, 50, LIME, rx=10, opacity=0.92))
    b.append(label(px + 98, 629, "Next: Stitching", size=13, fill="#160e06", weight=700, anchor="middle"))
    b.append(rect(px + 212, 598, 196, 50, lighten(base, 14), rx=10))
    b.append(label(px + 310, 629, "Back", size=13, opacity=0.6, anchor="middle"))
    return frame(base, "".join(b), url="albertaboot.com/pages/boot-builder")


def boots_admin():
    base = "#2b1d12"
    b = [sidebar(base, items=6, active=2)]
    b.append(label(260, 118, "MATERIALS — LEATHER LIBRARY", size=15, opacity=0.85, weight=700))
    b.append(rect(1010, 90, 162, 40, LIME, rx=10, opacity=0.9))
    b.append(label(1091, 115, "Add material", size=12, fill="#160e06", weight=700, anchor="middle"))
    cols = [260, 340, 620, 800, 960, 1100]
    for i, htxt in enumerate(["", "NAME", "CATEGORY", "PRICE", "STATUS", ""]):
        if htxt:
            b.append(label(cols[i], 168, htxt, size=10, opacity=0.4, weight=700))
    swatches = ["#8a5a2b", "#5c3a1e", "#a0703c", "#3d2a17", "#c98d4b", "#704820", "#94612f"]
    for i, c in enumerate(swatches):
        ry = 192 + i * 72
        b.append(rect(248, ry, 924, 58, lighten(base, 6 if i % 2 else 10), rx=10))
        b.append(rect(cols[0] + 4, ry + 12, 48, 34, c, rx=8))
        b.append(bar(cols[1], ry + 24, 150 + (i * 53) % 80, opacity=0.5))
        b.append(bar(cols[2], ry + 24, 90, opacity=0.25))
        b.append(bar(cols[3], ry + 24, 60, opacity=0.35))
        on = i != 5
        b.append(rect(cols[4], ry + 16, 44, 24, LIME if on else lighten(base, 24), rx=12, opacity=0.85 if on else 1))
        b.append(circle(cols[4] + (32 if on else 12), ry + 28, 8, "#160e06" if on else "#ffffff", 0.9 if on else 0.4))
        b.append(label(cols[5], ry + 34, "···", size=14, opacity=0.4))
    return frame(base, "".join(b), url="admin.shopify.com/apps/boot-builder/materials")


# ------------------------------------------------------- Analytics
def polyline(points, stroke, width=3, opacity=1, fill="none"):
    pts = " ".join(f"{x},{y}" for x, y in points)
    return f'<polyline points="{pts}" stroke="{stroke}" stroke-width="{width}" fill="{fill}" opacity="{opacity}" stroke-linejoin="round" stroke-linecap="round"/>'


def analytics_dashboard():
    base = "#16213e"
    b = [sidebar(base, items=6, active=0)]
    stats = [("SPEND", "$48.2k", 30), ("IMPRESSIONS", "9.4M", 44), ("CTR", "3.8%", 12), ("ROAS", "5.1x", 62)]
    for i, (name, val, up) in enumerate(stats):
        x = 248 + i * 236
        b.append(rect(x, 84, 216, 110, lighten(base, 8), rx=12))
        b.append(label(x + 20, 116, name, size=10, opacity=0.4, weight=700))
        b.append(label(x + 20, 152, val, size=24, opacity=0.95, weight=700))
        b.append(label(x + 20, 178, f"▲ {up}%", size=11, fill=LIME, opacity=0.8))
    b.append(rect(248, 218, 604, 300, lighten(base, 8), rx=12))
    b.append(label(272, 254, "CAMPAIGN PERFORMANCE — 30 DAYS", size=11, opacity=0.5, weight=700))
    pts = [(280, 470), (340, 430), (400, 445), (460, 380), (520, 395), (580, 330), (640, 350), (700, 300), (760, 280), (820, 250)]
    area = pts + [(820, 494), (280, 494)]
    b.append(polyline(area, "none", fill=LIME, opacity=0.12))
    b.append(polyline(pts, LIME, width=3.5, opacity=0.95))
    b.append(polyline([(p[0], p[1] + 60) for p in pts], "#6f8ec9", width=2.5, opacity=0.55))
    for x, y in pts[-1:]:
        b.append(circle(x, y, 6, LIME))
    b.append(rect(876, 218, 296, 300, lighten(base, 8), rx=12))
    b.append(label(900, 254, "CHANNEL MIX", size=11, opacity=0.5, weight=700))
    for i, wd in enumerate([230, 180, 140, 96, 60]):
        ry = 286 + i * 44
        b.append(bar(900, ry, 248, opacity=0.1, h=16, rx=8))
        b.append(bar(900, ry, wd, fill=LIME, opacity=0.75 - i * 0.11, h=16, rx=8))
    b.append(rect(248, 542, 924, 110, lighten(base, 8), rx=12))
    b.append(circle(292, 597, 18, LIME, 0.9))
    b.append(label(286, 603, "AI", size=12, fill="#0b1226", weight=700))
    b.append(label(330, 588, "“Which campaigns drove the ROAS jump last week?”", size=14, opacity=0.75))
    b.append(bar(330, 608, 560, opacity=0.18))
    b.append(rect(1010, 574, 138, 44, lighten(base, 20), rx=22))
    b.append(label(1079, 601, "Ask Claude", size=12, fill=LIME, opacity=0.9, anchor="middle", weight=700))
    return frame(base, "".join(b), url="reports.idearanch.com/dashboards/q2")


def analytics_ai():
    base = "#16213e"
    b = [sidebar(base, items=6, active=3)]
    b.append(rect(300, 96, 620, 60, lighten(base, 18), rx=16))
    b.append(label(324, 132, "Compare paid social vs. search conversions by month", size=14, opacity=0.8))
    b.append(rect(248, 180, 760, 380, lighten(base, 8), rx=16))
    b.append(label(272, 216, "CLAUDE — GENERATED REPORT", size=11, fill=LIME, opacity=0.85, weight=700))
    b.append(bar(272, 238, 620, opacity=0.3))
    b.append(bar(272, 258, 540, opacity=0.2))
    months = 8
    for i in range(months):
        x = 292 + i * 84
        h1 = [120, 150, 135, 180, 200, 175, 225, 250][i]
        h2 = [90, 100, 130, 120, 150, 170, 160, 190][i]
        b.append(rect(x, 520 - h1 * 0.85, 26, h1 * 0.85, LIME, rx=5, opacity=0.85))
        b.append(rect(x + 32, 520 - h2 * 0.85, 26, h2 * 0.85, "#6f8ec9", rx=5, opacity=0.7))
    b.append(rect(1032, 180, 140, 380, lighten(base, 8), rx=16))
    b.append(label(1102, 214, "SOURCES", size=10, opacity=0.4, weight=700, anchor="middle"))
    for i in range(5):
        b.append(rect(1052, 234 + i * 62, 100, 46, lighten(base, 16), rx=10))
        b.append(bar(1064, 252 + i * 62, 66, opacity=0.35, h=8))
    b.append(rect(248, 588, 560, 52, lighten(base, 14), rx=26))
    b.append(label(276, 620, "Ask a follow-up…", size=13, opacity=0.35))
    b.append(rect(824, 588, 184, 52, LIME, rx=26, opacity=0.9))
    b.append(label(916, 620, "Export PDF", size=13, fill="#0b1226", weight=700, anchor="middle"))
    return frame(base, "".join(b), url="reports.idearanch.com/ai")


# --------------------------------------------------------- Scanline
def qr(x, y, size, fg, bg, module=None):
    """Decorative QR-ish pattern."""
    import random

    rnd = random.Random(7)
    n = 12
    cell = size / n
    out = [rect(x, y, size, size, bg, rx=14)]
    for i in range(n):
        for j in range(n):
            if (i < 4 and j < 4) or (i < 4 and j >= n - 4) or (i >= n - 4 and j < 4):
                continue
            if rnd.random() < 0.45:
                out.append(rect(x + j * cell + 2, y + i * cell + 2, cell - 4, cell - 4, fg, rx=cell / 3))
    for fx, fy in [(0, 0), (0, n - 4), (n - 4, 0)]:
        ox, oy = x + fy * cell, y + fx * cell
        out.append(rect(ox + 2, oy + 2, cell * 4 - 4, cell * 4 - 4, "none", rx=10, stroke=None))
        out.append(f'<rect x="{ox + 2}" y="{oy + 2}" width="{cell * 4 - 4}" height="{cell * 4 - 4}" rx="10" fill="none" stroke="{fg}" stroke-width="6"/>')
        out.append(rect(ox + cell + 4, oy + cell + 4, cell * 2 - 8, cell * 2 - 8, fg, rx=6))
    return "".join(out)


def scanline_studio():
    base = "#0f2419"
    b = [sidebar(base, items=6, active=1)]
    b.append(rect(248, 84, 560, 568, lighten(base, 6), rx=16))
    b.append(qr(388, 160, 280, "#0b1a12", "#f2fbe9"))
    b.append(rect(478, 260, 100, 80, LIME, rx=12, opacity=0.001))  # keep center clear
    b.append(label(528, 500, "scn.link/spring-menu", size=14, fill=LIME, opacity=0.9, anchor="middle", weight=700))
    b.append(label(528, 528, "DYNAMIC · 1,284 SCANS", size=11, opacity=0.45, anchor="middle"))
    px = 836
    b.append(rect(px, 84, 336, 568, lighten(base, 8), rx=16))
    b.append(label(px + 24, 122, "DESIGN STUDIO", size=11, fill=LIME, opacity=0.85, weight=700))
    sections = ["Dot style", "Corners", "Colors", "Logo", "Frame"]
    for i, s in enumerate(sections):
        ry = 152 + i * 88
        b.append(label(px + 24, ry, s, size=12, opacity=0.55))
        for j in range(4):
            sx = px + 24 + j * 74
            sel = (i + 1) % 4 == j
            b.append(rect(sx, ry + 12, 60, 44, lighten(base, 22 if sel else 12), rx=10))
            if sel:
                b.append(f'<rect x="{sx}" y="{ry + 12}" width="60" height="44" rx="10" fill="none" stroke="{LIME}" stroke-width="2.5"/>')
            b.append(circle(sx + 30, ry + 34, 9, "#ffffff", 0.25))
    b.append(rect(px + 24, 596, 288, 44, LIME, rx=10, opacity=0.92))
    b.append(label(px + 168, 623, "Export PNG · SVG · EPS", size=12, fill="#08130c", weight=700, anchor="middle"))
    return frame(base, "".join(b), url="scanline.app/studio/spring-menu")


def scanline_analytics():
    base = "#0f2419"
    b = [sidebar(base, items=6, active=3)]
    stats = [("TOTAL SCANS", "18,402"), ("UNIQUE", "11,210"), ("COUNTRIES", "34"), ("ACTIVE CODES", "126")]
    for i, (name, val) in enumerate(stats):
        x = 248 + i * 236
        b.append(rect(x, 84, 216, 96, lighten(base, 8), rx=12))
        b.append(label(x + 20, 114, name, size=10, opacity=0.4, weight=700))
        b.append(label(x + 20, 150, val, size=22, opacity=0.95, weight=700))
    b.append(rect(248, 204, 604, 448, lighten(base, 8), rx=12))
    b.append(label(272, 240, "SCANS BY GEOGRAPHY", size=11, opacity=0.5, weight=700))
    import random

    rnd = random.Random(3)
    for _ in range(90):
        x = 285 + rnd.random() * 530
        y = 270 + rnd.random() * 330
        r = 2 + rnd.random() * 7
        b.append(circle(x, y, r, LIME, 0.12 + rnd.random() * 0.5))
    b.append(rect(876, 204, 296, 448, lighten(base, 8), rx=12))
    b.append(label(900, 240, "DEVICES", size=11, opacity=0.5, weight=700))
    devices = [("iOS", 236), ("Android", 190), ("Desktop", 90), ("Other", 40)]
    for i, (name, wd) in enumerate(devices):
        ry = 272 + i * 58
        b.append(label(900, ry, name, size=11, opacity=0.55))
        b.append(bar(900, ry + 10, 248, opacity=0.1, h=14, rx=7))
        b.append(bar(900, ry + 10, wd, fill=LIME, opacity=0.8 - i * 0.15, h=14, rx=7))
    b.append(label(900, 528, "TOP CITIES", size=11, opacity=0.5, weight=700))
    for i in range(3):
        b.append(bar(900, 546 + i * 30, 140 - i * 30, opacity=0.3))
        b.append(label(1148, 556 + i * 30, f"{(3 - i) * 812}", size=11, fill=LIME, opacity=0.7, anchor="end"))
    return frame(base, "".join(b), url="scanline.app/analytics")


# ---------------------------------------------------------- Faunter
def faunter_library():
    base = "#1f1a2e"
    b = [sidebar(base, items=5, active=0)]
    b.append(rect(248, 84, 700, 40, lighten(base, 10), rx=20))
    b.append(label(272, 109, "Filter 342 team fonts…", size=13, opacity=0.35))
    b.append(rect(972, 84, 200, 40, lighten(base, 16), rx=20))
    b.append(circle(996, 104, 6, LIME))
    b.append(label(1014, 109, "All synced", size=12, fill=LIME, opacity=0.85))
    fonts = [
        ("Grotesk Display", "Aa", 34, True),
        ("Editorial Serif", "Aa", 30, True),
        ("Mono Terminal", "Aa", 28, True),
        ("Neue Humanist", "Aa", 32, False),
        ("Slab Poster", "Aa", 36, True),
        ("Script Brush", "Aa", 30, True),
    ]
    for i, (name, sample, sz, installed) in enumerate(fonts):
        x = 248 + (i % 2) * 476
        y = 152 + (i // 2) * 166
        b.append(rect(x, y, 448, 142, lighten(base, 8), rx=14))
        b.append(label(x + 28, y + 88, sample, size=56, opacity=0.9, weight=700))
        b.append(label(x + 130, y + 58, name, size=15, opacity=0.8, weight=700))
        b.append(bar(x + 130, y + 74, 120, opacity=0.25))
        b.append(label(x + 130, y + 112, "12 styles · OTF", size=11, opacity=0.4))
        if installed:
            b.append(circle(x + 404, y + 36, 10, LIME, 0.9))
            b.append(f'<path d="M{x + 399} {y + 36} l4 5 l8 -10" stroke="#120d1f" stroke-width="2.5" fill="none" stroke-linecap="round"/>')
        else:
            b.append(rect(x + 336, y + 22, 92, 30, LIME, rx=15, opacity=0.9))
            b.append(label(x + 382, y + 41, "Install", size=11, fill="#120d1f", weight=700, anchor="middle"))
    return frame(base, "".join(b), title="Faunter — Team Library")


def faunter_team():
    base = "#1f1a2e"
    b = [sidebar(base, items=5, active=2)]
    b.append(label(260, 122, "TEAM SYNC STATUS", size=15, opacity=0.85, weight=700))
    b.append(rect(1000, 92, 172, 42, LIME, rx=10, opacity=0.9))
    b.append(label(1086, 118, "Upload fonts", size=12, fill="#120d1f", weight=700, anchor="middle"))
    members = [(True, 342), (True, 342), (True, 340), (False, 318), (True, 342), (True, 342)]
    for i, (ok, count) in enumerate(members):
        ry = 160 + i * 82
        b.append(rect(248, ry, 924, 68, lighten(base, 8 if i % 2 else 5), rx=12))
        b.append(circle(292, ry + 34, 20, lighten(base, 34)))
        b.append(bar(332, ry + 22, 140, opacity=0.5))
        b.append(bar(332, ry + 42, 90, opacity=0.2, h=8))
        b.append(label(760, ry + 40, f"{count}/342 fonts", size=12, opacity=0.5))
        pill = LIME if ok else "#f3b53a"
        txt = "synced" if ok else "syncing…"
        b.append(rect(1024, ry + 18, 120, 32, lighten(base, 16), rx=16))
        b.append(circle(1046, ry + 34, 5, pill))
        b.append(label(1060, ry + 39, txt, size=11, fill=pill, opacity=0.9))
    return frame(base, "".join(b), title="Faunter — Team")


# --------------------------------------------------------- Idea Ranch
def idearanch_home():
    base = "#241a10"
    b = []
    b.append(rect(0, 56, W, 70, lighten(base, 4), rx=0))
    b.append(circle(70, 91, 14, LIME, 0.9))
    for i in range(4):
        b.append(bar(760 + i * 92, 86, 60, opacity=0.4))
    b.append(rect(1084, 74, 84, 34, LIME, rx=17, opacity=0.9))
    b.append(label(90, 300, "IDEAS THAT", size=64, opacity=0.95, weight=800))
    b.append(label(90, 380, "RAISE THE", size=64, opacity=0.95, weight=800))
    b.append(f'<text x="90" y="460" font-family="{MONO}" font-size="64" font-weight="800" fill="{LIME}">HERD.</text>')
    b.append(bar(90, 500, 380, opacity=0.25))
    b.append(bar(90, 522, 300, opacity=0.15))
    b.append(rect(90, 566, 190, 52, LIME, rx=26, opacity=0.92))
    b.append(label(185, 598, "See the work", size=13, fill="#140d05", weight=700, anchor="middle"))
    for i in range(3):
        x = 640 + (i % 2) * 250
        y = 180 + (i // 2) * 250 + (i % 2) * 60
        b.append(rect(x, y, 230, 230, lighten(base, 14 + i * 8), rx=16))
        b.append(circle(x + 115, y + 100, 40, "#ffffff", 0.07))
        b.append(bar(x + 24, y + 180, 120, opacity=0.35))
    return frame(base, "".join(b), url="idearanch.com")


def idearanch_cms():
    base = "#241a10"
    b = [sidebar(base, items=7, active=3)]
    b.append(label(260, 118, "PAGES / HOME — EDITING", size=13, opacity=0.75, weight=700))
    b.append(rect(1004, 88, 82, 40, lighten(base, 16), rx=10))
    b.append(label(1045, 113, "Draft", size=11, opacity=0.6, anchor="middle"))
    b.append(rect(1096, 88, 76, 40, LIME, rx=10, opacity=0.9))
    b.append(label(1134, 113, "Publish", size=11, fill="#140d05", weight=700, anchor="middle"))
    blocks = ["HERO", "SERVICES GRID", "CASE STUDIES", "TEAM CAROUSEL"]
    for i, name in enumerate(blocks):
        ry = 156 + i * 122
        b.append(rect(248, ry, 700, 104, lighten(base, 8), rx=12))
        b.append(f'<rect x="248" y="{ry}" width="6" height="104" rx="3" fill="{LIME}" opacity="{0.9 if i == 1 else 0.25}"/>')
        b.append(label(278, ry + 34, name, size=11, fill=LIME if i == 1 else "#ffffff", opacity=0.8 if i == 1 else 0.45, weight=700))
        b.append(bar(278, ry + 52, 420 - i * 40, opacity=0.25))
        b.append(bar(278, ry + 72, 300, opacity=0.15))
        b.append(label(920, ry + 60, "⋮⋮", size=16, opacity=0.3, anchor="middle"))
    px = 976
    b.append(rect(px, 156, 196, 470, lighten(base, 6), rx=12))
    b.append(label(px + 20, 190, "FIELDS", size=10, opacity=0.4, weight=700))
    for i in range(6):
        b.append(bar(px + 20, 212 + i * 66, 100, opacity=0.35, h=8))
        b.append(rect(px + 20, 228 + i * 66, 156, 30, lighten(base, 14), rx=8))
    return frame(base, "".join(b), url="idearanch.com/admin/collections/pages")


if __name__ == "__main__":
    # Only DAM and Faunter still use mockups — the other projects use real
    # screenshots captured from live/dev sites.
    os.makedirs(OUT, exist_ok=True)
    save("dam-library.svg", dam_grid())
    save("dam-asset-detail.svg", dam_detail())
    save("faunter-library.svg", faunter_library())
    save("faunter-team.svg", faunter_team())

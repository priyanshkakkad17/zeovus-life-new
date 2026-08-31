"""
Zeovus Life — Label Compositor
Draws one product label (matching the Canva template layout we built:
white logo zone + dark green body, product name, sub-line, format, 3 bullets)
purely in code via Pillow. No AI generation — every pixel is deterministic
and driven by data, so label copy is always exactly what's in the source row.
"""

import cairosvg
from PIL import Image, ImageDraw, ImageFont
import textwrap
import os

HERE = os.path.dirname(os.path.abspath(__file__))

# ---- Brand constants (from Zeovus Life brand guidelines) ----
BRAND_GREEN = "#1F4015"
BRAND_GREEN_ACCENT = "#15A859"
WHITE = "#FFFFFF"
BROWN = "#583824"

CANVAS_W, CANVAS_H = 1346, 900  # 2x the original 673x450 for crisp export

INTER_PATH = os.path.join(HERE, "Inter-Bold.ttf")
POPPINS_REGULAR = os.path.join(HERE, "Poppins-Regular.ttf")
POPPINS_MEDIUM = os.path.join(HERE, "Poppins-Medium.ttf")
POPPINS_BOLD = os.path.join(HERE, "Poppins-Bold.ttf")
LOGO_SVG = os.path.join(HERE, "logo.svg")
SPROUT_ICON_PATH = os.path.join(HERE, "sprout_icon.png")

_logo_cache = None
_sprout_cache = None


def get_logo(width_px):
    """Render logo.svg to a PIL RGBA image at the requested width, cached per width."""
    global _logo_cache
    key = width_px
    if _logo_cache is None:
        _logo_cache = {}
    if key not in _logo_cache:
        png_bytes = cairosvg.svg2png(url=LOGO_SVG, output_width=width_px)
        from io import BytesIO
        _logo_cache[key] = Image.open(BytesIO(png_bytes)).convert("RGBA")
    return _logo_cache[key]


def get_sprout_icon(width_px):
    """Load the brand sprout/leaf icon, scaled to the requested width, cached."""
    global _sprout_cache
    if _sprout_cache is None:
        _sprout_cache = {}
    if width_px not in _sprout_cache:
        icon = Image.open(SPROUT_ICON_PATH).convert("RGBA")
        aspect = icon.height / icon.width
        new_h = int(width_px * aspect)
        _sprout_cache[width_px] = icon.resize((width_px, new_h), Image.LANCZOS)
    return _sprout_cache[width_px]


def inter_font(size, weight=700):
    """Load Inter at a specific weight via variable font axis."""
    font = ImageFont.truetype(INTER_PATH, size)
    try:
        font.set_variation_by_axes([weight])
    except Exception:
        pass
    return font


def wrap_text(draw, text, font, max_width):
    """Word-wrap text to fit max_width, return list of lines."""
    words = text.split()
    lines = []
    current = ""
    for w in words:
        trial = (current + " " + w).strip()
        bbox = draw.textbbox((0, 0), trial, font=font)
        if bbox[2] - bbox[0] <= max_width or not current:
            current = trial
        else:
            lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines


def draw_bullet_icon(draw, cx, cy, r=14):
    """Small filled white circle as the bullet marker (matches reference style)."""
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=WHITE)
    # simple green checkmark-ish dot inside for visual interest
    draw.ellipse([cx - r * 0.4, cy - r * 0.4, cx + r * 0.4, cy + r * 0.4], fill=BRAND_GREEN_ACCENT)


def compose_label(data, output_path):
    """
    data: dict with keys:
        product_name (str)
        sub_line (str)      - key ingredients line
        format (str)        - e.g. "Capsule", "Tablet"
        count (str)         - e.g. "30" (placeholder unless real fill data exists)
        bullets (list[str]) - 2 or 3 short benefit phrases
    """
    img = Image.new("RGB", (CANVAS_W, CANVAS_H), BRAND_GREEN)
    draw = ImageDraw.Draw(img)

    # White top zone (logo area) — matches Canva template's 140/450 ratio, scaled 2x
    white_zone_h = int(140 * (CANVAS_H / 450))
    draw.rectangle([0, 0, CANVAS_W, white_zone_h], fill=WHITE)

    # Logo, placed top-left within white zone
    logo = get_logo(width_px=440)
    logo_x, logo_y = 80, 40
    img.paste(logo, (logo_x, logo_y), logo)

    # Sprout icon intentionally omitted — approved reference design (Omega 3
    # sample) does not include it. Keeping get_sprout_icon() defined but unused
    # in case it's wanted again later.

    # ---- Product name (auto-fit: shrink font, then wrap to 2 lines if still too wide) ----
    max_name_width = CANVAS_W - 160
    name_text = data["product_name"].upper()
    name_size = 84
    name_font = inter_font(name_size, weight=800)
    while name_size > 40:
        bbox = draw.textbbox((0, 0), name_text, font=name_font)
        if bbox[2] - bbox[0] <= max_name_width:
            break
        name_size -= 4
        name_font = inter_font(name_size, weight=800)

    name_y = white_zone_h + 50
    name_lines = wrap_text(draw, name_text, name_font, max_name_width)[:2]
    line_height = int(name_size * 1.15)
    for i, line in enumerate(name_lines):
        draw.text((80, name_y + i * line_height), line, font=name_font, fill=WHITE)
    name_block_height = len(name_lines) * line_height

    # ---- Sub-line (key ingredients) — upsized + medium weight for clarity ----
    sub_font = ImageFont.truetype(POPPINS_MEDIUM, 34)
    sub_y = name_y + name_block_height + 22
    sub_lines = wrap_text(draw, data["sub_line"], sub_font, CANVAS_W - 160)
    for i, line in enumerate(sub_lines[:2]):  # cap at 2 lines to keep layout stable
        draw.text((80, sub_y + i * 44), line, font=sub_font, fill=WHITE)

    # ---- Format + count — upsized + bold for clarity ----
    fmt_font = ImageFont.truetype(POPPINS_BOLD, 32)
    fmt_y = sub_y + len(sub_lines[:2]) * 44 + 18
    fmt_text = f"{data['format']}" + (f"   {data['count']}" if data.get("count") else "")
    draw.text((80, fmt_y), fmt_text, font=fmt_font, fill=WHITE)

    # ---- Bullets (bold + larger for legibility at bottle scale) ----
    bullet_font = ImageFont.truetype(POPPINS_BOLD, 36)
    bullet_y = fmt_y + 80
    bullets = data.get("bullets", [])[:3]
    for b in bullets:
        draw_bullet_icon(draw, cx=104, cy=bullet_y + 18, r=16)
        lines = wrap_text(draw, b.upper(), bullet_font, CANVAS_W - 220)
        for j, line in enumerate(lines[:2]):
            draw.text((150, bullet_y + j * 42), line, font=bullet_font, fill=WHITE)
        bullet_y += max(len(lines[:2]), 1) * 42 + 30

    img.save(output_path, "PNG")
    return output_path


if __name__ == "__main__":
    # Quick smoke test with your actual Omega-3 reference content
    sample = {
        "product_name": "Omega 3",
        "sub_line": "Co-Enzyme, L-Arginine, Omega 3 Fatty Acid",
        "format": "Softgel",
        "count": "30",
        "bullets": [
            "Cardiovascular Support",
            "Improves Brain Function",
            "Maintains Joint Health",
        ],
    }
    out = compose_label(sample, os.path.join(HERE, "test_output.png"))
    print("Saved:", out)

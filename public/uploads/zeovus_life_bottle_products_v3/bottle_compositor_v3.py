"""
Composites the existing approved Zeovus Life label onto the new AI-generated
bottle base (ChatGPT_Image...png), which has premium glossy opaque amber
glass and a black... actually dark green cap, wide-ish label region.
"""
from PIL import Image
import numpy as np
import os

HERE = os.path.dirname(os.path.abspath(__file__))
BOTTLE_BASE = os.path.join(HERE, "bottle_base_final.png")

LABEL_X0, LABEL_X1 = 408, 953
LABEL_Y0, LABEL_Y1 = 370, 963


def apply_cylindrical_shading(label_img):
    w, h = label_img.size
    arr = np.array(label_img).astype(float)
    x = np.linspace(-1, 1, w)
    shade = 0.92 + 0.13 * (1 - x**2)
    shade = np.tile(shade, (h, 1))
    for c in range(3):
        arr[..., c] = np.clip(arr[..., c] * shade, 0, 255)
    return Image.fromarray(arr.astype("uint8"))


def composite_bottle(label_path, output_path):
    bottle = Image.open(BOTTLE_BASE).convert("RGB")
    label = Image.open(label_path).convert("RGB")

    target_w = LABEL_X1 - LABEL_X0
    target_h = LABEL_Y1 - LABEL_Y0
    label_resized = label.resize((target_w, target_h), Image.LANCZOS)
    label_shaded = apply_cylindrical_shading(label_resized)

    bottle.paste(label_shaded, (LABEL_X0, LABEL_Y0))
    bottle.save(output_path, "PNG", quality=95)
    return output_path


if __name__ == "__main__":
    composite_bottle(
        "/home/claude/compositor/test_final_approved.png",
        "sample_v3_final.png",
    )
    print("done")

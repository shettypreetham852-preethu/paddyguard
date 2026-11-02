import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path

def create_leaf_base():
    """Generates an elongated realistic paddy leaf blade with natural green gradients."""
    width, height = 480, 480
    img = Image.new("RGB", (width, height), (242, 246, 240))
    draw = ImageDraw.Draw(img)

    # Gradient background to give agronomic outdoor field ambiance
    for y in range(height):
        factor = y / height
        bg_r = int(235 - factor * 25)
        bg_g = int(245 - factor * 15)
        bg_b = int(235 - factor * 20)
        draw.line([(0, y), (width, y)], fill=(bg_r, bg_g, bg_b))

    # Leaf blade contour: elongated lanceolate shape running diagonally or vertically
    leaf_canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    leaf_draw = ImageDraw.Draw(leaf_canvas)

    # Curved natural leaf points
    points = []
    # Left margin
    for y in range(40, 440, 5):
        t = (y - 40) / 400.0
        # Leaf width profile
        w = math.sin(t * math.pi) * 65.0
        x = 240 - w + math.sin(t * 3.0) * 15
        points.append((x, y))
    # Right margin
    for y in range(440, 40, -5):
        t = (y - 40) / 400.0
        w = math.sin(t * math.pi) * 65.0
        x = 240 + w + math.sin(t * 3.0) * 15
        points.append((x, y))

    leaf_draw.polygon(points, fill=(46, 125, 50, 255))

    # Central midrib vein
    for y in range(50, 430, 2):
        t = (y - 40) / 400.0
        mx = 240 + math.sin(t * 3.0) * 15
        leaf_draw.line([(mx - 1, y), (mx + 1, y)], fill=(129, 199, 132, 220))

    # Parallel fine secondary veins
    for y in range(60, 420, 8):
        t = (y - 40) / 400.0
        w = math.sin(t * math.pi) * 55.0
        mx = 240 + math.sin(t * 3.0) * 15
        leaf_draw.line([(mx - w, y), (mx + w, y)], fill=(56, 142, 60, 180), width=1)

    return img, leaf_canvas

def generate_healthy():
    base, leaf = create_leaf_base()
    base.paste(leaf, (0, 0), leaf)
    return base

def generate_bacterial_blight():
    base, leaf = create_leaf_base()
    draw = ImageDraw.Draw(leaf)
    # Wavy pale yellow-white necrotic margins
    for y in range(60, 360, 3):
        t = (y - 40) / 400.0
        w = math.sin(t * math.pi) * 65.0
        mx = 240 + math.sin(t * 3.0) * 15
        edge_x = mx - w
        # Draw wavy yellowish lesion extending inward
        blight_width = 15 + math.sin(y * 0.15) * 8 + math.cos(y * 0.3) * 6
        draw.line([(edge_x, y), (edge_x + blight_width, y)], fill=(235, 215, 130, 240), width=3)
        draw.line([(edge_x + blight_width, y), (edge_x + blight_width + 4, y)], fill=(200, 170, 70, 180), width=2)
    base.paste(leaf, (0, 0), leaf)
    return base

def generate_leaf_blast():
    base, leaf = create_leaf_base()
    draw = ImageDraw.Draw(leaf)
    # Spindle / diamond shaped lesions with gray center and brown/purple border
    lesion_centers = [(230, 140), (255, 210), (220, 280), (260, 330), (235, 380)]
    for cx, cy in lesion_centers:
        # Diamond outer halo (yellow)
        draw.polygon([(cx, cy - 25), (cx + 14, cy), (cx, cy + 25), (cx - 14, cy)], fill=(210, 180, 50, 190))
        # Brown necrotized ring
        draw.polygon([(cx, cy - 18), (cx + 10, cy), (cx, cy + 18), (cx - 10, cy)], fill=(120, 45, 20, 230))
        # Ash-gray center
        draw.polygon([(cx, cy - 10), (cx + 5, cy), (cx, cy + 10), (cx - 5, cy)], fill=(215, 220, 215, 240))
    base.paste(leaf, (0, 0), leaf)
    return base

def generate_brown_spot():
    base, leaf = create_leaf_base()
    draw = ImageDraw.Draw(leaf)
    # Circular to oval brown spots with yellow halos
    spots = [
        (225, 120, 7), (250, 160, 9), (235, 200, 11), (265, 240, 8),
        (215, 270, 10), (245, 300, 6), (230, 340, 12), (255, 370, 7),
        (220, 170, 6), (260, 190, 8), (240, 250, 7)
    ]
    for cx, cy, r in spots:
        # Yellow chlorotic halo
        draw.ellipse([(cx - r - 3, cy - r - 2), (cx + r + 3, cy + r + 2)], fill=(225, 205, 75, 180))
        # Dark brown lesion
        draw.ellipse([(cx - r, cy - r + 1), (cx + r, cy + r - 1)], fill=(92, 51, 23, 240))
        # Lighter gray-brown center
        draw.ellipse([(cx - r//2, cy - r//2), (cx + r//2, cy + r//2)], fill=(140, 95, 60, 230))
    base.paste(leaf, (0, 0), leaf)
    return base

def generate_leaf_smut():
    base, leaf = create_leaf_base()
    draw = ImageDraw.Draw(leaf)
    # Slightly raised angular black spots
    for y in range(100, 400, 14):
        cx = 240 + math.sin(y * 0.1) * 30
        draw.rectangle([(cx - 4, y - 2), (cx + 4, y + 2)], fill=(25, 25, 25, 240))
        # Angular facet
        draw.line([(cx - 5, y), (cx + 5, y)], fill=(10, 10, 10, 255), width=2)
    base.paste(leaf, (0, 0), leaf)
    return base

def generate_tungro():
    base, leaf = create_leaf_base()
    draw = ImageDraw.Draw(leaf)
    # Vibrant orange-yellow discoloration from tip down
    for y in range(40, 280, 2):
        t = (y - 40) / 240.0
        intensity = max(0.0, 1.0 - t)
        w = math.sin((y - 40) / 400.0 * math.pi) * 65.0
        mx = 240 + math.sin((y - 40) / 400.0 * 3.0) * 15
        alpha = int(intensity * 230)
        draw.line([(mx - w, y), (mx + w, y)], fill=(245, 160, 20, alpha), width=3)
    base.paste(leaf, (0, 0), leaf)
    return base

def generate_sheath_blight():
    base, leaf = create_leaf_base()
    draw = ImageDraw.Draw(leaf)
    # Banded snake-skin oval lesions with greenish-gray center & dark border
    lesions = [(235, 270, 35, 18), (250, 330, 42, 22), (230, 390, 45, 24)]
    for cx, cy, rx, ry in lesions:
        # Dark reddish-brown irregular border
        draw.ellipse([(cx - rx - 2, cy - ry - 2), (cx + rx + 2, cy + ry + 2)], fill=(105, 42, 18, 220))
        # Greenish-gray snake skin center
        draw.ellipse([(cx - rx, cy - ry), (cx + rx, cy + ry)], fill=(168, 182, 155, 240))
        # Sclerotial dark dots
        draw.ellipse([(cx - 5, cy - 3), (cx - 2, cy)], fill=(45, 20, 10, 255))
        draw.ellipse([(cx + 4, cy + 2), (cx + 7, cy + 5)], fill=(45, 20, 10, 255))
    base.paste(leaf, (0, 0), leaf)
    return base

def main():
    generators = {
        "healthy.jpg": generate_healthy,
        "bacterial_blight.jpg": generate_bacterial_blight,
        "leaf_blast.jpg": generate_leaf_blast,
        "brown_spot.jpg": generate_brown_spot,
        "leaf_smut.jpg": generate_leaf_smut,
        "tungro.jpg": generate_tungro,
        "sheath_blight.jpg": generate_sheath_blight,
    }

    out_dirs = [
        Path(__file__).parent.parent / "static" / "samples",
        Path(__file__).parent.parent.parent / "frontend" / "public" / "samples"
    ]

    for d in out_dirs:
        d.mkdir(parents=True, exist_ok=True)
        for fname, gen in generators.items():
            img = gen()
            img.save(d / fname, quality=92)
            print(f"Saved {fname} to {d}")

if __name__ == "__main__":
    main()

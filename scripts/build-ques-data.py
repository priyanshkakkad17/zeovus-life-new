import openpyxl, json, re

SRC = r'C:\Users\DELL\Downloads\QUES_Product_Catalog_Descriptions.xlsx'
wb = openpyxl.load_workbook(SRC)

# Map sheet -> category meta (division cosmetics)
CATEGORY_META = {
    'Face Care':  {'slug': 'face-care',  'icon': 'sparkles', 'color_from': '#EC4899', 'color_to': '#A855F7', 'sort_order': 1,
                   'description': 'Targeted facial skincare — cleansers, serums, moisturisers and treatments formulated around single, studied actives.'},
    'Body Care':  {'slug': 'body-care',  'icon': 'droplet',  'color_from': '#0891B2', 'color_to': '#1A475C', 'sort_order': 2,
                   'description': 'Body washes, lotions, exfoliators and treatments for smooth, healthy, well-cared-for skin from neck to toe.'},
    'Hair Care':  {'slug': 'hair-care',  'icon': 'droplet',  'color_from': '#F59E0B', 'color_to': '#15A859', 'sort_order': 3,
                   'description': 'Scalp and hair treatments — growth actives, bond repair, anti-dandruff and frizz control built on proven mechanisms.'},
    'Baby Care':  {'slug': 'baby-care',  'icon': 'baby',     'color_from': '#06B6D4', 'color_to': '#3B82F6', 'sort_order': 4,
                   'description': 'Gentle, minimalist formulations designed for delicate baby skin and hair, free from unnecessary irritants.'},
    'Teen Care':  {'slug': 'teen-care',  'icon': 'sun',      'color_from': '#9CCD62', 'color_to': '#15A859', 'sort_order': 5,
                   'description': 'Single-active, minimalist routines tuned to adolescent skin and hair physiology.'},
}

def slugify(s):
    s = re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
    return s[:145]

def clean(v):
    if v is None:
        return None
    v = str(v).strip()
    return v if v else None

categories = []
for ws in wb.worksheets:
    title = ws.title
    meta = CATEGORY_META[title]
    rows = [list(r) for r in ws.iter_rows(values_only=True)]
    # find header row (contains "Product Name")
    header_idx = None
    for i, row in enumerate(rows[:6]):
        if row and any(isinstance(c, str) and c.strip() == 'Product Name' for c in row):
            header_idx = i
            break
    data_rows = rows[header_idx + 1:]

    subcats = {}   # name -> sort_order
    products = []
    sub_order = 0
    for row in data_rows:
        subcat = clean(row[0]) if len(row) > 0 else None
        name = clean(row[1]) if len(row) > 1 else None
        if not name:
            continue
        description = clean(row[2]) if len(row) > 2 else None
        skin_hair_type = clean(row[3]) if len(row) > 3 else None
        concerns = clean(row[4]) if len(row) > 4 else None
        suitable_for = clean(row[5]) if len(row) > 5 else None
        potent = clean(row[6]) if len(row) > 6 else None
        sizes = clean(row[7]) if len(row) > 7 else None

        if subcat and subcat not in subcats:
            sub_order += 1
            subcats[subcat] = sub_order

        products.append({
            'name': name,
            'subcat': subcat,
            'description': description,
            'skin_hair_type': skin_hair_type,
            'concerns_addressed': concerns,
            'suitable_for': suitable_for,
            'what_makes_potent': potent,
            'manufacturing_formats': sizes,
        })

    categories.append({
        'slug': meta['slug'],
        'name': title,
        'division': 'cosmetics',
        'description': meta['description'],
        'icon': meta['icon'],
        'color_from': meta['color_from'],
        'color_to': meta['color_to'],
        'sort_order': meta['sort_order'],
        'subcategories': [{'name': n, 'slug': slugify(n), 'sort_order': o} for n, o in subcats.items()],
        'products': products,
    })

out_path = r'C:\Users\DELL\Desktop\zeovuslife\scripts\ques-catalog.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(categories, f, ensure_ascii=False, indent=2)

# Summary
total = 0
for c in categories:
    total += len(c['products'])
    print(f"{c['name']}: {len(c['products'])} products, {len(c['subcategories'])} subcategories")
    for s in c['subcategories']:
        cnt = sum(1 for p in c['products'] if p['subcat'] == s['name'])
        print(f"    - {s['name']} ({cnt})")
print(f"TOTAL PRODUCTS: {total}")
print(f"Wrote {out_path}")

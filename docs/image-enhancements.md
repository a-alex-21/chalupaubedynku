# Website photography

Three existing property photographs were edited using the built-in image generation tool. Original photographs remain in `assets/img/`; the new sibling files are used throughout the site. WebP versions are optimized for page delivery, and JPEG versions are used for enlarged photos and social previews.

- `assets/img/chalupa-editorial.webp` and `.jpg`: chalet exterior; balanced natural late-afternoon light, recovered sky/shadow detail, restrained timber and green tones, same property and composition.
- `assets/img/obyvaci-pokoj-editorial.webp` and `.jpg`: living room; cleaner natural light and white balance, temporary Christmas decorations removed, original fireplace, sofa and permanent furniture retained.
- `assets/img/pergola-editorial.webp` and `.jpg`: pergola; restored detail, corrected orange cast, balanced garden highlights, original structure and furnishings retained.

## Final prompts

### Chalet exterior
Use case: lighting-weather. Edit target: the attached actual photograph of Chalupa u Bedynku. Create a professional hospitality architectural photo edit for the property's website, landscape 4:3. Preserve this exact chalet, camera angle, all architectural proportions, windows, roof, garden structures, foliage and landscape. Do not redesign, invent, remove or add buildings or amenities. Enhance only photographic quality: natural soft late-afternoon light, recover sky and shadow detail, restrained warm timber tones, natural deep greens, neutral whites, subtle lens and perspective correction, crisp realistic detail. Premium editorial travel magazine color grading, clean and inviting, no heavy HDR, no oversaturation, no fictional mountains, no people, no text. The output must clearly remain this real property.

### Living room
Use case: lighting-weather / precise-object-edit. Edit target: actual attached rental chalet living room photograph. Produce a clean professional architectural editorial photograph in landscape 16:9. Preserve exact room geometry, exact original stone fireplace, dark leather sofa and check cushions, TV and its stand, wood beams, coffee table, curtain colors, windows and every permanent furnishing. Only improve photo lighting, white balance, shadow detail and sharpness, reduce wide angle distortion. Remove temporary Christmas ornaments and hanging stockings and clutter on the mantel and table, leaving the original surfaces clean; do not replace furniture or add objects, do not renovate. Soft natural daylight, warm neutral white walls, restrained warm wood, realistic details, authentic inviting mountain home, premium boutique accommodation photography without artificial HDR. No text, no people.

### Pergola
Use case: lighting-weather. Edit target: attached actual photo of a Czech rental chalet's covered wooden pergola. Make a clean professional hospitality photograph, landscape 3:2. Preserve exact timber structure, table, all chairs, brick fireplace, dartboard, paved floor, garden and perspective. Do not invent or redesign amenities or furniture. Improve resolution and restore photographic detail, correct excessive orange wood cast to natural warm timber, neutralize whites, recover garden highlights, soft natural daylight, balanced exposure, crisp realistic surfaces. Inviting editorial mountain retreat photography, understated premium finish, no HDR, no excessive saturation, no people, no text, no added decorations. Output must remain an accurate photo of this specific pergola.


## Remaining website photographs — second pass

All eight remaining property and surroundings photographs were edited with the built-in image generation tool. Original images remain unchanged. The site now uses optimized WebP versions in `public/assets/img/`; JPEG companions are retained for reuse and social previews. Framing and perspective were adjusted conservatively, with natural light and consistent color. Bedroom bedding was tidied digitally. These are AI-enhanced photographic reconstructions, not new on-site photographs.

- `public/assets/img/loznice-1-editorial.webp` and `public/assets/img/loznice-1-editorial.jpg` (1536 × 1024).
- `public/assets/img/loznice-2-editorial.webp` and `public/assets/img/loznice-2-editorial.jpg` (1536 × 1024).
- `public/assets/img/loznice-3-editorial.webp` and `public/assets/img/loznice-3-editorial.jpg` (1536 × 1024).
- `public/assets/img/kuchyn-editorial.webp` and `public/assets/img/kuchyn-editorial.jpg` (1536 × 1024).
- `public/assets/img/sauna-editorial.webp` and `public/assets/img/sauna-editorial.jpg` (1122 × 1402).
- `public/assets/img/chalupa-v-zime-editorial.webp` and `public/assets/img/chalupa-v-zime-editorial.jpg` (1536 × 1024).
- `public/assets/img/pohadkova-vesnicka-editorial.webp` and `public/assets/img/pohadkova-vesnicka-editorial.jpg` (1085 × 1450).
- `public/assets/img/sjezdovka-editorial.webp` and `public/assets/img/sjezdovka-editorial.jpg` (1536 × 1024).

Exact prompts, source outputs, and the targeted winter sign correction are recorded in [photo-enhancements-round-two.json](photo-enhancements-round-two.json).


## Summer hero detail restoration

The summer image now uses `public/assets/img/chalupa-summer-sharp.webp` (high-quality WebP) and its JPEG companion. Fine detail was regenerated with the built-in image tool; a second edit corrected roof texture to match the existing flat panels. Output dimensions remain 1448 × 1086, not native 4K. Previous versions are retained. Exact prompts: [summer-hero-enhancement.json](summer-hero-enhancement.json).


## Horizontal sauna photograph

`public/assets/img/sauna-horizontal.webp` and `.jpg` replace the portrait image in the hero, room selector and gallery. Generated using the built-in image tool from the existing sauna photograph; landscape framing makes the rear bench visible. The mobile hero crop is positioned toward the bench. Original portrait retained. Exact prompt: [sauna-horizontal.json](sauna-horizontal.json).

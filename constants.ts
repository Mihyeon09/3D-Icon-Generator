export const INITIAL_JSON_PROMPT = `{
  "task": "generate a [{{ICON_NAME}}] icon with this json style",
  "icon_style": {
    "perspective": "isometric",
    "geometry": {
      "proportions": "1:1 ratio canvas, with objects fitting comfortably within margins",
      "element_arrangement": "central dominant object, with supporting elements symmetrically or diagonally placed",
      "form_characteristics": "predominantly rounded and smooth, almost 'bubbly' shapes, with soft, friendly curves and no sharp edges for a playful, approachable appearance"
    },
    "composition": {
      "element_count": "1-3 main, clearly defined objects, maintaining simplicity",
      "spatial_depth": "distinct layering to create a strong sense of dimension and slight elevation from the base, with clear visual separation between elements",
      "scale_consistency": "uniform and harmonious object scale across the icon set",
      "scene_density": "minimal to moderate, ensuring extreme clarity and a focused visual center without any clutter"
    },
    "lighting": {
      "type": "soft, diffused studio lighting with a clean feel",
      "light_source": "primary light from top-front or top-right, creating a gentle yet distinct illumination, mimicking a professional render setup",
      "shadow": "no drop shadows on the ground or base of the object. Shadows should only appear subtly within the object's own form due to internal curvature or overlapping elements, enhancing 3D depth without external cast shadows.",
      "highlighting": "pronounced, specular highlights on glossy surfaces and mild, crisp edge illumination to clearly define forms and convey the plastic and subtle metallic materials"
    },
    "textures": {
      "material_finish": "predominantly smooth, high-gloss blue plastic combined with clean matte white plastic. Subtle metallic (silver/chrome-like) or light blue glossy plastic should be used minimally for small accent details.",
      "surface_treatment": "impeccably sleek and clean, free from any textures, scratches, or imperfections, emphasizing a flawless digital render",
      "texture_realism": "stylized and pristine, focusing on the idealized cleanliness and reflectivity of new plastic and polished metal, rather than real-world imperfections"
    },
    "render_quality": {
      "resolution": "ultra high-resolution 3D rendering (e.g., Octane Render or similar quality), optimized for sharp display on digital screens",
      "edge_definition": "extremely crisp and clean edges, without any outlines or strokes; object separation is achieved purely through distinct colors, strong lighting, and clear depth perception",
      "visual_clarity": "exceptional, with highly readable, almost iconic shapes that are immediately recognizable and visually appealing"
    },
    "color_palette": {
      "tone": "bright and clean, with a cheerful and energetic feel, precisely mirroring the vibrant saturation and distinct bright tones of the provided reference image set for all colors.",
      "range": "A core harmonious palette dominantly featuring vibrant, bright blues (exactly matching the main blue of the suitcase, e.g., #2962FF or similar highly saturated, primary blue) and crisp, clean whites (#ffffff) as the primary combination. Bright, clear light blue (exactly matching the lighter blue of the calendar/clouds, e.g., #4FC3F7 or similar vibrant sky blue) is used sparingly and strategically as a minimal accent color. When an icon subject inherently implies a distinct color (e.g., sun is yellow #facc15, rocket flame is red #ef4444, autumn leaves are orange/red #f59e0b, car wheels are dark gray/black, headlights are yellow), those specific colors should be vibrantly represented to maintain visual fidelity to the object, while the overall icon still predominantly uses a bright blue and white palette.",
      "usage": "Blues (vibrant main blue) and whites are the primary and most prominent colors for structural and main elements, forming the base of the design. Bright light blue is reserved for small, intentional accent details. Specific elements like suns, flames, car wheels, and headlights should use their inherent vibrant or expected colors as accents, ensuring readability, visual impact, and maintaining the overall bright blue-and-white dominant, yet colorful aesthetic of the reference set. Subtle gradients within the blues and whites are incorporated for added depth and visual interest, consistent with the reference."
    },
    "background": {
      "color": "transparent",
      "style": "purely transparent with alpha channel for PNG output",
      "texture": "none"
    },
    "stylistic_tone": "vibrant, modern, friendly, and clean, with a highly polished and premium digital aesthetic suitable for technology, services, and casual branding",
    "icon_behavior": {
      "branding_alignment": "universally appealing and versatile for broad application across various digital products and marketing materials, with a consistent vibrant blue-and-white centric brand identity.",
      "scalability": "perfectly legible and sharp across all sizes, from small UI elements to large display graphics",
      "interchangeability": "designed as an integral part of a cohesive and expandable icon system, ensuring new icons maintain a consistent visual language"
    }
  }
}
`;
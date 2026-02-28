# Jam Decks — Landing Page Brief

## Company
**Jam Decks** — Premium decking company. Build beautiful outdoor living spaces with composite and hardwood decking.

## Goal
Build the COOLEST, most interactive 3D landing page anyone has ever seen for a decking company. This is a demo to blow minds.

## Tech Stack
- **Next.js 14** (App Router)
- **Three.js** (via @react-three/fiber + @react-three/drei)
- **GSAP** + ScrollTrigger for scroll-driven animations
- **Tailwind CSS** for styling
- **Framer Motion** for UI transitions
- **Lenis** for smooth scrolling

## 🔥 KEY FEATURE: Scroll-Driven Screw Animation
When the user scrolls down, deck screws visually screw INTO the deck boards. This is the hero interaction:
- 3D screws rendered with Three.js
- As scroll progresses (0-100%), screws rotate and sink into wood
- Wood grain texture on the deck boards
- Satisfying, tactile feeling
- Sound effect optional but cool

## Page Sections (scroll-driven, each section animates in)

### 1. Hero Section
- Full-screen 3D deck scene
- Camera slowly orbits around a beautiful deck
- Text overlays: "JAM DECKS" big bold, "Built to Last. Designed to Impress."
- Parallax depth effect on scroll
- Subtle particle effects (sawdust/wood shavings floating)

### 2. The Screw Section (SIGNATURE)
- Close-up view of deck boards
- As user scrolls: 6-8 screws rotate and sink into the boards
- Each screw has a slight delay (staggered animation)
- Text: "Precision Craftsmanship, Every Single Screw"
- Counter showing "2,847 screws per average deck"

### 3. Materials Showcase
- Interactive 3D material cards that tilt on mouse/touch
- Show 3-4 decking materials: Composite, Balau Hardwood, Treated Pine, Bamboo
- Each card has texture, price range, durability rating
- Cards float and rotate slightly in 3D space

### 4. Before/After Transformer
- Split-screen slider showing old yard → beautiful new deck
- Drag interaction (works on mobile too)
- Use Unsplash images

### 5. Social Proof / Stats
- Animated counters (scroll-triggered):
  - "500+ Decks Built"
  - "15 Years Experience"  
  - "4.9★ Rating"
  - "100% Satisfaction Guarantee"
- Testimonial cards with parallax

### 6. Gallery
- Masonry/mosaic grid of deck projects
- Images from Unsplash (search: deck, outdoor living, patio, wooden deck)
- Hover effect: 3D tilt + zoom
- Lightbox on click

### 7. CTA / Contact
- "Ready to Transform Your Outdoor Space?"
- Floating 3D deck model in background
- Contact form or "Get a Free Quote" button
- Phone, email, location

## Images to Use (Unsplash - free, no attribution needed)
Use these Unsplash URLs directly:
- https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=1200 (wooden deck)
- https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200 (modern house deck)
- https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200 (luxury home)
- https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200 (outdoor living)
- https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200 (house exterior)
- https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200 (modern house)
- https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200 (house with pool)
- https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200 (wood texture)
- https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200 (outdoor furniture)

## Design Principles
- **Mobile-first** — MUST work beautifully on phones
- **Dark/moody theme** — dark backgrounds (#0a0a0a), warm wood tones, amber accents
- **Typography** — Bold sans-serif headers (Inter or similar), clean body text
- **Performance** — Lazy load images, optimize Three.js scenes, reduce draw calls on mobile
- **Accessibility** — Reduced motion support, alt texts, semantic HTML
- **Touch-friendly** — All interactions work with touch gestures

## Color Palette
- Background: #0a0a0a (near black)
- Primary: #D4A574 (warm wood/amber)
- Secondary: #8B6914 (dark gold)
- Accent: #F5E6D3 (light cream)
- Text: #FFFFFF / #B0B0B0

## Mobile Considerations
- 3D scenes simplified on mobile (fewer polygons, simpler shaders)
- Touch-based interactions replace hover
- Screw animation works with touch scroll
- Hamburger menu
- Performance budget: < 3s load on 4G

## Deliverable
- Fully working Next.js app
- `npm run dev` → localhost:3000
- Deploy-ready for Vercel
- README with setup instructions

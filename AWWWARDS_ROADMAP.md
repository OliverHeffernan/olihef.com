# Awwwards-Level Portfolio Roadmap

This roadmap outlines the plan to elevate Oliver Heffernan's portfolio to Awwwards-level quality with sophisticated interactions and animations.

---

## 🎯 Goal
Transform the portfolio from a clean, functional site into an award-worthy experience with:
- Smooth, butter-like scrolling
- Engaging micro-interactions
- Thoughtful animation choreography
- Professional polish and attention to detail

---

## ✅ Phase 1: Foundation - Smooth Scroll & Basic Animations (COMPLETED)

### Dependencies Installed
- ✅ `gsap` - Industry-standard animation library
- ✅ `lenis` - Smooth scroll library for buttery scrolling

### Core Infrastructure
- ✅ **Lenis Integration** (`src/lenis/useLenis.ts`)
  - Singleton pattern for global smooth scroll
  - Connected to GSAP ScrollTrigger
  - Optimized configuration (duration: 1.1s, auto-refresh limits)
  
- ✅ **Scroll Animation Utilities** (`src/composables/useScrollAnimations.ts`)
  - `useScrollReveal()` - Fade + slide up on scroll
  - `useStaggerReveal()` - Multiple elements with delay
  - `useParallax()` - Parallax movement effect
  - `useBatchReveal()` - Efficient batch animations

### Implementations
- ✅ **TopProjects.vue** - Stagger reveal on project cards
- ✅ **GridBackground.vue** - Parallax effect (currently disabled)
- ✅ **Theme Toggle** - Light/dark mode with smooth transitions

### Bug Fixes
- ✅ **Fixed Scroll Jolt Issue**
  - Root cause: `.other-sections` absolute positioning causing height recalculation
  - Solution: Changed to relative positioning in `LandingPage.vue`
  - Result: Stable document height, smooth scrolling throughout

---

## 🚧 Phase 2: Advanced Scroll Interactions (NEXT UP)

### 2.1 Magnetic Cursor
**Goal**: Custom cursor that follows the mouse with smooth easing and "magnets" to interactive elements

**Implementation**:
- [ ] Create `src/components/CustomCursor.vue`
- [ ] Track mouse position with RAF (requestAnimationFrame)
- [ ] Add GSAP quickTo for smooth cursor following
- [ ] Implement magnetic effect for buttons/links
- [ ] Add cursor state changes (hover, click, drag)
- [ ] Hide default cursor, show custom one

**Reference Sites**: 
- https://cuberto.com
- https://dennissnellenberg.com

---

### 2.2 Parallax Refinement
**Goal**: Re-enable and polish parallax effects with multiple layers

**Implementation**:
- [x] Re-enable GridBackground parallax (now that jolt is fixed)
- [ ] Add parallax to project images (slower scroll speed)
- [ ] Create multi-layer parallax in hero section
- [ ] Add horizontal parallax to certain elements
- [ ] Ensure all parallax has proper bounds/limits

**Techniques**:
- Use `ScrollTrigger.create()` with `scrub` for smooth parallax
- Different scroll speeds for depth perception
- Combine with opacity changes for fade effects

---

### 2.3 Scroll-Triggered Animations
**Goal**: More sophisticated animations triggered at specific scroll positions

**Implementation**:
- [ ] **Hero Section**: 
  - Scale and fade hero content as you scroll down
  - Blur effect on hero background
  
- [ ] **About Section**:
  - Counter animation for stats (0 → 950+ commits, 0 → 9 years)
  - Reveal skills with stagger and scale
  
- [ ] **Project Cards**:
  - 3D tilt effect on hover
  - Image reveal with clip-path animation
  - Text slide-in from different directions

- [ ] **Footer** (if exists):
  - Draw-in animation for links
  - Fade in contact information

**Tools**:
- GSAP Timeline for sequenced animations
- ScrollTrigger with `start`, `end`, `scrub` configurations
- `autoAlpha` for performance-optimized opacity

---

## 🎨 Phase 3: Micro-Interactions & Polish

### 3.1 Button & Link Interactions
**Goal**: Make every clickable element feel responsive and delightful

**Implementation**:
- [ ] Magnetic hover effect (elements pull toward cursor)
- [ ] Ripple effect on click
- [ ] Icon rotation/scale on hover
- [ ] Underline draw-in animation for text links
- [ ] Button morph animations (shape/color transitions)

---

### 3.2 Image Interactions
**Goal**: Make images feel alive and interactive

**Implementation**:
- [ ] **Hover Effects**:
  - Scale + parallax shift on hover
  - Gradient overlay animation
  - Reveal effect (wipe, circle expand, etc.)
  
- [ ] **Lazy Load Animations**:
  - Blur-up technique (load blurred first, then sharp)
  - Skeleton loading with shimmer
  - Progressive reveal as image loads

- [ ] **3D Tilt Effect**:
  - Track mouse position relative to element
  - Apply 3D transforms for depth illusion

---

### 3.3 Text Animations
**Goal**: Typography that commands attention

**Implementation**:
- [ ] **Split Text Animation**:
  - Install `gsap/SplitText` (or use CSS)
  - Animate characters/words individually
  - Stagger reveal for headings
  
- [ ] **Typewriter Effect**: For hero tagline
- [ ] **Text Scramble Effect**: Cyberpunk-style text reveal
- [ ] **Gradient Text Animation**: Animated gradient on hover
- [ ] **Text Morph**: Smooth transitions between text states

---

### 3.4 Loading Experience
**Goal**: Engaging loading screen that sets the tone

**Implementation**:
- [ ] Create custom loading screen component
- [ ] Animated logo/wordmark reveal
- [ ] Progress bar with smooth easing
- [ ] Transition to main content (wipe, fade, scale)
- [ ] Preload critical assets (images, fonts)

---

## 🏗️ Phase 4: Page Transitions & Navigation

### 4.1 Page Transitions
**Goal**: Smooth transitions between routes (if multi-page)

**Implementation**:
- [ ] Use Vue Router transitions
- [ ] GSAP Timeline for enter/exit animations
- [ ] Shared element transitions (FLIP technique)
- [ ] Loading bar for async content

---

### 4.2 Navigation Enhancements
**Goal**: Make navigation feel premium

**Implementation**:
- [ ] Animated hamburger menu (if mobile)
- [ ] Full-screen menu overlay with stagger
- [ ] Active link indicator animation
- [ ] Scroll progress indicator
- [ ] "Back to top" button with smooth scroll

---

## 🎭 Phase 5: Advanced Effects & Polish

### 5.1 WebGL / Canvas Effects (Optional, High Impact)
**Goal**: Add GPU-accelerated effects for wow factor

**Options**:
- [ ] **Three.js Background**:
  - Particle system
  - Animated mesh background
  - 3D shapes that respond to scroll
  
- [ ] **Canvas Animations**:
  - Fluid simulation on hero
  - Generative art background
  - Interactive particle trails

**Libraries**:
- `three.js` - 3D graphics
- `@studio-freight/lenis` + ScrollTrigger for scroll integration
- `curtainsjs` - WebGL for images

---

### 5.2 Performance Optimization
**Goal**: Maintain 60fps despite all animations

**Implementation**:
- [ ] **Lazy Load Everything**:
  - Components below fold
  - Images with Intersection Observer
  - Heavy animations only when visible
  
- [ ] **GSAP Optimization**:
  - Use `will-change` sparingly
  - Prefer `transform` and `opacity` (GPU-accelerated)
  - Kill animations when off-screen
  
- [ ] **Bundle Optimization**:
  - Code splitting by route
  - Tree-shake unused GSAP plugins
  - Lazy load Three.js if used

- [ ] **Lighthouse Audit**:
  - Target 90+ performance score
  - Optimize Core Web Vitals (LCP, FID, CLS)

---

### 5.3 Accessibility
**Goal**: Award-worthy doesn't mean inaccessible

**Implementation**:
- [ ] Respect `prefers-reduced-motion`
  - Disable/reduce animations for users who prefer it
  - Graceful fallbacks
  
- [ ] Keyboard navigation
  - All interactive elements focusable
  - Custom focus states
  - Skip links for navigation
  
- [ ] Screen reader support
  - Proper ARIA labels
  - Semantic HTML
  - Alt text for all images
  
- [ ] Color contrast
  - WCAG AA compliance minimum
  - Test both light and dark themes

---

## 🎬 Phase 6: Final Polish & Launch

### 6.1 Cross-Browser Testing
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on iOS Safari (common issues with smooth scroll)
- [ ] Test on Android Chrome
- [ ] Fix browser-specific bugs

---

### 6.2 Responsive Design
- [ ] Tablet breakpoint (768px)
- [ ] Mobile breakpoint (640px)
- [ ] Touch-friendly interactions
- [ ] Disable hover effects on touch devices
- [ ] Test on real devices

---

### 6.3 Content & Copywriting
- [ ] Write compelling project descriptions
- [ ] Add clear CTAs (call-to-actions)
- [ ] Optimize meta tags for SEO
- [ ] Add Open Graph images
- [ ] Create compelling case studies

---

### 6.4 Analytics & Monitoring
- [ ] Add analytics (Plausible/Simple Analytics for privacy)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Web Vitals)
- [ ] Conversion tracking for CTAs

---

## 📚 Resources & Inspiration

### Awwwards Winners to Study
- **Cuberto** - https://cuberto.com (magnetic cursor, smooth scroll)
- **Dennis Snellenberg** - https://dennissnellenberg.com (page transitions)
- **Locomotive Scroll Examples** - https://locomotivemtl.github.io/locomotive-scroll/
- **Lenis Demos** - https://lenis.darkroom.engineering/

### Libraries & Tools
- **GSAP** - https://gsap.com
- **Lenis** - https://lenis.darkroom.engineering
- **Three.js** - https://threejs.org
- **Splitting.js** - Text splitting for animations
- **Locomotive Scroll** - Alternative to Lenis

### Learning Resources
- **GSAP Learning** - https://gsap.com/learning/
- **Creative Coding** - https://www.youtube.com/@TheFrontEndCoach
- **Award-Winning Design** - https://www.awwwards.com/websites/

---

## 📊 Current Progress

**Completed**: Phase 1 (Foundation)
- ✅ Smooth scroll with Lenis
- ✅ Basic scroll animations
- ✅ Scroll jolt bug fixed
- ✅ Animation utilities created

**Next Steps**:
1. Re-enable parallax on GridBackground
2. Implement magnetic cursor
3. Add scroll-triggered counter animations
4. Enhance project card interactions

**Estimated Time to Awwwards-Level**:
- Phase 2: 2-3 days
- Phase 3: 3-4 days
- Phase 4: 2-3 days
- Phase 5: 3-5 days (depending on WebGL scope)
- Phase 6: 2-3 days

**Total**: ~2-3 weeks of focused development

---

## 💡 Quick Wins (High Impact, Low Effort)

These can be done immediately for visible improvement:

1. **Re-enable parallax** on GridBackground (5 min)
2. **Add 3D hover tilt** to project cards (30 min)
3. **Counter animation** for stats in About section (1 hour)
4. **Stagger text reveal** on hero section (1 hour)
5. **Magnetic buttons** for primary CTAs (2 hours)

---

## 🎯 Success Criteria

The portfolio is "Awwwards-ready" when:

- [ ] Smooth 60fps scrolling on all devices
- [ ] Every interaction feels intentional and polished
- [ ] Animations enhance content, don't distract
- [ ] Loading time < 3 seconds
- [ ] Lighthouse performance > 90
- [ ] Works flawlessly on mobile
- [ ] Accessible (keyboard nav + screen readers)
- [ ] Friends say "Wow, this is sick!"

---

**Last Updated**: Feb 16, 2026  
**Status**: Phase 1 Complete ✅ | Phase 2 Ready to Start 🚀

# Pawtterns Website — Development Plan

## Project Overview

**Purpose:** Single-page marketing website for Pawtterns iOS app with publicly accessible privacy policy

**Goals:**
1. Briefly introduce the Pawtterns app and its value proposition
2. Host a publicly accessible privacy policy (Apple App Store requirement)
3. Match the app's design language (sage green, earthy, warm, analytical)
4. Deploy to GitHub Pages with custom domain

**Tech Stack:**
- React + TypeScript
- Tailwind CSS
- Vite (build tool)
- GitHub Pages deployment

---

## Design Principles (from app design)

**Brand Colors:**
- Primary: `#7FB069` (sage green)
- Background: `#F5F5F0` (natural off-white)
- Text: `#3D5A4C` (forest green)
- Accent: `#E07A5F` (terracotta)

**Personality:**
- Trusted companion, not clinical tool
- Clear, warm, focused
- Analytical confidence meets pet-care warmth
- Think Monzo (fintech clarity) + pet brand (friendly)

---

## Apple Privacy Policy Requirements

**Verified Requirements:**
✅ Privacy policy must be accessible via public URL
✅ URL must be provided in App Store Connect metadata
✅ Must clearly state what data is collected and how it's used
✅ Must be "easily accessible" (no login barriers)

**Website Solution:**
- Host privacy policy at: `https://[domain]/privacy`
- Make it prominently linked but not the hero content
- Ensure it's accessible, clear, and complete

---

## Development Phases

### Phase 1: Project Setup & Infrastructure
**Goal:** Bootstrap React + TypeScript + Tailwind project with GitHub Pages deployment

**Tasks:**
1. Initialize Vite project with React + TypeScript template
2. Install and configure Tailwind CSS
3. Set up project structure:
   ```
   pawtterns-website/
   ├── .claude/
   │   ├── product.md
   │   ├── design.md
   │   └── development.md (this file)
   ├── src/
   │   ├── components/
   │   ├── App.tsx
   │   └── main.tsx
   ├── public/
   ├── index.html
   ├── package.json
   ├── tailwind.config.js
   ├── tsconfig.json
   └── vite.config.ts
   ```
4. Configure Tailwind with brand colors
5. Set up GitHub Pages deployment workflow
6. Test local development server

**Deliverable:** Working development environment with Tailwind configured

---

### Phase 2: Design Tokens & Base Styles
**Goal:** Implement design system from app specification

**Tasks:**
1. Configure Tailwind theme with custom colors:
   - `brand-green`: #7FB069
   - `page-bg`: #F5F5F0
   - `label-primary`: #3D5A4C
   - `exposure-green-tint`: #E8F4E3
   - `symptom-terracotta`: #E07A5F
   - `symptom-terracotta-tint`: #F7E3DD
   - Additional lift colors (mid, low, neutral)

2. Configure typography (use system fonts):
   - SF Pro equivalent: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'`
   - Set up font weights and sizes

3. Configure spacing tokens:
   - 4pt, 8pt, 12pt, 16pt, 24pt
   - Border radius: 16pt cards, 10pt inner, capsule for badges

4. Set up responsive breakpoints (mobile-first)

**Deliverable:** Complete design token configuration in `tailwind.config.js`

---

### Phase 3: Hero Section & App Introduction
**Goal:** Create main landing section that introduces Pawtterns

**Content Strategy:**
- Hero headline: Clear value proposition
- Subheadline: Explain the analytical digestion tracking approach
- Key features: 3-4 bullet points
- CTA: "Coming Soon to App Store" or "Download on the App Store" (when ready)
- Visual: App icon or mockup (if available)

**Components to Build:**
1. `Hero.tsx` - Main headline + subheadline
2. `FeatureGrid.tsx` - 3-4 feature cards with icons
3. `AppStoreButton.tsx` - Download CTA

**Design Notes:**
- Use sage green (#7FB069) for CTAs and accents
- Natural off-white background (#F5F5F0)
- Forest green text (#3D5A4C)
- Rounded cards (16pt radius)
- Mobile-first responsive layout

**Deliverable:** Complete hero section with app introduction

---

### Phase 4: Privacy Policy Page/Section
**Goal:** Create comprehensive, accessible privacy policy

**Implementation Options:**

**Option A: Dedicated Route** (recommended for clarity)
- Single-page app with React Router
- `/` - main landing page
- `/privacy` - full privacy policy
- Privacy link in footer

**Option B: Same-page Section**
- Privacy policy in collapsible/expandable section
- Scroll-to anchor link
- More compact, but less formal

**Recommended: Option A**

**Privacy Policy Content Structure:**
1. **Introduction**
   - What Pawtterns is
   - Commitment to privacy

2. **Data Collection**
   - What data is collected (pet profiles, food/medication logs, symptom logs)
   - How data is stored (local device, iCloud sync if applicable)
   - No third-party analytics or tracking

3. **Data Usage**
   - How data is used (pattern analysis, insights generation)
   - No AI, deterministic analysis only
   - No data sharing with third parties

4. **Data Storage & Security**
   - Local Core Data storage
   - iCloud sync (opt-in, if implemented)
   - No server-side storage

5. **User Rights**
   - Access to data
   - Data deletion
   - Export capabilities

6. **Third-Party Services**
   - List any third-party SDKs or services
   - Their privacy policies

7. **Contact Information**
   - Email for privacy questions
   - Last updated date

**Components to Build:**
1. `PrivacyPolicy.tsx` - Full privacy policy content
2. `Section.tsx` - Reusable section component
3. Update footer with privacy link

**Deliverable:** Complete, publicly accessible privacy policy at `/privacy`

---

### Phase 5: Footer & Metadata
**Goal:** Complete the page with footer and SEO metadata

**Footer Content:**
- App name & tagline
- Navigation: Home, Privacy Policy
- Social links (if applicable)
- Copyright notice
- Contact email

**SEO & Metadata:**
1. Page title: "Pawtterns - Analytical Pet Digestion Tracking"
2. Meta description: Brief app description
3. Open Graph tags for social sharing
4. Favicon (app icon)
5. Apple touch icon

**Components to Build:**
1. `Footer.tsx`
2. `Head` metadata in index.html

**Deliverable:** Complete website with footer and proper metadata

---

### Phase 6: GitHub Pages Deployment
**Goal:** Deploy to GitHub Pages with custom domain

**Tasks:**
1. Configure `vite.config.ts` for GitHub Pages:
   ```ts
   export default defineConfig({
     base: '/pawtterns-website/', // or '/' if custom domain
     build: {
       outDir: 'dist'
     }
   })
   ```

2. Create GitHub Actions workflow for deployment:
   - Trigger on push to main branch
   - Build with Vite
   - Deploy to `gh-pages` branch

3. Configure custom domain (if desired):
   - Add CNAME file to `public/`
   - Configure DNS records
   - Example: `pawtterns.hanyutang-sandra.site`

4. Test deployment and verify:
   - Main page loads
   - Privacy policy accessible
   - Mobile responsive
   - Custom domain (if applicable)

**Deliverable:** Live website on GitHub Pages

---

### Phase 7: Polish & Optimization
**Goal:** Refine design, performance, and accessibility

**Tasks:**
1. **Responsive Design:**
   - Test on mobile (375px, 390px, 428px)
   - Test on tablet (768px, 820px)
   - Test on desktop (1024px+)
   - Adjust spacing, typography, layout

2. **Accessibility:**
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation
   - Color contrast (WCAG AA minimum)
   - Screen reader testing

3. **Performance:**
   - Optimize images (WebP, responsive sizes)
   - Lazy loading for below-fold content
   - Minimize bundle size
   - Lighthouse audit (aim for 90+ scores)

4. **Browser Testing:**
   - Safari (iOS & macOS)
   - Chrome
   - Firefox
   - Edge

**Deliverable:** Polished, accessible, performant website

---

## File Structure (Final)

```
pawtterns-website/
├── .claude/
│   ├── product.md           # App specification
│   ├── design.md            # App design system
│   └── development.md       # This file
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages deployment
├── public/
│   ├── CNAME               # Custom domain (if applicable)
│   ├── favicon.ico
│   └── app-icon.png
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── AppStoreButton.tsx
│   │   ├── Footer.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   └── Section.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── .gitignore
├── README.md
└── LICENSE
```

---

## Content Guidelines

### Hero Copy (Example)

**Headline:**
"Understand your pet's digestion patterns"

**Subheadline:**
"Pawtterns helps you identify possible food and medication triggers through simple logging and clear, deterministic analysis. No AI, no guesswork—just patterns."

**Features:**
1. 🥘 **Quick Logging** - Record food and medication exposures in seconds
2. 📊 **Pattern Detection** - See correlations between exposures and symptoms
3. 🔒 **Privacy First** - All data stays on your device, no cloud required
4. 📱 **Clean Interface** - Built for clarity and ease of use

### Privacy Policy Key Points

**Data Collected:**
- Pet profiles (name, breed, birthdate)
- Food and medication exposure logs
- Symptom logs (vomiting, loose stool, skipped meals)
- Timestamps for all events

**Data NOT Collected:**
- No analytics or tracking
- No usage data sent to servers
- No personal information beyond pet profiles
- No location data
- No photo uploads to servers

**Storage:**
- Local device storage (Core Data)
- Optional iCloud sync (user-controlled)
- No third-party servers
- User can delete all data anytime

---

## Deployment Configuration

### GitHub Pages Setup

1. **Repository Settings:**
   - Enable GitHub Pages
   - Source: `gh-pages` branch
   - Custom domain (optional): `pawtterns.hanyutang-sandra.site`

2. **GitHub Actions Workflow:**
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/deploy-pages@v4
           id: deployment
   ```

3. **Custom Domain DNS (if using subdomain):**
   - Type: CNAME
   - Name: `pawtterns`
   - Value: `hanyutang-sandra.github.io`

---

## Success Criteria

### Phase 1-2 ✓
- [ ] Development environment running
- [ ] Tailwind configured with brand colors
- [ ] Design tokens implemented

### Phase 3 ✓
- [ ] Hero section complete
- [ ] Features section complete
- [ ] Mobile responsive

### Phase 4 ✓
- [ ] Privacy policy content written
- [ ] Privacy policy page accessible at `/privacy`
- [ ] Content is clear and comprehensive

### Phase 5 ✓
- [ ] Footer complete with links
- [ ] SEO metadata added
- [ ] Favicon and touch icons set

### Phase 6 ✓
- [ ] Site deployed to GitHub Pages
- [ ] Privacy policy URL publicly accessible
- [ ] Custom domain working (if applicable)

### Phase 7 ✓
- [ ] Mobile responsive (tested on iOS Safari)
- [ ] Lighthouse score 90+ on all metrics
- [ ] WCAG AA contrast compliance
- [ ] Cross-browser tested

---

## Timeline Estimate (Solo Development)

- **Phase 1:** 1-2 hours (setup, config)
- **Phase 2:** 1 hour (design tokens)
- **Phase 3:** 2-3 hours (hero + features)
- **Phase 4:** 2-3 hours (privacy policy)
- **Phase 5:** 1 hour (footer + metadata)
- **Phase 6:** 1-2 hours (deployment)
- **Phase 7:** 2-3 hours (polish + testing)

**Total:** ~12-16 hours over 2-3 days

---

## Post-Launch Maintenance

### When App Launches:
- [ ] Add App Store badge and link
- [ ] Add app screenshots or demo video
- [ ] Update privacy policy with any changes
- [ ] Add support email/contact form

### Ongoing:
- [ ] Update privacy policy when app features change
- [ ] Monitor broken links
- [ ] Keep dependencies updated
- [ ] Renew custom domain (if applicable)

---

## Notes

**Privacy Policy Accuracy:**
The privacy policy content must accurately reflect the app's actual data practices. Review and update when:
- Adding third-party SDKs
- Implementing analytics
- Adding cloud sync features
- Changing data retention policies

**Design Consistency:**
The website should feel like an extension of the app. Use:
- Same color palette
- Same personality (clear, warm, focused)
- Same component patterns (rounded cards, capsule badges)
- Same typography principles

**Mobile-First:**
Most users will visit from their iPhone when looking up the app. Ensure:
- Touch targets are 44pt minimum
- Text is readable without zooming
- CTAs are thumb-accessible
- Page loads quickly on cellular

---

## Future Enhancements (Optional)

**Post-MVP:**
- [ ] App demo video or GIF
- [ ] FAQ section
- [ ] Email capture for launch notification
- [ ] Blog for pet health tips
- [ ] Press kit / media page
- [ ] Testimonials from beta users
- [ ] Support documentation
- [ ] Localization (if app is localized)

**Analytics (Privacy-Friendly):**
- Consider Plausible or Fathom (privacy-first analytics)
- Track page views, privacy policy views
- No user tracking or cookies

---

## Questions to Resolve Before Development

1. **Custom Domain:**
   - Use subdomain of hanyutang-sandra.site?
   - Register new domain (e.g., pawtterns.app)?
   - Just use GitHub Pages default?

2. **App Store Status:**
   - App ready for download?
   - Coming soon? (affects CTA copy)
   - Beta available? (TestFlight link?)

3. **Contact Information:**
   - Support email for privacy questions?
   - Personal email or create pawtterns@... ?

4. **Visual Assets:**
   - App icon available?
   - App screenshots available?
   - Demo video available?

5. **Privacy Policy Details:**
   - Does app use any third-party SDKs?
   - iCloud sync implemented?
   - Any analytics (even privacy-friendly)?

---

## Development Commands

```bash
# Phase 1 - Setup
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Development
npm run dev          # Start dev server

# Build & Preview
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment (manual)
npm run build
# GitHub Actions handles automatic deployment
```

---

## Resources

**Design Reference:**
- App design spec: `.claude/design.md`
- App product spec: `.claude/product.md`

**Apple Guidelines:**
- [App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/)
- [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

**Tools:**
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

**Deployment:**
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vite GitHub Pages Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)

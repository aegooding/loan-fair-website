# CLAUDE.md — Loan Fair Website

A complete build brief for an AI assistant or developer to create the Loan Fair website from scratch.

---

## Design Reference & Inspiration

The primary design reference is **up.com.au** — one of Australia's best-designed fintech products. Study it carefully before building.

Key qualities to emulate:
- **Large, expressive display typography** that carries the page — headlines do the heavy lifting, not imagery
- **Section-by-section scroll storytelling** — each viewport is its own "chapter" with a single clear idea
- **Block colour sections** alternating through the palette to create visual rhythm as you scroll
- **Generous whitespace** — nothing cramped, nothing cluttered
- **Playful but intelligent copy** — wit without trying too hard
- **Animated/interactive moments** that feel alive without being gimmicky
- **No photography.** Zero. None. Block colours, type, and geometric shapes only.

---

## Brand Identity

### Logo

Two logo variants have been provided as SVG files:

**Main Logo** (`loan_fair_Main_Logo.svg`)
- Green (`#356852`) wordmark on cream (`#ecdbba`) background
- Use on: cream or sand-coloured sections

**Inverted Logo** (`loan_fair_Inverted_Color.svg`)
- Cream (`#ecdbba`) wordmark on green (`#356852`) background
- Use on: green sections (most of the site)

**Logo anatomy:**
- Wordmark reads "Loan" + "Fair"
- Housed in a rounded rectangle badge with a **distinctive cut-corner detail** — top-right and bottom-left corners are square, all other corners are rounded
- This cut-corner motif is a core brand shape — echo it throughout the UI (cards, buttons, callout boxes, section dividers)

**Logo usage rules:**
- Minimum width: `120px`
- Always maintain clear space equal to the cap-height of the wordmark on all sides
- Never stretch, recolour, or apply drop shadows
- In the nav: use inverted (cream on green) since the nav sits on the green background

### Colour Palette

| Role | Name | Hex |
|---|---|---|
| Page Background | Forest Green | `#356852` |
| Primary / Text | Cream | `#ecdbba` |
| Accent / CTA | Sand | `#d8b384` |
| Layered Surfaces | Forest Green (opacity) | `#356852` at 60–80% |

**Usage rules:**
- The dominant canvas is `#356852` — deep forest green
- Body text, headings, most copy: `#ecdbba` cream
- CTAs, highlights, hover states, pull quotes, accent shapes: `#d8b384` sand/gold
- Section alternation: swap between full green (`#356852`) and a slightly darker tint (`#2d5a45`), or introduce a cream section sparingly for maximum contrast
- **No white (`#ffffff`) anywhere**
- **No black text** — always cream or sand on green backgrounds, or green text on cream/sand backgrounds
- Cards and floating elements: semi-transparent green layer (`rgba(53, 104, 82, 0.7)`) with a `1px` cream border at low opacity

### The Cut-Corner Shape

The logo badge has a specific corner treatment: **top-right and bottom-left are square; top-left and bottom-right are rounded.**

CSS: `border-radius: 0 16px 0 16px`

Apply this motif to:
- Feature cards
- CTA buttons
- Callout / highlight boxes
- Stat blocks
- The enquiry form modal container
- Section accent shapes

This creates visual cohesion between the logo and the UI.

### Typography

**Display / Headings:** `Fraunces` (Google Fonts) — organic, warm, editorial. Variable font with optical sizing.
- Alternative: `Playfair Display`

**Body / UI:** `DM Sans` (Google Fonts) — friendly, geometric, excellent at all sizes.
- Alternative: `Instrument Sans`

**Import both from Google Fonts.** Preconnect to `fonts.googleapis.com` for performance.

**Type scale:**
- Hero display: `5–8vw` (fluid, scales with viewport)
- Section headline: `3–4rem`
- Subheading: `1.5–2rem`
- Body: `1.05–1.125rem`, line-height `1.65`
- Caption / small: `0.875rem`
- UI labels: `0.75rem`, letter-spacing `0.08em`, uppercase

**Type behaviour:**
- Headlines: font-weight `700–900`, tight letter-spacing (`-0.02em` to `-0.04em`)
- Body: font-weight `400`, generous line-height
- Accent labels: font-weight `600`, slightly tracked out

---

## No Photography Policy

**There are zero photographs on this site.** This is a deliberate design decision.

Visual interest comes entirely from:
- Bold typography at large scales
- Block colour section backgrounds
- Geometric shapes and the cut-corner motif
- SVG illustrations or abstract shapes (optional)
- Animated number/stat elements
- Line iconography (Phosphor or Lucide)

Do not add stock photos, lifestyle images, car images, or person images at any point.

---

## Voice & Tone

Model on up.com.au — confident, direct, a little cheeky, always clear.

- **Plain language always.** If you use a finance term, explain it in the same sentence.
- **Short sentences win.** One idea per sentence. One idea per section.
- **Active voice.** "We charge a flat fee" not "A flat fee is charged."
- **Acknowledge the problem honestly.** Most brokers earn more when your rate goes up. Say it plainly.
- **Earn trust through clarity**, not disclaimers.
- **Wit is welcome** — a well-placed line break for comic timing, an unexpected subheading — but never try-hard.

---

## Site Architecture

### Pages

1. **Home** — Hero, problem/solution, how it works, principles, CTA
2. **How It Works** — Detailed step-by-step with transparency callout
3. **About / Our Story** — Mission, principles, team placeholder
4. **FAQ** — Accordion grouped by category
5. **Learn** — Content hub / article grid + individual article pages

All pages share a global **Navigation** and **Footer**.

---

## Layout & Scroll Principles

Each section is a **full or near-full viewport block** with one primary idea. Scrolling moves the user through a sequence of distinct visual moments — like flipping through bold editorial pages.

**Section rhythm example for Home:**
1. Hero (green bg, massive headline, CTA)
2. Problem strip (cream bg, bold statements — the high contrast "interruption")
3. How it works (green bg, 3-step cards)
4. Principles (dark green bg `#2d5a45`, 4-card grid)
5. Transparency callout (sand `#d8b384` bg — the boldest visual moment)
6. Final CTA (green, large type, button)

**Spacing:**
- Section padding: `120px` top/bottom desktop, `80px` mobile
- Max content width: `1200px`, centred
- Generous internal padding on all containers

---

## Component Library

### Navigation

- Logo (inverted variant) — top left
- Links — top right: How It Works, About, Learn, FAQ
- Primary CTA: "Enquire Now →" — far right, always visible
- **Sticky** — fixed on scroll
- Scroll past `80px`: `backdrop-filter: blur(8px)` + `background: rgba(53, 104, 82, 0.92)`
- Active page: sand underline
- **Mobile:** hamburger → full-screen overlay, large cream links on green, CTA at bottom

### Footer

- Logo (inverted) + tagline: *"Finance that's actually on your side."*
- Nav links in two columns
- Compliance text (small, low-opacity cream): licence details, general advice disclaimer
- Privacy Policy + Terms links
- Copyright
- Background: `#2d5a45`

### Buttons

**Primary CTA:**
```css
background: #d8b384;
color: #356852;
font-weight: 700;
padding: 14px 32px;
border-radius: 0 12px 0 12px; /* cut-corner */
transition: transform 180ms ease, box-shadow 180ms ease;
```
Hover: `transform: scale(1.03)`, `background: #c9a470`, shadow lift

**Secondary:**
```css
border: 2px solid #ecdbba;
color: #ecdbba;
background: transparent;
border-radius: 0 12px 0 12px;
```
Hover: background fills cream, text turns green

**Text link:** Cream, animated underline slides in from left on hover

### Cards
```css
background: rgba(53, 104, 82, 0.6);
border: 1px solid rgba(236, 219, 186, 0.15);
border-radius: 0 16px 0 16px;
padding: 2rem 2.5rem;
transition: transform 200ms ease, border-color 200ms ease;
```
Hover: `translateY(-4px)`, border brightens

### Stat / Number Blocks

Large number in display font (`5–7rem`), sand colour. Label beneath in body font, cream. Animate number counting up on scroll entry using `IntersectionObserver` + JS counter.

### Icons

Library: **Phosphor Icons** or Lucide. Style: outline/line. Colour: cream or sand. Size: `24px` UI, `32–40px` feature. Icons always support text — never replace it.

### CSS Custom Properties

```css
:root {
  --green: #356852;
  --green-dark: #2d5a45;
  --cream: #ecdbba;
  --sand: #d8b384;
  --radius-brand: 0 16px 0 16px;
  --radius-sm: 0 8px 0 8px;
  --max-width: 1200px;
  --section-padding: clamp(80px, 10vw, 120px);
}
```

---

## Page Specifications

---

### 1. Home Page

#### Hero Section

Full viewport height. Left-aligned content. Green background.

**Headline (display font, fluid `5–8vw`):**
> "Finance that's actually on your side."

**Subheadline (`1.2rem` body):**
> "Loan Fair is a digital finance platform where lenders compete for your loan. We charge a flat fee. No hidden margin. No surprises."

**CTAs:**
- Primary: "Enquire Now →" (sand button)
- Secondary: "See how it works ↓" (text link, smooth scrolls to next section)

**Visual:** Optional large abstract cut-corner shape in `#2d5a45`, positioned right side, partially off-canvas — depth without photography.

**Entrance animation:** Headline fades up, subheadline follows 150ms later, CTAs 300ms later.

---

#### Problem Strip

**Background: Cream (`#ecdbba`)** — maximum contrast moment after hero.

Three bold statements, display font, `2.5–3rem`, green text, stacked centred:

> "Most brokers earn more when your rate goes up."

> "That's a conflict of interest."

> "We fixed it."

No icons. The copy IS the visual.

---

#### How It Works Summary

**Background:** Green. **Headline:** "How Loan Fair Works"

3 cards, horizontal desktop / stacked mobile:

| # | Heading | Body |
|---|---|---|
| 01 | Submit once | Tell us about your loan in a single online application. |
| 02 | Lenders compete | Multiple lenders review your scenario and submit real offers. |
| 03 | You choose | Compare side-by-side. Pick the best deal. We handle the rest. |

Step number: large, sand, display font. Heading: cream, bold. Body: cream, regular.

---

#### Principles

**Background:** `#2d5a45` dark green.
**Headline:** "Built differently. On purpose."

4-card grid:

| Principle | One-liner |
|---|---|
| Transparency | You know exactly how we're paid. Always. |
| Honesty | No undisclosed incentives. Ever. |
| Fairness | We earn more when you save more. |
| Simplicity | Compare finance without the headache. |

---

#### Transparency Callout

**Background: Sand (`#d8b384`)** — the most visually striking section on the page.

Green text:
> **"We charge a flat fee."**
> "That's it. No margin added to your rate. No hidden costs. Just a clearly disclosed fee for arranging your finance. Any lender commissions? Also disclosed."

This should feel like a billboard. Big type. Confident. No decoration needed.

---

#### Final CTA

**Background:** Green.

> **"Ready to find a fairer rate?"**
> "Takes less than 5 minutes. No credit check required to enquire."

"Enquire Now →" button (primary).

---

### 2. How It Works Page

#### Hero
Green bg. Title: "How It Works". Subtitle: *"One application. Multiple lenders. Zero hidden margin."*

#### Detailed Steps

6 steps with large decorative step numbers (sand, display, oversized — `8–10rem`, slightly transparent as background element):

1. **Tell us about your loan** — Vehicle type, amount, purpose. About 3 minutes.
2. **We package your scenario** — Formatted into a lender-ready data set. No back-and-forth.
3. **Lenders compete for you** — Multiple lenders receive your scenario and submit competitive offers.
4. **Compare side-by-side** — Rates, fees, and terms laid out clearly. No decoding required.
5. **We arrange your finance** — Once you choose, Loan Fair handles the paperwork.
6. **You drive away** — Simple.

#### How We Make Money — Callout Box

Cut-corner card, sand `4px` top border, heading: **"How we make money"**

- Flat brokerage fee — disclosed upfront
- We do NOT add interest rate margin
- Any lender commissions are fully disclosed
- Our income does not increase when your rate increases

#### CTA
*"Sounds fair? Let's get started."* → Enquire Now

---

### 3. About / Our Story Page

#### Hero
Headline: *"We're on your side."*
Subtext: *"Loan Fair exists because everyday Australians deserve to know exactly what they're paying for — and why."*

#### The Problem

Editorial prose, no bullet points:

> Most finance brokers are paid by lenders through origination fees. Some also earn extra income by adding a margin to your interest rate — meaning they earn more when you pay more. This margin is often buried in your rate and doesn't appear as a separate charge on your documents.
>
> Loan Fair removes that conflict entirely. We charge a flat fee. We don't touch your interest rate to earn income. That's it.

#### Principles

4 principles, each with a short paragraph (more depth than homepage cards).

#### Team

Placeholder: *"Meet the team — coming soon."* or omit entirely.

#### CTA
*"Want to see the difference?"* → Enquire Now

---

### 4. FAQ Page

#### Hero
Title: "Frequently Asked Questions"
Subtitle: *"No jargon. No runaround. Just answers."*

#### Accordion Design

- Question: cream, `font-weight: 600`, `1.1rem`
- Expand icon: sand `+` rotates `45deg` to `×` on open
- Answer: body font, cream, `0.95rem`, `1.7` line-height
- Transition: smooth `max-height` CSS, `300ms ease-in-out`
- Separator: `1px solid rgba(236, 219, 186, 0.15)`
- Open item: `4px` sand left border

#### Question Categories

**About Loan Fair** — What is Loan Fair? / How is it different from a broker? / Is Loan Fair a lender?

**Fees & Costs** — How does Loan Fair make money? / Fee to enquire? / What is the brokerage fee? / Hidden costs?

**The Process** — How long does it take? / Credit score impact? / How many lenders? / What happens after I submit?

**Eligibility** — Who can apply? / What loan types? / Do I need a deposit?

**Privacy & Security** — How is my data used? / Is it shared without consent?

#### Bottom CTA
*"Didn't find your answer?"* → Enquire Now

---

### 5. Learn Page

#### Hero
Title: "Learn". Subtitle: *"Understanding finance shouldn't require a degree."*

#### Article Grid

3 col desktop / 2 tablet / 1 mobile. Cut-corner cards.

Each card: category tag (sand, small caps) + title (display font, `1.3rem`) + 1-line excerpt + "Read →"

**Suggested articles:**
- "What is broker margin — and why does it matter to you?"
- "How to actually compare car loan offers"
- "What is a comparison rate?"
- "Open banking explained in plain English"
- "Fixed vs variable rate loans: what's the difference?"
- "5 questions to ask before signing any loan"

#### Individual Article Pages

- Max-width `720px`, centred
- Large display headline
- Category + date (small, sand, uppercase)
- Body: `1.1rem`, `1.75` line-height
- Pull quotes: display font, sand, `1.8rem`, sand left border
- Related articles (2–3 cards) at bottom
- CTA: *"Have questions about your own loan?"* → Enquire Now

---

## Enquiry Form

### Behaviour

- Triggered by any "Enquire Now" button
- Opens as **modal overlay** — semi-transparent dark scrim behind
- `Escape` key closes; click outside closes
- Focus trapped inside modal while open
- Success: modal content swaps (no page reload)

### Modal Design

```css
background: #2d5a45;
border: 1px solid rgba(236, 219, 186, 0.2);
border-radius: 0 20px 0 20px; /* cut-corner */
padding: 3rem;
max-width: 560px;
```

Progress bar: thin sand line across top, fills across 3 steps.

**Input fields:**
```css
background: rgba(53, 104, 82, 0.4);
border: 1px solid rgba(236, 219, 186, 0.3);
border-radius: 8px;
color: #ecdbba;
```
Focus: border full cream, subtle glow. Error: sand border + sand message.

Step transitions: slide left out / slide right in, `300ms ease`.

### Step 1 — About You
- First name (required)
- Last name (required)
- Email (required)
- Mobile (required)
- Postcode (optional)

### Step 2 — Your Loan
- Loan type (styled select): Car loan / Personal loan / Lifestyle vehicle / Work vehicle
- Loan amount (button-group): Under $10k / $10k–$20k / $20k–$40k / $40k–$60k / $60k+

### Step 3 — Vehicle Details *(conditional on vehicle loan types)*
- Condition toggle: New / Used / Not sure
- Make (optional text)
- Model (optional text)
- Year (optional dropdown: 2015–2025 + Not sure)
- Already found a vehicle? (Yes/No toggle)

### Final Submit
- How did you hear about us? (optional dropdown)
- Additional notes (optional textarea, 300 char max)
- Consent checkbox (required): *"I consent to Loan Fair contacting me about my enquiry and using my information in line with the [Privacy Policy]."*
- "Send My Enquiry →" (full-width primary button)

### Success State

```
✓

Thanks, [First Name].

We've received your enquiry and will
be in touch — usually within 1 business day.

[Done]
```

---

## Animations & Interactions

**Philosophy:** Purposeful, not decorative. Model on up.com.au.

- **Hero entrance:** Staggered fade-up — headline → subheadline (150ms) → CTAs (300ms)
- **Scroll reveals:** `IntersectionObserver` — `translateY(30px) → 0`, opacity `0 → 1`, `400ms ease-out`. Stagger children `80ms`.
- **Stat counters:** Count up from 0 on scroll entry
- **Button hover:** `scale(1.03)` + shadow, `180ms ease`
- **Card hover:** `translateY(-4px)` + border brightens, `200ms ease`
- **FAQ accordion:** `max-height` transition `300ms`; icon rotates `45deg`
- **Nav on scroll:** `backdrop-filter: blur(8px)` after `80px`
- **Form steps:** Slide + fade `300ms`
- **Modal open:** `scale(0.95 → 1)` + opacity, `200ms ease`

**Reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility

- WCAG AA contrast minimum throughout
- Focus rings: `outline: 2px solid #d8b384; outline-offset: 3px`
- All interactive elements keyboard navigable
- `aria-label` on icon-only buttons
- Form: `<label>` via `for`/`id` on all fields
- FAQ: `aria-expanded`, `aria-controls`
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, restore focus on close
- SVG logos: `aria-label` or `<title>` inside SVG

---

## Technical Notes

- **Framework:** Next.js (App Router) recommended for SEO; plain HTML/CSS/JS also viable
- **Mobile-first responsive.** Base: `375px`.
- **Breakpoints:** `640px / 768px / 1024px / 1280px`
- **Form:** Connect to Formspree, HubSpot, or custom API endpoint (TBD)
- **Analytics:** GA4 — events: `form_start`, `form_step_complete`, `form_submit`, `cta_click`
- **SEO:** Unique `<title>` + `<meta description>` per page; `og:image`; canonicals
- **Performance:** Preconnect to Google Fonts; `font-display: swap`; lazy-load; minimise JS bundle

---

## Australian Finance Compliance

- General advice disclaimer in footer
- Credit licence / representative number — insert once confirmed
- Privacy Policy and Terms pages required (placeholders acceptable initially)
- No specific rate claims unless backed by live data
- AFCA membership details if applicable

---

## Assets Checklist

- [x] Logo — Main (`loan_fair_Main_Logo.svg`) ✓
- [x] Logo — Inverted (`loan_fair_Inverted_Color.svg`) ✓
- [ ] Credit licence / representative number
- [ ] Privacy Policy copy
- [ ] Terms of Use copy
- [ ] Form submission endpoint / CRM details
- [ ] Social media URLs
- [ ] Team bios + photos (About page, if required)
- [ ] AFCA / compliance details
- [ ] Google Analytics measurement ID

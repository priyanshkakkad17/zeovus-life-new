# Zeovus Life Website

A modern, responsive website for Zeovus Life - a B2B nutraceutical and cosmetic manufacturer. Built with Next.js 14 and styled to match the Zeovus Food website design patterns while maintaining the Life brand identity.
 
## 🎨 Design System
 
### Colors
Based on `Zeovus-life-Website/design.md`: 
- **Primary Dark**: `#1F4015` (Deep Green) 
- **Primary**: `#1A475C` (Teal) 
- **Primary Light**: `#15A859` (Bright Green)
- **Secondary**: `#9CCD62` (Lime) 
- **Secondary Dark**: `#B4BD62` 
- **Accent**: `#FFD374` (Gold) 
- **Accent Light**: `#FFEF98`
- **Accent Pale**: `#FFF5D1`

### Typography 
- **Headings**: Poppins (bold, uppercase for major headings)
- **Body**: Inter (clean, readable)
- Matches Zeovus Food website's typographic hierarchy

## 🏗️ Structure

### Pages
- **Home** (`/`) - Hero, Two Divisions, Portfolio, Capabilities, Certifications, Working Together
- **Our Company** (`/our-company`) - Story, Vision/Mission, Who We Build With, Standards, Sustainability
- **Capabilities** (`/capabilities`) - Innovation & Manufacturing tabs, Process flow
- **Nutraceuticals** (`/nutraceuticals`) - 14 categories with 268+ SKUs
- **Cosmetics** (`/cosmetics`) - 4 categories (Skincare, Haircare, Sun Care, Body Care)
- **Contact** (`/contact`) - Enquiry form with partnership options

### Component Architecture
Following Zeovus Food website patterns:
```
src/
├── app/
│   ├── page.js (Home - composed of modular sections)
│   ├── our-company/page.js
│   ├── capabilities/page.js
│   ├── nutraceuticals/page.js
│   ├── cosmetics/page.js
│   └── contact/page.js
├── components/
│   ├── Header.jsx (matches Food website navbar style)
│   ├── Footer.jsx
│   ├── HeroSection.jsx (animated hero like Food website)
│   └── home/
│       ├── TwoDivisions.jsx
│       ├── PortfolioHighlights.jsx
│       ├── CapabilitiesSection.jsx
│       ├── CertificationsSection.jsx
│       ├── WorkingTogether.jsx
│       └── CTASection.jsx
```

## 🔑 Key Features

### Design Consistency with Zeovus Food
1. **Navigation** - Same structure: logo + tagline, uppercase menu items, sticky header
2. **Hero Section** - Large typography, gradient backgrounds, animated text reveals
3. **Section Styling** - Alternating white/colored backgrounds, consistent padding
4. **Typography** - Bold uppercase headings, consistent hierarchy
5. **Cards** - Rounded corners, hover effects, shadow on hover
6. **CTAs** - Bold buttons with uppercase text, clear hover states

### Life Brand Differentiation
1. **Color Palette** - Green/teal wellness theme vs Food's warm browns
2. **Content Focus** - Wellness, nutraceuticals, cosmetics vs food products
3. **Certifications** - ZQA framework, 825+ parameters, pharmaceutical-grade
4. **Target Audience** - Healthcare/wellness B2B vs food manufacturing B2B

### Technical Features
- **Next.js 14** - App Router, Server Components
- **Framer Motion** - Smooth animations and transitions
- **Responsive Design** - Mobile-first, fully responsive
- **SEO Optimized** - Metadata, semantic HTML
- **Performance** - Static generation, optimized images
- **Accessibility** - ARIA labels, keyboard navigation

## 📊 Data Integration

### Product Catalog
Data from `Zeovus_Life_Category_Tables_CORRECTED_v2.xlsx`:
- **14 Nutraceutical Categories**: 268+ SKUs
  - Healthy Ageing (27), Multivitamins (28), Gut Health (28)
  - Women's Health (46), Men's Health (18)
  - Brain/Stress/Sleep (41), Immunity (38)
  - Joint/Bone (35), Heart Health (28)
  - Energy/Sports (35), Weight Management (16)
  - Beauty from Within (32), Children's Nutrition (5)
  - Specialty Care (24)

- **4 Cosmetics Categories**
  - Skincare, Haircare, Sun Care, Body Care

### Content
From `Zeovus Life Content.docx`:
- Company story, mission, vision
- Capability descriptions
- Process workflows (8 steps)
- Partnership models
- Quality standards (ZQA)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Dependencies

```json
{
  "next": "14.2.5",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.x.x",
  "tailwindcss": "^3.4.1",
  "autoprefixer": "^10.4.19"
}
```

## 🎯 Design Principles

1. **Professional & Trustworthy** - Clean layouts, certifications prominent
2. **Science-Backed** - Data-driven content, clear technical specs
3. **B2B Focused** - Partnership models, bulk capabilities, enquiry forms
4. **Globally Compliant** - Multiple certifications, international standards
5. **Accessible** - Clear navigation, readable text, semantic HTML

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1500px
- **Wide**: > 1500px
 
## 🔗 Related Projects

- **Zeovus Food Website** - Sister brand (food manufacturing)
- Shared company identity, parallel design systems

## 📄 License

Proprietary - Zeovus Ventures Private Limited

---

**Built with** ❤️ **for wellness manufacturing excellence**
# zeovuslife

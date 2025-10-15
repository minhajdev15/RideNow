# 🚗 RideNow

A modern, cross-platform ride-hailing application built with Next.js and Capacitor. RideNow provides users with an intuitive interface to plan rides, visualize routes, and get accurate distance calculations using Google Maps integration.

![RideNow](https://img.shields.io/badge/Next.js-15.5.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Capacitor](https://img.shields.io/badge/Capacitor-7.4.3-blue?style=for-the-badge&logo=capacitor)

## 🚀 Features

- **📍 Smart Location Search**: Autocomplete address input with Google Places API
- **🗺️ Interactive Maps**: Real-time map visualization with route planning
- **📱 Cross-Platform**: Native mobile apps for Android and iOS via Capacitor
- **🎨 Modern UI**: Beautiful, responsive design with shadcn/ui components
- **⚡ Fast Performance**: Built with Next.js 15 and Turbopack
- **🌙 Theme Support**: Light/dark mode with next-themes
- **📐 Distance Calculation**: Accurate route distance and time estimation
- **🔍 Place Autocomplete**: Real-time location suggestions
- **📲 Progressive Web App**: Installable PWA with offline capabilities

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 15.5.5** - React framework with App Router
- **React 19.1.0** - UI library with latest features
- **TypeScript 5.x** - Type-safe development

### Mobile Integration
- **Capacitor 7.4.3** - Cross-platform native runtime
- **@capacitor/android** - Android platform integration
- **@capacitor/ios** - iOS platform integration

### UI & Styling
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon system
- **next-themes** - Theme management

### State Management & Data Fetching
- **TanStack React Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Maps & Location Services
- **Google Maps JavaScript API** - Map visualization
- **Google Places API** - Location search and autocomplete

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Google Maps API Key
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/bahirabdullahound/RideNow.git
cd RideNow/ridenow
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

#### Getting Google Maps API Key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
4. Create credentials (API Key)
5. Restrict the API key for security (optional but recommended)

### 4. Run Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Build for Production

```bash
pnpm build
# or
npm run build
```

## 📱 Mobile Development with Capacitor

### Initial Capacitor Setup

```bash
# Add platforms
npx cap add android
npx cap add ios

# Sync web assets
npx cap sync
```

### Android Development

```bash
# Open in Android Studio
npx cap open android

# Run on Android device
pnpm cap run android
```

### iOS Development (macOS only)

```bash
# Open in Xcode
npx cap open ios

# Run on iOS device
pnpm cap run ios
```

### Building Mobile Apps

```bash
# Build web assets first
pnpm build

# Sync with Capacitor
npx cap sync

# Build native apps through Android Studio/Xcode
```

## 🔌 APIs & Integrations

### Google Maps JavaScript API
- **Purpose**: Interactive map visualization and rendering
- **Usage**: Displaying maps, markers, and route visualization
- **Why**: Provides the most comprehensive mapping solution with excellent customization

### Google Places API
- **Purpose**: Location search and autocomplete functionality
- **Usage**: Address autocomplete, place details, and geocoding
- **Why**: Offers accurate, real-time location suggestions with detailed place information

### TanStack React Query
- **Purpose**: Server state management and caching
- **Usage**: API calls, data fetching, and cache management
- **Why**: Provides excellent developer experience with automatic caching and background updates

## 🏗️ Project Structure

```
ridenow/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── AutoCompleteInput.tsx
│   ├── GoogleMapsLoader.tsx
│   ├── MapView.tsx
│   └── providers.tsx     # App providers
├── hooks/                # Custom hooks
├── lib/                  # Utilities
│   └── utils.ts         # Helper functions
├── public/               # Static assets
├── capacitor.config.ts   # Capacitor configuration
├── next.config.ts        # Next.js configuration
└── package.json         # Dependencies
```

## 🔧 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | ✅ | Google Maps API key for maps and places | `AIzaSyD...` |

> **Note**: The `NEXT_PUBLIC_` prefix makes the variable available in the browser. Keep your API key secure and consider implementing usage restrictions.

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npx vercel --prod
```

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Platform

## 🧪 Testing

```bash
# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Run tests (if configured)
pnpm test
```

## 📦 Key Dependencies

### Core
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety

### Mobile
- `@capacitor/core` - Cross-platform runtime
- `@capacitor/android` - Android integration
- `@capacitor/ios` - iOS integration

### UI & Styling
- `tailwindcss` - CSS framework
- `@radix-ui/*` - Component primitives
- `lucide-react` - Icons
- `next-themes` - Theme management

### Maps & Location
- `@types/google.maps` - Google Maps TypeScript definitions

### State & Forms
- `@tanstack/react-query` - Data fetching
- `react-hook-form` - Form management
- `zod` - Schema validation

### Utilities
- `sonner` - Toast notifications
- `clsx` - Conditional classes
- `tailwind-merge` - Class merging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Capacitor](https://capacitorjs.com/) for cross-platform mobile development
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Google Maps](https://developers.google.com/maps) for mapping services
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

---

**Built with ❤️ by [bahirabdullahound](https://github.com/bahirabdullahound) and [minhajdev15](https://github.com/minhajdev15)**

# AdminZen - Landing Page Next.js

Landing page moderne construite avec **Next.js 14**, **TypeScript**, **Tailwind CSS** et **shadcn/ui** pour AdminZen, assistant IA pour la gestion administrative suisse.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ 
- npm, yarn ou pnpm

### Installation

1. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

2. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

3. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📁 Structure du projet

```
adminzen/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── waitlist/     # Endpoint pour le formulaire
│   ├── globals.css       # Styles globaux
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Page d'accueil
├── components/
│   ├── ui/               # Composants shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── sections/         # Sections de la landing page
│   │   ├── hero-section.tsx
│   │   ├── stats-section.tsx
│   │   └── ...
│   ├── navigation.tsx    # Navigation
│   ├── footer.tsx        # Footer
│   ├── cookie-banner.tsx # Bannière cookies
│   └── scroll-progress.tsx
├── lib/
│   └── utils.ts          # Utilitaires (cn, etc.)
├── types/
│   └── index.ts          # Types TypeScript
└── public/               # Assets statiques
```

## 🎨 Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utility-first
- **shadcn/ui** - Composants UI accessibles
- **Radix UI** - Primitives UI headless
- **React Hook Form** - Gestion de formulaires
- **Zod** - Validation de schémas

## ✨ Fonctionnalités

### Sections
- ✅ Hero avec animations
- ✅ Statistiques avec compteurs animés
- ✅ Pain points (6 cartes)
- ✅ Comment ça marche (3 étapes)
- ✅ Pricing avec badge promo
- ✅ FAQ avec accordéon
- ✅ Formulaire waitlist avec validation
- ✅ Footer

### Features
- ✅ Responsive design (mobile-first)
- ✅ Animations au scroll (Intersection Observer)
- ✅ Cookie banner RGPD
- ✅ Scroll progress indicator
- ✅ Validation formulaire en temps réel
- ✅ API route pour le backend
- ✅ TypeScript strict
- ✅ Accessibilité (a11y)

## 🔧 Configuration

### Backend du formulaire

Le formulaire utilise l'API route `/api/waitlist`. Pour connecter à votre backend :

1. **Modifier `app/api/waitlist/route.ts`**

Exemple avec Supabase :
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// Dans la fonction POST
await supabase
  .from('waitlist')
  .insert([validatedData])
```

Exemple avec Airtable :
```typescript
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!)

await base('Waitlist').create([{ fields: validatedData }])
```

### Email de confirmation

Ajoutez un service d'email (Resend, SendGrid, etc.) dans `app/api/waitlist/route.ts` :

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'AdminZen <noreply@adminzen.ch>',
  to: validatedData.email,
  subject: '🎉 Bienvenue sur AdminZen !',
  html: `...`
})
```

### Analytics

1. **Google Analytics 4**

Créez `app/components/analytics.tsx` :
```typescript
'use client'
import Script from 'next/script'

export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
    </>
  )
}
```

Puis ajoutez dans `app/layout.tsx` : `<Analytics />`

2. **Meta Pixel** (similaire)

## 🚀 Déploiement

### Vercel (recommandé)

1. Push sur GitHub
2. Connecter à Vercel
3. Ajouter les variables d'environnement
4. Deploy automatique

```bash
vercel
```

### Autres plateformes

- **Netlify** : `npm run build` puis déployer le dossier `.next`
- **Railway** : Support Next.js natif
- **Docker** : Créer un Dockerfile

## 📦 Scripts disponibles

```bash
npm run dev      # Développement
npm run build    # Build production
npm run start    # Démarrer en production
npm run lint     # Linter ESLint
```

## 🎯 Prochaines étapes pour SaaS

### 1. Authentification
- Ajouter NextAuth.js ou Clerk
- Pages login/register
- Dashboard utilisateur

### 2. Base de données
- Supabase (PostgreSQL)
- Prisma ORM
- Schémas utilisateurs, abonnements, etc.

### 3. Paiements
- Stripe integration
- Gestion abonnements
- Webhooks

### 4. Dashboard Admin
- Gestion waitlist
- Analytics
- Gestion utilisateurs

### 5. Features SaaS
- Onboarding
- Settings utilisateur
- API keys
- Webhooks

## 🔐 Variables d'environnement

Copiez `.env.example` vers `.env.local` et remplissez :

```env
# Database
SUPABASE_URL=...
SUPABASE_ANON_KEY=...

# Email
RESEND_API_KEY=...

# Analytics
NEXT_PUBLIC_GA_ID=...
```

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## 🐛 Dépannage

### Erreur de build
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Problème de types
```bash
npm run build
# Vérifier les erreurs TypeScript
```

## 📄 Licence

Propriétaire - AdminZen © 2025

---

**Version :** 2.0 (Next.js)  
**Dernière mise à jour :** Décembre 2024

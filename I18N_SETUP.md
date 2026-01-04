# 🌍 Configuration Multilingue - AdminZen

Ce guide explique comment installer et configurer le système multilingue pour AdminZen.

## 📦 Installation

**Important** : Vous devez installer `next-intl` manuellement car il y a eu un problème de permissions :

```bash
npm install next-intl
```

## 🏗️ Structure créée

```
adminzen/
├── i18n/
│   ├── request.ts          # Configuration next-intl
│   └── routing.ts          # Configuration des routes et locales
├── messages/
│   ├── fr.json             # Traductions françaises
│   ├── de.json             # Traductions allemandes
│   └── en.json             # Traductions anglaises
├── middleware.ts           # Détection automatique de la langue
├── app/
│   ├── layout.tsx          # Layout racine minimal
│   └── [locale]/           # Routes avec locale
│       ├── layout.tsx      # Layout avec next-intl
│       ├── page.tsx         # Page d'accueil
│       └── blog/            # Pages blog
└── components/
    └── language-switcher.tsx  # Sélecteur de langue
```

## 🚀 Fonctionnalités

### ✅ Détection automatique de la langue

Le middleware détecte automatiquement la langue du navigateur et redirige l'utilisateur vers la version appropriée :
- Français (fr) - langue par défaut
- Allemand (de)
- Anglais (en)

### ✅ URLs avec locale

Les URLs incluent maintenant la locale :
- `/fr` - Version française
- `/de` - Version allemande
- `/en` - Version anglaise

### ✅ Sélecteur de langue

Un sélecteur de langue est disponible en haut à droite de la page pour changer manuellement de langue.

## 📝 Utilisation dans les composants

### Composants serveur (Server Components)

```tsx
import { getTranslations } from 'next-intl/server'

export default async function MyComponent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })
  
  return <h1>{t('title', { highlight: t('titleHighlight') })}</h1>
}
```

### Composants client (Client Components)

```tsx
'use client'

import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('hero')
  
  return <h1>{t('title', { highlight: t('titleHighlight') })}</h1>
}
```

## 🔧 Ajouter de nouvelles traductions

1. **Ajoutez les clés dans les fichiers JSON** (`messages/fr.json`, `messages/de.json`, `messages/en.json`)

2. **Utilisez les traductions dans vos composants** :

```tsx
const t = useTranslations('monNamespace')
return <p>{t('maCle')}</p>
```

## 📚 Exemples de traductions

Les fichiers de traduction sont organisés par namespace :

- `common` - Textes communs (boutons, liens)
- `hero` - Section hero
- `navigation` - Navigation
- `footer` - Footer
- `pricing` - Section pricing
- `waitlist` - Formulaire waitlist
- `painPoints` - Section avant/après
- `blog` - Pages blog

## 🐛 Dépannage

### Le middleware ne fonctionne pas

Vérifiez que `middleware.ts` est à la racine du projet et que `next-intl` est installé.

### Les traductions ne s'affichent pas

1. Vérifiez que les fichiers JSON sont bien formatés
2. Vérifiez que vous utilisez le bon namespace
3. Vérifiez que la locale est correctement passée aux composants serveur

### Erreur "Cannot find module 'next-intl'"

Installez `next-intl` :
```bash
npm install next-intl
```

## 📖 Documentation

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)


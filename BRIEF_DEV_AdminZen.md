# Brief Développeur - AdminZen Landing Page

## 📋 Vue d'ensemble du projet

**Nom du projet :** AdminZen - Assistant IA pour gestion administrative suisse  
**Type :** Landing page de validation MVP (test marché)  

---

## 🎯 Objectifs business

### Objectif principal
Valider le marché en collectant **200+ emails qualifiés** en 6 semaines avec un coût d'acquisition < CHF 10/lead.

### Métriques de succès
- **Taux de conversion cible :** 15-25% (visiteurs → inscrits waitlist)
- **Qualité leads :** 30%+ prêts à payer 15-25 CHF/mois
- **Engagement :** Temps moyen sur page > 2 min

### User journey
1. Arrive via Google Ads / Meta Ads / Reddit
2. Lit proposition de valeur (hero)
3. S'identifie à 1+ pain points
4. Comprend le fonctionnement (3 étapes)
5. Voit le pricing early access
6. S'inscrit à la waitlist

---

## 🎨 Design & UX

### Concept esthétique
**Brutalisme suisse raffiné** : propre, fonctionnel, typographie forte, animations subtiles.

**Palette de couleurs :**
```css
--noir: #0A0A0A
--blanc: #FAFAFA
--gris-clair: #E8E8E8
--gris: #6B6B6B
--accent: #D63031 (rouge vif)
--vert: #00B894 (success)
--jaune: #FDCB6E (warning)
```

**Typographies :**
- **Display/Titres :** Instrument Serif (italic pour emphase)
- **Body/Paragraphes :** DM Sans (400, 500, 700)
- Alternative si budget limité : System fonts de qualité

**Référence visuelle :** Voir `assistant-admin-suisse.html` (fourni en annexe)

### Responsive
- **Mobile-first** obligatoire (60%+ du trafic attendu sur mobile)
- Breakpoints : 768px, 1024px, 1440px
- Touch-friendly (boutons min 44x44px)

---

## 🏗️ Architecture technique

### Stack recommandé

**Option 1 : Simple & Rapide (recommandé pour MVP)**
- HTML5 + CSS3 vanilla
- JavaScript vanilla pour interactions
- Déploiement : Vercel

**Option 2 : Moderne & Scalable**
- Next.js 14 (App Router)
- Tailwind CSS
- Motion dev
- Déploiement : Vercel
- Backend : API Route Next.js → Supabase (utiliser le MCP)


### Hébergement & Performance
- **CDN global** obligatoire
- **HTTPS** obligatoire (confiance)
- **Lighthouse score cible :**
  - Performance : 90+
  - Accessibility : 95+
  - SEO : 100
  - Best Practices : 100

---

## 📄 Structure de la page (Sections)

### 1. Navigation (fixed)
```
Logo "AdminZen" (gauche) | CTA "Accès anticipé" (droite)
```
- Transparent au scroll top, fond blanc avec blur au scroll
- Logo cliquable → retour top
- CTA → scroll smooth vers formulaire

### 2. Hero Section
**Contenu :**
```
[KICKER] L'Assistant IA Suisse
[H1] Oubliez l'administratif. Vivez.
[SUBTITLE] AdminZen gère vos assurances, abonnements et déclarations 
d'impôts automatiquement. Économisez jusqu'à CHF 2'400/an sans lever 
le petit doigt.

[CTA Primary] Rejoindre la liste d'attente
[CTA Secondary] Comment ça marche ?

[Social proof] 👤👤👤👤 428 personnes sur liste d'attente
```

**Animations :**
- Fade-in séquentiel : kicker (0.2s) → h1 (0.4s) → subtitle (0.6s) → CTAs (0.8s)
- Gradient background subtil en radial
- Hover states sur boutons avec effet ripple

### 3. Stats Bar (fond noir)
```
CHF 2'400              10h                0
Économies/an          Temps gagné/mois    Deadlines manquées
```
- Counter animation au scroll (count-up de 0 à valeur cible)
- Grid responsive (3 cols desktop, 1 col mobile)

### 4. Pain Points (fond gris clair)
**Titre section :**
```
Vous reconnaissez ces situations ?
La complexité administrative suisse n'est pas une fatalité
```

**6 cartes (grid 3x2 desktop, 1 col mobile) :**
1. 📅 30 novembre encore raté
2. 😰 Déclaration d'impôts : la torture
3. 📧 Emails perdus dans le chaos
4. 💸 Abonnements oubliés
5. 🤯 Trop de paperasse
6. 😓 Zero temps libre

**Chaque carte :**
- Emoji icon (2.5rem)
- Titre court et percutant
- Description 2-3 lignes
- Hover : translateY(-8px) + shadow
- Bordure gauche accent rouge

### 5. Comment ça marche
**3 étapes avec numérotation visuelle :**
```
(1) Connectez vos emails (sécurisé)
Description + rassurance RGPD/LPD

(2) L'IA analyse et surveille pour vous
Description + bénéfice clé "10 jours avant deadline"

(3) Validez en 1 clic (ou on s'en occupe)
Description + option "pilote automatique"
```

**Layout :**
- Desktop : Alternance gauche/droite (zigzag)
- Mobile : Stack vertical
- Cercle numéroté rouge + contenu texte

### 6. Pricing (fond noir)
```
[Badge diagonal] -40% à vie

Early Access
CHF 14.90/mois (barré: CHF 24.90)

✓ Connexion emails sécurisée
✓ Analyse illimitée
✓ Alertes deadlines
✓ Recommandations personnalisées
✓ Lettres résiliation auto
✓ Support prioritaire 🇨🇭
✓ Garantie 60 jours

[CTA] Réserver ma place

⚡ Seulement 50 places restantes à ce tarif
```

**Design :**
- Carte blanche centrée sur fond noir
- Badge "promo" en diagonal top-right
- Liste features avec checkmarks verts
- FOMO message en petit en bas

### 7. FAQ (fond gris clair)
**6 questions essentielles (accordéon) :**
1. Mes données sont-elles en sécurité ?
2. Comment AdminZen peut-il vraiment me faire économiser CHF 2'400 ?
3. C'est quoi la différence avec Comparis ou Bonus.ch ?
4. Je suis nul en administratif, c'est vraiment pour moi ?
5. Ça marche dans tous les cantons ?
6. Que se passe-t-il après la liste d'attente ?

**Interactions :**
- Click pour expand/collapse
- Rotation icône arrow (180deg)
- Smooth height transition
- Hover : border accent rouge

### 8. Waitlist Form (fond rouge)
```
Prêt à reprendre le contrôle ?
Rejoignez les 428 personnes qui ne veulent plus jamais perdre 
de temps avec l'administratif

[Input] Email
[Input] Prénom
[Select] Canton de résidence (26 cantons)

[CTA] 🎉 Réserver ma place (50 restantes)

Pas de CB requise · Email de confirmation envoyé
```

**Validation :**
- Email format check (HTML5 + JS)
- Tous champs required
- Message succès/erreur
- Loading state sur submit

### 9. Footer (fond noir)
```
© 2025 AdminZen · Made with ❤️ in Switzerland

Politique de confidentialité | CGU | Contact
```

---

## 🔧 Fonctionnalités techniques

### Animations & Interactions

**Scroll animations (Intersection Observer) :**
```javascript
// Éléments à animer au scroll
- .stat-item (fade + translateY)
- .pain-card (fade + translateY stagger)
- .step (fade + translateX alternate)

// Trigger: 10% visible, rootMargin: -100px
```

**Micro-interactions :**
- Button hover : translateY(-2px) + shadow
- Card hover : translateY(-8px) + shadow
- Smooth scroll sur anchor links
- FAQ accordion smooth expand

**Performance :**
- Lazy load images (si illustrations ajoutées)
- Defer non-critical JS
- Preload fonts critiques
- Minimize CSS/JS

### Backend Formulaire

**Données à collecter :**
```javascript
{
  email: string (required, validated),
  prenom: string (required),
  canton: string (required, dropdown 26 cantons),
  timestamp: datetime (auto),
  source: string (UTM tracking si ads),
  device: string (user agent)
}
```

**Flow post-soumission :**
1. Validation côté client
2. POST vers backend/API
3. Sauvegarde dans DB (Google Sheets / Airtable / Supabase)
4. Email confirmation auto (Mailchimp / SendGrid / Resend)
5. Message succès → Reset form

**Email confirmation (template simple) :**
```
Sujet: 🎉 Bienvenue sur AdminZen !

Bonjour [Prénom],

Merci de rejoindre les 428 early adopters d'AdminZen !

Vous recevrez un email mi-février 2026 avec :
✓ Votre accès bêta prioritaire
✓ Votre tarif à vie : CHF 14.90/mois (au lieu de 24.90)
✓ Un guide d'onboarding personnalisé

En attendant, suivez-nous sur LinkedIn pour les coulisses : [lien]

À très bientôt,
L'équipe AdminZen

---
Hébergé en Suisse 🇨🇭 · Conforme RGPD/LPD
```

### Tracking & Analytics

**Google Analytics 4 (obligatoire) :**
```javascript
// Events à tracker
- page_view
- scroll_depth (25%, 50%, 75%, 100%)
- cta_click (hero_primary, hero_secondary, pricing, final)
- form_start
- form_submit
- faq_expand (quelle question)
```

**Meta Pixel (si ads Facebook/Instagram) :**
```javascript
// Events
- PageView
- ViewContent
- Lead (form submit)
```

**Google Ads Conversion Tracking :**
```javascript
// Conversion : form_submit
```

### A/B Testing

**Préparer 2 variantes à tester :**

**Variante A (actuelle) : Angle "Économies"**
- H1 : "Oubliez l'administratif. Vivez."
- Focus : CHF 2'400 économisés

**Variante B : Angle "Zéro Stress"**
- H1 : "Plus jamais de deadline manquée"
- Focus : Tranquillité d'esprit, automatisation

**Implémentation :**
- Cookie/localStorage pour persister variante
- 50/50 split random
- Tracker variante dans Analytics (custom dimension)

---

## 🔐 Sécurité & Conformité

### RGPD / LPD suisse

**Obligatoire :**
- [ ] Cookie banner (consentement analytics)
- [ ] Page "Politique de confidentialité" (lien footer)
- [ ] Page "CGU" (lien footer)
- [ ] Mention HTTPS + hébergement Suisse
- [ ] Opt-in explicite formulaire (checkbox ?)
- [ ] Double opt-in email (recommandé)

**Texte légal minimal (à valider avec avocat) :**
```
En vous inscrivant, vous acceptez de recevoir des emails 
d'AdminZen concernant le lancement du produit. Vous pouvez 
vous désinscrire à tout moment. Données hébergées en Suisse, 
conformes RGPD/LPD. [Lien Politique de confidentialité]
```

### Headers sécurité
```
Content-Security-Policy: ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 📊 SEO

### Meta tags essentiels
```html
<title>AdminZen - Assistant IA pour votre administratif suisse | Économisez CHF 2'400/an</title>
<meta name="description" content="AdminZen gère automatiquement vos assurances, abonnements et impôts en Suisse. Économisez jusqu'à CHF 2'400/an et 10h/mois. Essai gratuit.">
<meta name="keywords" content="assistant administratif suisse, gestion assurance maladie, changement assurance, IA suisse, fintech suisse">

<!-- Open Graph -->
<meta property="og:title" content="AdminZen - Oubliez l'administratif suisse">
<meta property="og:description" content="L'IA qui gère vos assurances, abonnements et impôts. CHF 2'400 économisés/an.">
<meta property="og:image" content="https://adminzen.ch/og-image.jpg">
<meta property="og:url" content="https://adminzen.ch">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="AdminZen - Assistant administratif IA suisse">
<meta name="twitter:description" content="Économisez CHF 2'400/an sans effort">
<meta name="twitter:image" content="https://adminzen.ch/twitter-image.jpg">
```

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AdminZen",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "14.90",
    "priceCurrency": "CHF"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "428"
  }
}
```

---

## 🚀 Déploiement

### Checklist pré-lancement
- [ ] Test cross-browser (Chrome, Safari, Firefox, Edge)
- [ ] Test mobile (iOS Safari, Chrome Android)
- [ ] Lighthouse score ≥ 90 partout
- [ ] Formulaire fonctionnel (test email reçu)
- [ ] Analytics installés et testés
- [ ] SSL actif
- [ ] DNS configuré
- [ ] Redirections www → non-www (ou inverse)
- [ ] 404 page custom
- [ ] Favicon + app icons
- [ ] robots.txt
- [ ] sitemap.xml

### Domaine
**Nom suggéré :** adminzen.ch ou admin-zen.ch  
**Alternatives :** gestionzen.ch, zenassist.ch, swissadmin.ai

**Registrar Suisse recommandé :** Infomaniak, Hostpoint, Switch

### Environnements
```
Production : adminzen.ch
Staging : staging.adminzen.ch (pour tests)
```

---

## 📦 Livrables attendus

### Code
- [ ] Repository Git (GitHub/GitLab)
- [ ] README.md avec instructions setup
- [ ] Code commenté (sections clés)
- [ ] Variables d'environnement documentées

### Documentation
- [ ] Guide déploiement
- [ ] Guide configuration analytics
- [ ] Guide modification contenu
- [ ] Liste des assets manquants (images à créer)

### Accès
- [ ] Admin dashboard analytics
- [ ] Admin backend formulaire
- [ ] Accès hébergement
- [ ] Credentials DNS

---

## 💰 Budget & Timeline

### Estimation coûts
```
Développement : CHF 1'500 - 3'000 (selon stack)
Domaine .ch : CHF 15/an
Hébergement : CHF 0 (Vercel/Netlify gratuit pour ce traffic)
Email transactionnel : CHF 0 (Resend 3k/mois gratuit)
Database : CHF 0 (Airtable/Supabase tier gratuit)

TOTAL première année : CHF 1'515 - 3'015
```

### Timeline suggéré
```
Jour 1-2 : Setup projet + intégration design
Jour 3-4 : Développement sections + responsive
Jour 5 : Formulaire + backend + emails
Jour 6 : Analytics + tracking + tests
Jour 7 : Déploiement + debug + QA final

Livraison : J+7
```

---

## 🎨 Assets à créer (optionnel)

### Images
- **OG image** (1200x630px) : Screenshot hero ou mockup
- **Favicon** (32x32, 196x196)
- **App icons** (180x180 iOS, 192x192 Android)
- **Illustrations** (optionnel) : Mockup dashboard, flow steps

### Alternative low-budget
- Utiliser emojis pour icons (actuel)
- Gradients CSS pour backgrounds
- Pas d'images = faster load

---

## 🧪 Tests à effectuer

### Fonctionnels
- [ ] Tous les liens fonctionnent
- [ ] Formulaire valide et sauvegarde data
- [ ] Email confirmation reçu
- [ ] Smooth scroll fonctionne
- [ ] FAQ accordion ouvre/ferme
- [ ] Responsive sur tous devices

### Performance
- [ ] Page load < 2s (3G)
- [ ] Time to Interactive < 3s
- [ ] Lighthouse 90+ tous scores

### Accessibilité
- [ ] Navigation clavier complète
- [ ] Screen reader compatible
- [ ] Contrast ratio AAA
- [ ] Alt texts images (si ajoutées)

---

## 📞 Support & Questions

### Contact client
**Email :** [votre-email]  
**Disponibilité :** [vos horaires]

### Questions fréquentes dev

**Q: Quel backend pour le formulaire ?**  
R: Pour MVP, Google Sheets + Zapier ou Airtable API. Simple et gratuit.

**Q: A/B testing comment ?**  
R: Version simple = 2 pages différentes + redirect 50/50. Ou Google Optimize.

**Q: Animations obligatoires ?**  
R: Essentielles pour conversion. Fade-in au scroll minimum. Mais pas de surcharge.

**Q: Analytics : GA4 suffit ?**  
R: Oui pour MVP. Ajouter Hotjar/Microsoft Clarity plus tard pour heatmaps.

---

## ✅ Checklist finale

Avant de marquer le projet "terminé" :

**Code & Technique**
- [ ] Code pushed sur Git avec branches (main, develop)
- [ ] No console errors
- [ ] All links work (no 404)
- [ ] Forms work end-to-end
- [ ] Mobile responsive perfected
- [ ] Cross-browser tested

**Contenu**
- [ ] Tous textes FR corrects (pas de lorem ipsum)
- [ ] Numéros statistiques cohérents partout
- [ ] CTAs cohérents (même wording)
- [ ] 26 cantons suisses dans dropdown

**Performance**
- [ ] Lighthouse 90+ all metrics
- [ ] Page load < 2s
- [ ] No layout shifts (CLS < 0.1)

**Tracking**
- [ ] GA4 events firing correctly
- [ ] Form submission tracked
- [ ] Pixels installés (si ads)

**Légal**
- [ ] Cookie banner fonctionne
- [ ] Politique confidentialité linkée
- [ ] CGU linkées
- [ ] Mentions légales présentes

**Déploiement**
- [ ] SSL actif (HTTPS)
- [ ] DNS propagé
- [ ] Domaine accessible www + non-www
- [ ] Redirections configurées
- [ ] Sitemap.xml submitted Google

---

## 🎁 Bonus (si temps/budget)

### Nice-to-have (non bloquants)
- Testimonials section (quand premiers utilisateurs)
- Blog/Resources section (SEO long-terme)
- Comparaison tableau AdminZen vs alternatives
- Easter egg hover sur logo (fun)
- Dark mode toggle
- Langue switcher (DE/FR/IT)

### Optimisations futures
- Exit-intent popup (offre spéciale)
- Chat widget (Intercom/Crisp)
- Countdown timer "X jours avant fermeture early access"
- Referral program section

---

## 📎 Annexes

**Fichier joint :**
- `assistant-admin-suisse.html` - Exemple complet HTML/CSS/JS

**Ressources utiles :**
- [Typographie Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif)
- [DM Sans](https://fonts.google.com/specimen/DM+Sans)
- [Accessibility Checker](https://www.accessibilitychecker.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**Version du brief :** 1.0  
**Date :** 24 décembre 2024  
**Auteur :** Claude (Assistant IA)

🚀 Bon développement !
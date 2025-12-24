# Guide d'installation Google Analytics 4 (GA4)

## 📊 Configuration de Google Analytics 4

### 1. Créer un compte Google Analytics

1. Allez sur [analytics.google.com](https://analytics.google.com)
2. Cliquez sur **"Commencer la mesure"** ou **"Start measuring"**
3. Créez un compte (si vous n'en avez pas)
4. Donnez un nom à votre compte (ex: "AdminZen")

### 2. Créer une propriété

1. Cliquez sur **"Créer une propriété"** ou **"Create Property"**
2. Entrez le nom de votre site (ex: "AdminZen")
3. Sélectionnez votre fuseau horaire (Europe/Zurich pour la Suisse)
4. Choisissez votre devise (CHF)
5. Cliquez sur **"Suivant"**

### 3. Configurer le flux de données

1. Sélectionnez **"Web"** comme plateforme
2. Entrez l'URL de votre site (ex: `https://adminzen.ch`)
3. Donnez un nom au flux (ex: "AdminZen Website")
4. Cliquez sur **"Créer un flux"**

### 4. Obtenir votre ID de mesure

1. Une fois le flux créé, vous verrez votre **ID de mesure** (format: `G-XXXXXXXXXX`)
2. Copiez cet ID

### 5. Configuration dans votre projet

1. Créez un fichier `.env.local` à la racine du projet :
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

2. Remplacez `G-XXXXXXXXXX` par votre vrai ID de mesure GA4

3. Redémarrez votre serveur de développement :
```bash
npm run dev
```

### 6. Accéder au dashboard GA4

1. **URL de connexion** : [https://analytics.google.com](https://analytics.google.com)
2. Connectez-vous avec votre compte Google
3. Sélectionnez votre propriété "AdminZen"
4. Vous verrez le dashboard avec vos statistiques

## 📈 Ce que vous verrez dans le dashboard

- **Utilisateurs** : Nombre de visiteurs uniques
- **Événements** : Actions effectuées sur le site
- **Pages vues** : Nombre de pages consultées
- **Taux de rebond** : Pourcentage de visiteurs qui quittent rapidement
- **Durée moyenne** : Temps passé sur le site
- **Sources de trafic** : D'où viennent vos visiteurs (Google, Facebook, etc.)
- **Démographie** : Âge, genre, localisation
- **Appareils** : Desktop vs Mobile vs Tablet

## 🔧 Vérifier que ça fonctionne

### Méthode 1 : Google Analytics DebugView
1. Dans GA4, allez dans **Admin** → **DebugView**
2. Visitez votre site
3. Vous devriez voir les événements en temps réel

### Méthode 2 : Extension Chrome
1. Installez l'extension [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Activez-la
3. Visitez votre site
4. Ouvrez la console (F12) pour voir les événements GA4

### Méthode 3 : Temps réel
1. Dans GA4, allez dans **Rapports** → **Temps réel**
2. Visitez votre site
3. Vous devriez vous voir apparaître dans les statistiques en temps réel

## 🔐 Conformité RGPD

⚠️ **Important** : Google Analytics nécessite le consentement des utilisateurs selon le RGPD.

Votre site a déjà un **CookieBanner** qui demande le consentement. Assurez-vous que :
1. Le banner s'affiche bien
2. Les utilisateurs doivent accepter avant que GA4 ne se charge
3. Vous pouvez modifier `components/cookie-banner.tsx` pour gérer le consentement GA4

### Option : Charger GA4 uniquement après consentement

Si vous voulez que GA4 ne se charge qu'après consentement, modifiez `components/google-analytics.tsx` pour vérifier le consentement avant de charger le script.

## 🐛 Dépannage

### Les stats n'apparaissent pas ?

1. Vérifiez que `NEXT_PUBLIC_GA_ID` est bien défini dans `.env.local`
2. Vérifiez que l'ID commence bien par `G-`
3. Attendez 24-48h pour les premiers rapports (le temps réel fonctionne immédiatement)
4. Vérifiez la console du navigateur pour d'éventuelles erreurs
5. Assurez-vous que votre site est en production ou que vous testez avec l'URL correcte

### Le script ne se charge pas en développement ?

C'est normal si `NEXT_PUBLIC_GA_ID` n'est pas défini. Le composant ne charge GA4 que si la variable d'environnement est définie.

## 🔗 Liens utiles

- **Google Analytics** : [https://analytics.google.com](https://analytics.google.com)
- **Documentation GA4** : [https://developers.google.com/analytics/devguides/collection/ga4](https://developers.google.com/analytics/devguides/collection/ga4)
- **GA4 pour Next.js** : [https://nextjs.org/learn/seo/analytics](https://nextjs.org/learn/seo/analytics)


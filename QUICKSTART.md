# 🚀 Guide de démarrage rapide

## Installation et lancement

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

### 3. Ouvrir dans le navigateur

```
http://localhost:3000
```

## ✅ Vérifications

Une fois lancé, vous devriez voir :

- ✅ La landing page complète avec toutes les sections
- ✅ La navigation fixe en haut
- ✅ Les animations au scroll
- ✅ Le cookie banner (apparaît après 1 seconde)
- ✅ La barre de progression en haut lors du scroll
- ✅ Le formulaire fonctionnel (validation en temps réel)

## 🔧 Configuration backend (optionnel)

Pour connecter le formulaire à un vrai backend :

1. Modifiez `app/api/waitlist/route.ts`
2. Ajoutez votre logique de sauvegarde (Supabase, Airtable, etc.)
3. Ajoutez l'envoi d'email de confirmation (Resend, SendGrid, etc.)

Voir le README.md pour les exemples détaillés.

## 📦 Build production

```bash
npm run build
npm start
```

## 🎯 Prochaines étapes

1. **Backend** : Connecter à Supabase/Airtable
2. **Email** : Configurer Resend/SendGrid
3. **Analytics** : Ajouter Google Analytics
4. **Déploiement** : Déployer sur Vercel

---

**C'est tout ! Votre landing page Next.js est prête.** 🎉


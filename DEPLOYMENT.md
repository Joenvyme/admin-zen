# 🚀 Guide de déploiement - AdminZen

## Option 1 : Vercel (Recommandé pour Next.js)

Vercel est la plateforme officielle de Next.js, c'est la solution la plus simple et rapide.

### Étape 1 : Préparer votre projet

1. **Assurez-vous que votre code est sur GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/votre-username/adminzen.git
   git push -u origin main
   ```

2. **Vérifiez que votre projet build correctement**
   ```bash
   npm run build
   ```
   Si ça fonctionne, vous êtes prêt !

### Étape 2 : Déployer sur Vercel

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Sign Up"
   - Connectez-vous avec GitHub/GitLab/Bitbucket

2. **Importer votre projet**
   - Cliquez sur "Add New..." → "Project"
   - Importez votre repository GitHub
   - Vercel détectera automatiquement Next.js

3. **Configuration**
   - Framework Preset : Next.js (détecté automatiquement)
   - Root Directory : `./` (par défaut)
   - Build Command : `npm run build` (par défaut)
   - Output Directory : `.next` (par défaut)
   - Install Command : `npm install` (par défaut)

4. **Variables d'environnement**
   - Cliquez sur "Environment Variables"
   - Ajoutez : `NEXT_PUBLIC_GA_ID` = votre ID Google Analytics (si vous l'utilisez)
   - Cliquez sur "Deploy"

5. **Premier déploiement**
   - Vercel va builder et déployer votre site
   - Vous obtiendrez une URL temporaire : `votre-projet.vercel.app`

### Étape 3 : Connecter votre domaine

1. **Dans Vercel Dashboard**
   - Allez dans votre projet
   - Cliquez sur "Settings" → "Domains"
   - Cliquez sur "Add Domain"

2. **Ajouter votre domaine**
   - Entrez votre domaine (ex: `adminzen.ch`)
   - Vercel vous donnera des enregistrements DNS à configurer

3. **Configurer le DNS chez votre registrar**
   
   **Option A : Utiliser les nameservers de Vercel (Recommandé)**
   - Vercel vous donnera des nameservers (ex: `ns1.vercel-dns.com`)
   - Allez chez votre registrar (ex: Namecheap, GoDaddy, etc.)
   - Changez les nameservers pour utiliser ceux de Vercel
   - Attendez 24-48h pour la propagation

   **Option B : Utiliser des enregistrements DNS (Plus rapide)**
   - Gardez vos nameservers actuels
   - Ajoutez les enregistrements DNS que Vercel vous donne :
     - Type `A` : pointe vers l'IP de Vercel
     - Type `CNAME` : pour `www.adminzen.ch` → `cname.vercel-dns.com`
   - Attendez quelques minutes pour la propagation

4. **Vérification**
   - Vercel vérifiera automatiquement la configuration
   - Une fois validé, votre site sera accessible sur votre domaine !

### Étape 4 : Configuration HTTPS

- Vercel fournit automatiquement un certificat SSL gratuit
- HTTPS sera activé automatiquement une fois le domaine connecté

---

## Option 2 : Netlify

### Étape 1 : Préparer le build

1. **Créer un fichier `netlify.toml`** (optionnel mais recommandé)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Étape 2 : Déployer

1. Allez sur [netlify.com](https://netlify.com)
2. Connectez votre repository GitHub
3. Netlify détectera Next.js automatiquement
4. Configurez les variables d'environnement
5. Déployez !

### Étape 3 : Connecter le domaine

- Similaire à Vercel
- Allez dans "Domain settings"
- Ajoutez votre domaine
- Configurez les DNS selon les instructions

---

## Option 3 : Railway

1. Allez sur [railway.app](https://railway.app)
2. Créez un nouveau projet depuis GitHub
3. Railway détectera Next.js
4. Ajoutez votre domaine dans les settings
5. Configurez les DNS

---

## 🔧 Configuration post-déploiement

### 1. Variables d'environnement

Assurez-vous d'ajouter toutes vos variables d'environnement dans votre plateforme :

- `NEXT_PUBLIC_GA_ID` : Votre ID Google Analytics 4

### 2. Vérifier le build

Après le déploiement, vérifiez que tout fonctionne :
- ✅ Le site se charge
- ✅ Les images s'affichent
- ✅ Les formulaires fonctionnent
- ✅ Les animations fonctionnent
- ✅ Le responsive fonctionne

### 3. Performance

- Vercel/Netlify optimisent automatiquement Next.js
- Les images sont optimisées automatiquement
- Le cache est géré automatiquement

---

## 🐛 Dépannage

### Le build échoue

1. Vérifiez les logs de build dans votre dashboard
2. Testez en local : `npm run build`
3. Vérifiez que toutes les dépendances sont dans `package.json`

### Le domaine ne fonctionne pas

1. Vérifiez que les DNS sont bien configurés (attendez 24-48h)
2. Utilisez [whatsmydns.net](https://www.whatsmydns.net) pour vérifier la propagation
3. Vérifiez que le domaine est bien ajouté dans votre plateforme

### Les variables d'environnement ne fonctionnent pas

1. Assurez-vous qu'elles commencent par `NEXT_PUBLIC_` si elles doivent être accessibles côté client
2. Redéployez après avoir ajouté les variables
3. Vérifiez qu'il n'y a pas d'espaces dans les valeurs

---

## 📊 Après le déploiement

1. **Tester votre site** : Visitez votre domaine et testez toutes les fonctionnalités
2. **Configurer Google Analytics** : Ajoutez votre ID GA4 dans les variables d'environnement
3. **Soumettre à Google Search Console** : Pour le référencement
4. **Vérifier les performances** : Utilisez PageSpeed Insights

---

## 🔗 Liens utiles

- **Vercel** : [vercel.com](https://vercel.com)
- **Netlify** : [netlify.com](https://netlify.com)
- **Railway** : [railway.app](https://railway.app)
- **Next.js Deployment** : [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)


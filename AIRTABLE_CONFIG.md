# 🔧 Configuration Airtable - Guide rapide

## 📋 Étape 1 : Obtenir vos credentials Airtable

1. **Allez sur [airtable.com/api](https://airtable.com/api)**
2. **Sélectionnez votre base** (celle avec votre table "Waitlist")
3. **Cliquez sur "Generate API key"** si vous n'en avez pas encore
4. **Copiez votre API Key** (commence par `pat...`)

## 📋 Étape 2 : Obtenir votre Base ID

1. **Dans votre base Airtable**, allez sur [airtable.com/api](https://airtable.com/api)
2. **Sélectionnez votre base**
3. **Dans l'URL ou la documentation**, vous verrez votre **Base ID** (commence par `app...`)
   - Exemple d'URL : `https://airtable.com/appXXXXXXXXXXXXXX/...`
   - Le Base ID est la partie `appXXXXXXXXXXXXXX`

## 📋 Étape 3 : Vérifier la structure de votre table

Assurez-vous que votre table "Waitlist" a ces colonnes (exactement ces noms) :

- **Email** (type: Email ou Single line text)
- **Prénom** (type: Single line text)
- **Canton** (type: Single line text)
- **Source** (type: Single line text) - optionnel
- **Device** (type: Single line text) - optionnel
- **Timestamp** (type: Date ou Single line text) - optionnel

⚠️ **Important** : Les noms des colonnes doivent correspondre exactement (sensible à la casse) !

## 📋 Étape 4 : Configurer les variables d'environnement dans Vercel

1. **Allez sur [vercel.com](https://vercel.com)** → votre projet
2. **Settings** → **Environment Variables**
3. **Ajoutez ces deux variables** :

```
AIRTABLE_API_KEY = patVotreCleAPI
AIRTABLE_BASE_ID = appVotreBaseID
```

4. **Sélectionnez** : Production, Preview, Development (tous les environnements)
5. **Cliquez sur "Save"**

## 📋 Étape 5 : Redéployer

1. **Vercel va automatiquement redéployer** après avoir ajouté les variables
2. **Ou manuellement** : Allez dans "Deployments" → "Redeploy"

## ✅ Vérification

1. **Testez votre formulaire** sur votre site
2. **Allez dans Airtable** → votre table "Waitlist"
3. **Vous devriez voir** la nouvelle entrée apparaître !

## 🐛 Dépannage

### Les données n'apparaissent pas dans Airtable ?

1. **Vérifiez les logs Vercel** :
   - Dashboard Vercel → Functions → View Logs
   - Cherchez les erreurs Airtable

2. **Vérifiez les noms des colonnes** :
   - Doivent correspondre exactement : Email, Prénom, Canton, Source, Device, Timestamp
   - Sensible à la casse !

3. **Vérifiez vos credentials** :
   - API Key commence par `pat...`
   - Base ID commence par `app...`

4. **Vérifiez les permissions** :
   - Votre API Key doit avoir accès à la base
   - La table doit s'appeler exactement "Waitlist"

### Erreur "Table not found" ?

- Vérifiez que votre table s'appelle exactement **"Waitlist"** (avec un W majuscule)

### Erreur "Field not found" ?

- Vérifiez que toutes les colonnes existent dans Airtable
- Les noms doivent correspondre exactement (Email, Prénom, Canton, etc.)

## 🔗 Liens utiles

- **Airtable API Docs** : [airtable.com/api](https://airtable.com/api)
- **Airtable Dashboard** : [airtable.com](https://airtable.com)


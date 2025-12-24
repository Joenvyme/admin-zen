# 🔧 Dépannage Airtable - Erreur NOT_FOUND

## ❌ Erreur actuelle

```
❌ Airtable error: NOT_FOUND
Could not find what you are looking for (404)
```

## 🔍 Causes possibles

### 1. Base ID incorrect

**Vérification** :
- Allez sur [airtable.com/api](https://airtable.com/api)
- Sélectionnez votre base
- Dans l'URL, vous verrez : `https://airtable.com/appXXXXXXXXXXXXXX/...`
- Le Base ID est `appXXXXXXXXXXXXXX`

**Solution** :
- Vérifiez que le Base ID dans Vercel correspond exactement
- Pas d'espaces avant/après
- Commence bien par `app`

### 2. Nom de la table incorrect

**Vérification** :
- Dans Airtable, vérifiez le nom exact de votre table
- Le code cherche une table nommée **"Waitlist"** (avec un W majuscule)

**Solution** :
- Le nom doit être exactement **"Waitlist"** (sensible à la casse)
- Si votre table s'appelle "waitlist" ou "WaitList", changez soit :
  - Le nom dans Airtable → "Waitlist"
  - OU le code dans `route.ts` → le nom de votre table

### 3. Colonnes manquantes ou mal nommées

**Vérification** :
Votre table doit avoir ces colonnes (noms exacts) :
- **Email** (pas "email" ou "E-mail")
- **Prénom** (pas "prenom" ou "Prénom")
- **Canton** (pas "canton")
- **Source** (optionnel)
- **Device** (optionnel)
- **Timestamp** (optionnel)

**Solution** :
- Vérifiez que tous les noms correspondent exactement
- Sensible à la casse !

## 🛠️ Solution rapide

### Option A : Vérifier le nom de la table

1. Ouvrez votre base Airtable
2. Regardez le nom exact de votre table (onglet en bas)
3. Si ce n'est pas "Waitlist", modifiez le code :

Dans `app/api/waitlist/route.ts`, ligne 30, changez :
```typescript
await base('Waitlist').create([
```

Par le nom exact de votre table, par exemple :
```typescript
await base('waitlist').create([  // si votre table s'appelle "waitlist"
```

### Option B : Renommer votre table dans Airtable

1. Dans Airtable, cliquez sur le nom de votre table
2. Renommez-la en **"Waitlist"** (exactement)

## 📋 Checklist de vérification

- [ ] Base ID correct dans Vercel (commence par `app`)
- [ ] API Key correct dans Vercel (commence par `pat`)
- [ ] Table s'appelle exactement "Waitlist"
- [ ] Colonnes : Email, Prénom, Canton (noms exacts)
- [ ] Variables d'environnement ajoutées dans Vercel
- [ ] Vercel redéployé après ajout des variables

## 🔍 Debug dans les logs Vercel

Les logs devraient maintenant afficher :
```
🔍 Attempting to save to Airtable...
🔍 Base ID: app...
🔍 Table name: Waitlist
```

Si vous voyez ces logs, le problème est probablement :
- Le Base ID est incorrect
- OU le nom de la table ne correspond pas

## 📞 Besoin d'aide ?

Dites-moi :
1. Le nom exact de votre table dans Airtable
2. Votre Base ID (les 4 premiers caractères suffisent : `appX...`)
3. Les logs complets de Vercel


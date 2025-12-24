# 📧 Configuration de la sauvegarde des emails - Waitlist

## ⚠️ Situation actuelle

**Les emails ne sont PAS sauvegardés actuellement !**

Ils sont uniquement loggés dans la console du serveur Vercel. Pour les voir :
1. Allez dans votre dashboard Vercel
2. Cliquez sur votre projet → "Functions" → "View Logs"
3. Vous verrez les logs avec `console.log("New waitlist signup:", validatedData)`

## 🎯 Solutions pour sauvegarder les emails

### Option 1 : Google Sheets (Simple et gratuit)

**Avantages** : Gratuit, facile à utiliser, accessible à tous

1. **Créer une Google Sheet**
   - Créez un nouveau Google Sheet
   - Ajoutez les colonnes : Email, Prénom, Canton, Source, Device, Timestamp
   - Partagez-le avec un compte de service Google

2. **Installer les dépendances**
```bash
npm install googleapis
```

3. **Modifier `app/api/waitlist/route.ts`**
```typescript
import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

export async function POST(request: NextRequest) {
  // ... validation existante ...
  
  // Sauvegarder dans Google Sheets
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Waitlist!A:F',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        validatedData.email,
        validatedData.prenom,
        validatedData.canton,
        validatedData.source || 'direct',
        validatedData.device || '',
        validatedData.timestamp || new Date().toISOString(),
      ]],
    },
  })
  
  // ... reste du code ...
}
```

4. **Variables d'environnement dans Vercel**
```
GOOGLE_CLIENT_EMAIL=votre-email@votre-projet.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SHEET_ID=1ABC...XYZ
```

---

### Option 2 : Airtable (Recommandé pour MVP)

**Avantages** : Interface visuelle, facile à utiliser, gratuit jusqu'à 1200 enregistrements/mois

1. **Créer une base Airtable**
   - Créez une base "Waitlist"
   - Créez une table avec les champs : Email, Prénom, Canton, Source, Device, Timestamp

2. **Installer les dépendances**
```bash
npm install airtable
```

3. **Modifier `app/api/waitlist/route.ts`**
```typescript
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!)

export async function POST(request: NextRequest) {
  // ... validation existante ...
  
  // Sauvegarder dans Airtable
  await base('Waitlist').create([{
    fields: {
      'Email': validatedData.email,
      'Prénom': validatedData.prenom,
      'Canton': validatedData.canton,
      'Source': validatedData.source || 'direct',
      'Device': validatedData.device || '',
      'Timestamp': validatedData.timestamp || new Date().toISOString(),
    },
  }])
  
  // ... reste du code ...
}
```

4. **Variables d'environnement dans Vercel**
```
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=app...
```

---

### Option 3 : Supabase (Pour une vraie base de données)

**Avantages** : Base de données PostgreSQL, scalable, gratuit jusqu'à 500MB

1. **Créer un projet Supabase**
   - Allez sur [supabase.com](https://supabase.com)
   - Créez un projet
   - Créez une table `waitlist` avec les colonnes : email, prenom, canton, source, device, timestamp

2. **Installer les dépendances**
```bash
npm install @supabase/supabase-js
```

3. **Modifier `app/api/waitlist/route.ts`**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  // ... validation existante ...
  
  // Sauvegarder dans Supabase
  const { error } = await supabase
    .from('waitlist')
    .insert([validatedData])
  
  if (error) {
    throw error
  }
  
  // ... reste du code ...
}
```

4. **Variables d'environnement dans Vercel**
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

---

### Option 4 : Email simple (Pour commencer rapidement)

**Avantages** : Pas de base de données, reçoit les emails directement

1. **Installer Resend**
```bash
npm install resend
```

2. **Modifier `app/api/waitlist/route.ts`**
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  // ... validation existante ...
  
  // Envoyer un email avec les données
  await resend.emails.send({
    from: 'AdminZen <noreply@adminzen.ch>',
    to: 'votre-email@example.com', // Votre email
    subject: `Nouvelle inscription waitlist - ${validatedData.prenom}`,
    html: `
      <h2>Nouvelle inscription waitlist</h2>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Prénom:</strong> ${validatedData.prenom}</p>
      <p><strong>Canton:</strong> ${validatedData.canton}</p>
      <p><strong>Source:</strong> ${validatedData.source || 'direct'}</p>
      <p><strong>Timestamp:</strong> ${validatedData.timestamp || new Date().toISOString()}</p>
    `,
  })
  
  // ... reste du code ...
}
```

3. **Variables d'environnement dans Vercel**
```
RESEND_API_KEY=re_...
```

---

## 📊 Comparaison des solutions

| Solution | Coût | Complexité | Scalabilité | Recommandation |
|----------|------|------------|-------------|---------------|
| **Google Sheets** | Gratuit | ⭐⭐ Facile | ⭐⭐ Moyenne | Pour commencer |
| **Airtable** | Gratuit (limité) | ⭐ Facile | ⭐⭐⭐ Bonne | ⭐ **Recommandé** |
| **Supabase** | Gratuit (limité) | ⭐⭐⭐ Moyenne | ⭐⭐⭐⭐ Excellente | Pour scale |
| **Email simple** | Gratuit (limité) | ⭐ Facile | ⭐ Faible | Pour test rapide |

---

## 🚀 Recommandation

Pour un MVP, je recommande **Airtable** :
- ✅ Interface visuelle intuitive
- ✅ Gratuit jusqu'à 1200 enregistrements/mois
- ✅ Facile à configurer
- ✅ Export facile en CSV/Excel
- ✅ Peut être partagé avec votre équipe

---

## 📝 Prochaines étapes

1. Choisissez une solution
2. Suivez les instructions ci-dessus
3. Ajoutez les variables d'environnement dans Vercel
4. Testez le formulaire
5. Vérifiez que les données sont bien sauvegardées

---

## 🔗 Liens utiles

- **Airtable** : [airtable.com](https://airtable.com)
- **Supabase** : [supabase.com](https://supabase.com)
- **Google Sheets API** : [developers.google.com/sheets](https://developers.google.com/sheets)
- **Resend** : [resend.com](https://resend.com)


# 🐙 Guide pour publier sur GitHub

## Étape 1 : Créer un compte GitHub (si vous n'en avez pas)

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"Sign up"**
3. Créez votre compte avec votre email
4. Vérifiez votre email

## Étape 2 : Créer un nouveau repository

1. **Connectez-vous à GitHub**
2. Cliquez sur le **"+"** en haut à droite → **"New repository"**
3. **Remplissez le formulaire** :
   - **Repository name** : `adminzen` (ou le nom que vous voulez)
   - **Description** : "Landing page AdminZen - Assistant IA pour l'administratif suisse"
   - **Visibilité** : 
     - ✅ **Public** (recommandé pour un projet de landing page)
     - ⚠️ **Private** (si vous voulez garder le code privé)
   - **NE COCHEZ PAS** "Add a README file" (vous en avez déjà un)
   - **NE COCHEZ PAS** "Add .gitignore" (vous en avez déjà un)
   - **NE COCHEZ PAS** "Choose a license" (pour l'instant)
4. Cliquez sur **"Create repository"**

## Étape 3 : Connecter votre projet local à GitHub

Une fois le repository créé, GitHub vous donnera des instructions. Voici les commandes à exécuter :

### Option A : Si votre repository est vide (recommandé)

```bash
# Dans le terminal, allez dans votre dossier projet
cd /Users/weblaw/Joenvyme/adminzen

# Supprimez l'ancien remote (celui avec le placeholder)
git remote remove origin

# Ajoutez votre nouveau repository GitHub
# REMPLACEZ "votre-username" par votre vrai nom d'utilisateur GitHub
git remote add origin https://github.com/VOTRE-USERNAME/adminzen.git

# Vérifiez que c'est bien configuré
git remote -v

# Poussez votre code sur GitHub
git push -u origin main
```

### Option B : Si vous avez déjà des commits

Si vous avez déjà des commits locaux :

```bash
# Vérifiez que tout est bien commité
git status

# Si vous avez des changements non commités, faites :
git add .
git commit -m "Ready for GitHub"

# Puis poussez
git push -u origin main
```

## Étape 4 : Authentification GitHub

Quand vous faites `git push`, GitHub vous demandera de vous authentifier :

### Option A : Personal Access Token (Recommandé)

1. Allez sur GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**
3. Donnez un nom (ex: "AdminZen Project")
4. Sélectionnez les permissions : cochez **"repo"** (toutes les permissions repo)
5. Cliquez sur **"Generate token"**
6. **COPIEZ LE TOKEN** (vous ne pourrez plus le voir après !)
7. Quand vous faites `git push`, utilisez :
   - **Username** : votre nom d'utilisateur GitHub
   - **Password** : collez le token (pas votre mot de passe GitHub)

### Option B : GitHub CLI (Plus simple)

Installez GitHub CLI :

```bash
# Sur macOS
brew install gh

# Puis authentifiez-vous
gh auth login
```

Suivez les instructions à l'écran.

### Option C : SSH (Pour les utilisateurs avancés)

1. Générez une clé SSH :
```bash
ssh-keygen -t ed25519 -C "votre-email@example.com"
```

2. Ajoutez la clé à votre agent SSH :
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

3. Copiez votre clé publique :
```bash
cat ~/.ssh/id_ed25519.pub
```

4. Allez sur GitHub → **Settings** → **SSH and GPG keys** → **New SSH key**
5. Collez votre clé publique
6. Changez le remote pour utiliser SSH :
```bash
git remote set-url origin git@github.com:VOTRE-USERNAME/adminzen.git
```

## Étape 5 : Vérifier que ça fonctionne

1. Allez sur votre repository GitHub : `https://github.com/VOTRE-USERNAME/adminzen`
2. Vous devriez voir tous vos fichiers
3. Vérifiez que le README s'affiche correctement

## 🚀 Prochaines étapes

Une fois votre code sur GitHub, vous pouvez :

1. **Déployer sur Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Importez votre repository GitHub
   - Vercel déploiera automatiquement votre site

2. **Configurer les branches** :
   - `main` : code de production
   - `develop` : code en développement (optionnel)

3. **Ajouter des collaborateurs** (si besoin) :
   - Settings → Collaborators → Add people

## 🐛 Dépannage

### Erreur : "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/VOTRE-USERNAME/adminzen.git
```

### Erreur : "authentication failed"

- Vérifiez que vous utilisez un Personal Access Token (pas votre mot de passe)
- Ou utilisez GitHub CLI : `gh auth login`

### Erreur : "repository not found"

- Vérifiez que le nom du repository est correct
- Vérifiez que vous avez les droits sur le repository
- Vérifiez que le repository existe bien sur GitHub

### Erreur : "failed to push some refs"

```bash
# Récupérez les changements distants d'abord
git pull origin main --allow-unrelated-histories

# Puis poussez
git push -u origin main
```

## 📝 Commandes Git utiles

```bash
# Voir l'état de votre repository
git status

# Voir l'historique des commits
git log

# Ajouter des fichiers
git add .

# Faire un commit
git commit -m "Description de vos changements"

# Pousser sur GitHub
git push

# Récupérer les changements
git pull
```

## 🔗 Liens utiles

- **GitHub** : [github.com](https://github.com)
- **Documentation Git** : [git-scm.com/doc](https://git-scm.com/doc)
- **GitHub Guides** : [guides.github.com](https://guides.github.com)


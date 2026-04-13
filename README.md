# SIGB Intelli - Système Intégré de Gestion Budgétaire (v1.0)

Bienvenue sur le dépôt du logiciel **SIGB Intelli**, une plateforme nouvelle génération (Next-Gen) de suivi et pilotage budgétaire, conçue pour un contrôle exhaustif des finances de l’entreprise, en conformité totale avec les normes UEMOA/SYSCOHADA.

## 🌟 Fonctionnalités Clés

Ce système modulaire couvre l'intégralité du cycle de vie des données financières avec une automatisation axée sur l'IA et l'assistance décisionnelle :

- **📊 Pilotage & Dashboard IA** : Visualisation en temps réel de votre budget, suivi multi-devises (XOF, EUR, USD), alertes intelligentes de dépassement de plafond et gestion centralisée des "Cartes Virtuelles" et licences SaaS (récurrentes).
- **📝 Préparation & Arbitrages (What-If)** : Interface d'allocation dynamique du budget avec analyse des écarts et construction du budget de l'année N+1.
- **🔄 Workflow de Dépenses (Procure-to-Pay)** : 
  - Engagements (Expression de besoins avec visas d'approbation)
  - Bons de commande et pièces de trésorerie (liquidations).
- **🔀 Gestion des DBM (Décisions Modificatives)** : Transferts automatisés et sécurisés de fonds entre vos enveloppes budgétaires.
- **🤖 Scanner IA & GED** : Dématérialisation et intégration "Drag & Drop" avec extraction Sémantique/OCR de métadonnées de factures. Génération assistée de rapports de synthèse (Trimestriels, Bailleurs de Fonds).
- **🔒 Espace Audit (Immutabilité eIDAS)** : Journal de log financier inviolable enregistrant toutes les transactions, extractions de la Cour des Comptes et stockage froid.
- **📆 Gestion des Exercices** : Mécanismes stricts pour l'ouverture, l'exécution et la clôture comptable d'un exercice donné.

## 🛠 Piste Technologique

L'application a été conçue pour offrir un maximum de performance et une expérience utilisateur "Glassmorphism" premium, ultra fluide :

- **Frontend Core** : React.js (Boosté avec Vite) et TypeScript.
- **Components & Graphismes** : Lucide React (Icônes interactives), Recharts (Graphiques).
- **Stylisation** : Vanilla CSS 3.0 avec tokens dynamiques & Thème sombre professionnel (`#0b0f19`).
- **Gestion d'État** : Mécanique Context API remplaçant efficacement une BDD SQL pour prouver l'architecture "Full Loop" des DBMs et engagements.

## 🚀 Installation & Lancement

Pré-requis : Vous devez installer [Node.js](https://nodejs.org/en/) (v16 ou +) pour compiler le code.

1. **Cloner le projet**
```bash
git clone https://github.com/mamadouelimanewane/budget.git
cd budget
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. Ouvrez `http://localhost:5173` dans votre navigateur Web pour commencer à utiliser le système et à tester les modules d'approbations et d'historique immuable.

---

### *Notes de Version*
*Version Initiale 1.0 : Intégration totale des 12 modules d'activité du cahier des charges officiel complétée des Benchmarks marchés : Payhawk, Qonto, QuickBooks.*

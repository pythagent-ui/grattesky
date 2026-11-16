# GratteSky — site vitrine (maquette statique)

Site de 3 pages (Accueil, Projets, Contact) plus une page 404, en HTML, CSS et JavaScript sans dépendance.
Ouvrez `index.html` dans un navigateur pour le consulter. Aucun serveur ni build n'est nécessaire.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : sections `HOME-01` à `HOME-07` |
| `projets.html` | Projets : section `PROJ-01`, 6 fiches `PROJ-01-1` à `PROJ-01-6`, filtre par segment |
| `contact.html` | Contact : section `CONT-01`, formulaire `FORM-01` avec états erreur et succès |
| `404.html` | Page introuvable : `P404-01` |
| `css/style.css` | Tokens et styles. Desktop 12 colonnes (marges 64, gouttière 24), mobile 4 colonnes (marges 24, gouttière 16) sous 900 px |
| `js/main.js` | Menu mobile, filtres, validation du formulaire |

Les identifiants `NAV-01`, `FOOT-01` et `LEGAL-01` (mentions légales dépliantes) sont présents sur chaque page.

## Tokens

Noir `#000000`, anthracite `#2A2A2A`, beige `#E0D0B0`, beige clair `#F3EDE0`, or `#C0A060`.
L'or sert uniquement aux filets de 1 px et aux labels sur fond sombre.
Polices : Instrument Serif (titres) et Jost 300 et 400 (corps), chargées depuis Google Fonts.
Radius 0, aucune ombre, aucun dégradé.

## Images

Aucune image n'est fournie. Chaque emplacement est un rectangle anthracite portant son identifiant (`IMG-HOME-01`, `IMG-PROJ-01.1`…), son brief et sa requête de recherche Unsplash ou Pexels.
Le texte alternatif de chaque image est dans l'attribut `aria-label` du rectangle. Remplacez le rectangle par une balise `<img>` en reprenant ce texte dans `alt`.
Les images `IMG-HOME-02`, `IMG-HOME-04.x`, `IMG-HOME-05` et `IMG-HOME-06` ne sont pas placées : la mise en page demandée n'en prévoit pas dans ces sections.

## Formulaire

Le formulaire valide les champs et affiche l'état de succès, mais il n'envoie rien. Branchez l'envoi (formulaire Webflow, service d'e-mail ou CRM) à l'endroit signalé dans `js/main.js`.
Le message d'échec d'envoi est déjà dans le HTML (`.form-error`) et n'est pas déclenché.

## Pour Webflow

Webflow n'importe pas ce dossier comme un site complet. Deux approches :
1. Recréer les sections dans Webflow en suivant les identifiants et les classes (`.sec`, `.grid`, `.btn`, `.label`…), et reprendre les variables de `:root` comme variables Webflow.
2. Coller le HTML d'une section dans un élément Embed et le CSS dans le code personnalisé du projet.

Ajoutez Instrument Serif et Jost dans les réglages de polices du projet. Ces indications n'ont pas été testées dans Webflow.

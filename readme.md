# Description
Gestion d'une modale de confirmation dans un projet React. L'exemple est pris avec un compteur qui demande une confirmation à l'utilisateur après chaque click sur un bouton d'incrementation.  
Réalisé aprés avoir suivi le superbe tutoriel de  [***Grafikart***](https://grafikart.fr/) disponible [ici](https://grafikart.fr/tutoriels/react-confirm-dialog-2101)

# Technologies utlisées
- Typescript
- Parcel
- React 
- Bootstrap

# Installation
```shell
    git clone 
    cd 
    yarn install
```
# Utilisation
Dans le dossier du projet:  
Lancer le serveur de dev *Parcel*.  par défaut l'application est accessibile dans un navigateur à l'adresse *localhost:1234*
```shell
    yarn dev
```

1. Réalisation d'une modale et d'un *overlay* avec les **Portals React**  
`<Modal/>` dans *src/components/modal/Modal.tsx*

2. gestion de l'affichage de la modale avec une variable globale  
 permet de comprendre  comment faire communiquer un composant avec une variable globale pour la récupérer plus tard dans un autre composant, notamment grâce à l'utilisation  de ***useRef***.  
`<ConfirmGlobal/>` dans *src/components/confirmGlbal/ConfirmGlobalModal.tsx*

3. gestion d'une modale grâce aux *Contexts* et au hook ***useContext*** de **React**, utilisation dans les autres composants de l'application en Utilisant le provider `<ConfirmProvider><App/><ConfirmProvider/>`.  
Accéder aux actions de la modale grâce à un *custom hook* ***useConfirm*** . le code est disponible dans  *src/contexts/confirmationModalContext.tsx*

# Ressources
- le tutoriel de [***Grafikart***](https://grafikart.fr/tutoriels/react-confirm-dialog-2101)
- documentation sur les Portails React: [react portals](https://fr.reactjs.org/docs/portals.html)
- les differents hooks utilisés: [hook references](https://fr.reactjs.org/docs/hooks-reference.html)
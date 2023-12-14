# VueJS Assignment

Access the assignment instructions here : https://cours-dev-web-tp-4-vuejs-emse1-f11010b1a5df843e150e5ab5a0cc100b.gitlab.io/instructions/TP_instructions.html

# VueJS_JoeyLouis_ErwinMartin
Rendu du Vue.js pour le 12 janvier 2024 de Joey LOUIS et Erwin MARTIN

# Back-end
Nous avons utiliser le back-end de Guillaume Ehret pour ce projet. Je pense que vous devez déjà y avoir accés. Si ce n'est pas le cas, envoyé lui votre compte Git, et il vous ajoutera.

Grossièrement, voici les requêtes que nous avons utilisé :

- PATCH : ${API_HOST}/api/windows/${this.window.id}/switch / CHANGER D'ETAT
- DELETE : ${API_HOST}/api/windows/${this.window.id} / SUPPRIMER
- GET : ${API_HOST}/api/windows / RECUPERER
- POST : ${API_HOST}/api/windows / AJOUTER

# Run Docker

Installer docker sur son PC,
puis, se mettre dans la racine du projet :

docker build -t <nom-image> .
docker run -d -p <port>:80 <nom-image>


# project-web-service

Voici notre projet représentant une plateforme afin de montrer tous les employés d'une entreprise avec toutes ses informations dont son nom, son prénom, son poste, son service, le lieu de travail et sa description personnelle. 

La ligne de commande pour lancer la BDD : java -cp ../lib/hsqldb.jar org.hsqldb.server.Server --database.0 file.mydb --dbname.0 test

Et pour ouvrir la DATABASE : java -cp hsqldb.jar org.hsqldb.util.DatabaseManagerSwing

Ses 2 commandes à executer en étant dans le dossier du projet.

Nous sommes un duo composé de XU Thierry et Vidrequin Josué. 

Également, notre code se trouve dans la branche 'master' et non dans le 'main'. 

- Nous avons ajouté 2 entitées donc désormais, nous en avons trois qui sont liées en One-To-Many avec Pays et Entreprise.
Entreprise qui est relié avec Personne et Pays qui est relié avec Entreprise.
Nous avons essayé de relié la base idPays avec la table Entreprise mais nous avons pas réussi dû à un manque de temps. 
Donc, nous n'avons par conséquent pas réussi non plus avec Personne et Entreprise.

Nous avons également ajoutés une entité Utilisateur pour la connexion, qui est quant à elle, indépendante.

Le schéma est présenté en pièce-jointe dans le mail envoyé. 

Voici la liste exhaustive des fonctionnalités : 

- Inscription / Connexion d'un utilisateur 
  - Connexion avec confirmation de mot de passe (Reset la page si ce n'est pas le même mot de passe)
  - Mot de passe "caché"

- Personnes : 
  - Créer une personne 
  - Rechercher une personne avec les critères qu'ils possèdent
  - Supprimer une personne
  - Modifier les données d'une personne
 
- Entreprise : 
  - Créer une entreprise (ayant un problème avec l'idPays, on peut créer une entreprise en inscrivant l'ID du pays manuellement)
  - Modifier une entreprise
  - Rechercher une entreprise
  - Supprimer une entreprise
  
- Pays : 
  - Créer un pays




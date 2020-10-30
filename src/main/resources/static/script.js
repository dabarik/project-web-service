$(document).ready(function () {

    //Fonction qui va afficher le tableau des employes avec la possibilite de modifier leur contenu ou de supprimer
    function refresh(){
        $.ajax({
            url : "http://localhost:8081/search",
            type : "GET",
            success : function(data){
            //Réinitialise la div '#personnes' afin de ne pas ajouter à chaque fois qu'on appelle refresh(), un autre tableau d'employes
            var divSearch = document.getElementById("personnes");
            divSearch.innerHTML = '';
            console.log(data);
            data.forEach((item, index) => {
                //Appel de fonction createPersonne avec en parametre TOUS les objets personnes dans ma BDD
                createPersonne(item);
          })
        }
    })}

    refresh();


    $("#valider").click(function() {
        //Reprends le contenu de chaque attribut de la BDD afin qu'il ne réecrit pas toutes ses informations
        var service = $("#service").val();
        var poste = $("#poste").val();
        var nom = $("#nom").val();
        var prenom = $("#prenom").val();
        var lieu = $("#lieu").val();
        var description = $("#description").val();

        $.ajax({
            url : "http://localhost:8081/create/" + service + "/" + poste + "/" + nom + "/" + prenom + "/" + lieu + "/" + description,
            type : "POST",
            success : function(data) {
                window.location.href = 'http://localhost:8081/home.html';
            }
        })
    })


    function modifier(data){
        $.ajax({
            url : "http://localhost:8081/pers/" + data.id,
            success : function(data){
                $('#service').val(data.service);
                $('#poste').val(data.poste);
                $('#nom').val(data.nom);
                $('#prenom').val(data.prenom);
                $('#lieu').val(data.lieu);

                $('#tableauPersonne').hide();
                $('#rechercher').hide();

                var menu = document.getElementById('menu');

                var desc = document.createElement('p');
                desc.innerHTML = '<input class="form-control form-control-sm" id= "description"type="text" placeholder="Description">';
                menu.appendChild(desc);
                $('#description').val(data.description);

                var bouton = document.getElementById('bouton');

                var button = document.createElement('p');
                button.innerHTML = '<td id="'+ data.id +'"><button type="button" class="btn btn-warning btn-rounded mt-4">Modifier</button></td>';
                bouton.appendChild(button);

                button.addEventListener('click', function() {
                    var service = $('#service').val();
                    var poste = $('#poste').val();
                    var nom = $('#nom').val();
                    var prenom = $('#prenom').val();
                    var lieu = $('#lieu').val();
                    var description = $('#description').val();
                    $.ajax({
                        url : "http://localhost:8081/update/"+ data.id + "/" + service + "/" + poste + "/" + nom + "/" + prenom + "/" + lieu + "/" + description,
                        type : "PUT",
                        success : function(data){
                            window.location = 'http://localhost:8081/home.html';
                        }
                    })
                })

            }
        })
    }

    $("#rechercher").click(function() {
        $.ajax({
            url : "http://localhost:8081/search",
            type : "GET",
            success : function(data){
                var service = $("#service").val();
                var poste = $("#poste").val();
                var nom = $("#nom").val();
                var prenom = $("#prenom").val();
                var lieu = $("#lieu").val();

                var divSearch = document.getElementById("personnes");
                divSearch.innerHTML = '';

                data.forEach((item, index) => {
                    if (item.service == service || item.poste == poste || item.nom == nom || item.prenom == prenom || item.lieu == lieu){
                       createPersonne(item);
                    } else if(service == '' && poste == '' && nom == '' && prenom == '' && lieu == ''){
                        refresh();
                    }
                })
                document.getElementById('service').value = '';
                document.getElementById('poste').value = '';
                document.getElementById('nom').value = '';
                document.getElementById('prenom').value = '';
                document.getElementById('lieu').value = '';
            }
        })
    })

    function createPersonne(item){
        $.ajax({
            url : 'http://localhost:8081/pers/' + item.id,
            success : function(item){
                var divSearch = document.getElementById("personnes");

                var tr = document.createElement("tr");
                divSearch.appendChild(tr);

                document.getElementById('service');

                var th = document.createElement("th");
                th.innerHTML = '<th scope="row">' + item.id + '</th>';
                tr.appendChild(th);

                var tdNom = document.createElement("td");
                tdNom.innerHTML = '<td>' + item.nom + '</td>';
                tr.appendChild(tdNom);

                var tdPrenom = document.createElement("td");
                tdPrenom.innerHTML = item.prenom;
                tr.appendChild(tdPrenom);

                var tdService = document.createElement("td");
                tdService.innerHTML = item.service;
                tr.appendChild(tdService);

                var tdPoste = document.createElement("td");
                tdPoste.innerHTML = item.poste;
                tr.appendChild(tdPoste);

                var tdLieu = document.createElement("td");
                tdLieu.innerHTML = item.lieu;
                tr.appendChild(tdLieu);

                var tdModif = document.createElement("td");
                tdModif.innerHTML = '<td><button type="button" class="btn btn-warning btn-rounded">Modifier</button></td>';
                tr.appendChild(tdModif);
                tdModif.addEventListener('click', function(){
                    $.ajax({
                        url : 'http://localhost:8081/pers/' + item.id,
                        success : function(data){
                            modifier(data);
                        }
                    })
                })

                var tdSupp = document.createElement("td");
                tdSupp.innerHTML = '<td><button type="button" class="btn btn-danger btn-rounded">Supprimer</button></td>';
                tr.appendChild(tdSupp);

                tdSupp.addEventListener('click', function(){
                    $.ajax({
                        url : 'http://localhost:8081/delete/' + item.id,
                        type : 'DELETE',
                        success : function(data){
                            refresh();
                        }
                    })
                })

                var tdDescription = document.createElement("td");
                tdDescription.innerHTML = '<td><i id="description "class="fas fa-angle-right" style="margin-top:25px;"></i></td>';
                tr.appendChild(tdDescription);

                tdDescription.addEventListener('click', function(){
                    var trDescription = document.createElement("td");
                    trDescription.innerHTML = item.description;
                    tr.appendChild(trDescription);
                })
            }
        })
    }
})

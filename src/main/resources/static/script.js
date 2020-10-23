$(document).ready(function () {

    function refresh(){
        $.ajax({
            url : "http://localhost:8081/search",
            type : "GET",
            success : function(data){
            var divSearch = document.getElementById("personnes");
            divSearch.innerHTML = '';

            data.forEach((item, index) => {

            var tr = document.createElement("tr");
            divSearch.appendChild(tr);

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
            tdModif.innerHTML = '<td id="'+ item.id + '"><button type="button" class="btn btn-warning btn-rounded">Modifier</button></td>';
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
          })
        }
    })}

    refresh();

    $("#valider").click(function() {
        var service = $("#service").val();
        var poste = $("#poste").val();
        var nom = $("#nom").val();
        var prenom = $("#prenom").val();
        var lieu = $("#lieu").val();

        $.ajax({
            url : "http://localhost:8081/create/" + service + "/" + poste + "/" + nom + "/" + prenom + "/" + lieu,
            type : "POST",
            success : function(data) {
                window.location.href = 'http://localhost:8081/home.html';
            }
        })
    })

    $("#modifier").click(function() {
        var service = $("#service").val();
        var poste = $("#poste").val();
        var nom = $("#nom").val();
        var prenom = $("#prenom").val();
        var lieu = $("#lieu").val();

        $.ajax({
            url : "http://localhost:8081/pers/9",
            type : "GET",
            success : function(data) {

                var divPers = document.getElementById('pers');
                var a = document.createElement('a');
                a.innerHTML = data;
                divPers.appendChild(a);

                console.log(data);

                a.addEventListener('click', function(){
                    $.ajax({
                        url: "http://localhost:8081/9/" + service + "/" + poste + "/" + nom + "/" + prenom + "/" + lieu,
                        type : "PUT",
                        success: function (results) {
                        }
                    });
                })
            }
        })
    })

    function modifier(data){
        $.ajax({
            url : "http://localhost:8081/pers/" + data.id,
            success : function(data){

                document.getElementById('service').value = data.service;
                document.getElementById('poste').value = data.poste;
                document.getElementById('nom').value = data.nom;
                document.getElementById('prenom').value = data.prenom;
                document.getElementById('lieu').value = data.lieu;

                $('#tableauPersonne').hide();
                $('#rechercher').hide();

                var bouton = document.getElementById('bouton');

                var button = document.createElement('p');
                button.innerHTML = '<td id="'+ data.id +'"><button type="button" class="btn btn-warning btn-rounded mt-4">Modifier</button></td>';
                bouton.appendChild(button);
                button.addEventListener('click', function() {
                    $.ajax({
                        url : "http://localhost:8081/update/"+ data.id + "/" + document.getElementById('service').value + "/" + document.getElementById('poste').value + "/" + document.getElementById('nom').value + "/" + document.getElementById('prenom').value + "/" + document.getElementById('lieu').value,
                        type : "PUT",
                        success : function(data){
                            window.location = 'http://localhost:8081/home.html';
                        }
                    })
                })

            }
        })
    }

    $("#recup").click(function(){
        $.ajax({
            url : "http://localhost:8081/pers/9",
            type : "GET",
            success : function(data){
                var divPers = document.getElementById('pers');

                var p = document.createElement('p');
                p.innerHTML = data.nom;
                divPers.appendChild(p);
            }
        })
    })

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
                       var tr = document.createElement("tr");
                       divSearch.appendChild(tr);

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
                           modifier(item);
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
})

$(document).ready(function () {

    function refresh(){
        $.ajax({
            url : "http://localhost:8081/searchEtp",
            type : "GET",
            success : function(data){
            var divSearch = document.getElementById("entreprises");
            divSearch.innerHTML = '';
            data.forEach((item, index) => {
                //Appel de fonction createPersonne avec en parametre TOUS les objets personnes dans ma BDD
                createEntreprise(item);
              })
            }
        })
    }

    refresh();

    //Creation entreprise fonctionne mais avec un pays_id à la main parce que j'ai voulu tester de faire une liaison qui n'a pas fonctionne
    $("#validerEntreprise").click(function() {
        //Reprends le contenu de chaque attribut de la BDD afin qu'il ne réecrit pas toutes ses informations
        var nom = $("#nom").val();
        var lieu = $("#lieu").val();
        var SIRET = $("#SIRET").val();
        var pays_id = find_paysId();
        console.log(pays_id)

        $.ajax({
            url : "http://localhost:8081/createEtp/" + SIRET + "/" + lieu + "/" + nom + "/"+ pays_id,
            type : "POST",
            success : function(data) {
                window.location.href = 'http://localhost:8081/entreprise.html';
            }
        })
    })

    $("#choix1").click(function() {
        window.location.href = 'http://localhost:8081/home.html';
    })

    function modifier(data){
        $.ajax({
            url : "http://localhost:8081/etp/" + data.id,
            success : function(data){
                $('#SIRET').val(data.siret);
                $('#nom').val(data.nom);
                $('#lieu').val(data.lieu);

                $('#tableauEntreprise').hide();
                $('#rechercher').hide();

                var bouton = document.getElementById('bouton');

                var button = document.createElement('p');
                button.innerHTML = '<td id="'+ data.id +'"><button type="button" class="btn btn-warning btn-rounded mt-4">Modifier</button></td>';
                bouton.appendChild(button);

                button.addEventListener('click', function() {
                    var SIRET = $('#SIRET').val();
                    var nom = $('#nom').val();
                    var lieu = $('#lieu').val();
                    $.ajax({
                        url : "http://localhost:8081/updateEtp/"+ data.id + "/" + SIRET + "/" + nom + "/" + lieu,
                        type : "PUT",
                        success : function(data){
                            window.location = 'http://localhost:8081/entreprise.html';
                        }
                    })
                })

            }
        })
    }

    $("#rechercher").click(function() {
        $.ajax({
            url : "http://localhost:8081/searchEtp",
            type : "GET",
            success : function(data){
                var SIRET = $("#SIRET").val();
                var nom = $("#nom").val();
                var lieu = $("#lieu").val();

                var divSearch = document.getElementById("entreprises");
                divSearch.innerHTML = '';

                data.forEach((item, index) => {
                    if (item.siret == SIRET || item.nom == nom || item.lieu == lieu){
                       createEntreprise(item);
                    } else if(SIRET == '' && nom == '' && lieu == ''){
                        refresh();
                    }
                })
                document.getElementById('SIRET').value = '';
                document.getElementById('nom').value = '';
                document.getElementById('lieu').value = '';
            }
        })
    })

    function createEntreprise(item){
        $.ajax({
            url : 'http://localhost:8081/etp/' + item.id,
            success : function(item){
                var divSearch = document.getElementById("entreprises");

                var tr = document.createElement("tr");
                divSearch.appendChild(tr);

                var th = document.createElement("th");
                th.innerHTML = '<th scope="row">' + item.id + '</th>';
                tr.appendChild(th);

                var tdSIRET = document.createElement("td");
                tdSIRET.innerHTML = '<td>' + item.siret + '</td>';
                tr.appendChild(tdSIRET);

                var tdLieu = document.createElement("td");
                tdLieu.innerHTML = item.lieu;
                tr.appendChild(tdLieu);

                var tdNom = document.createElement("td");
                tdNom.innerHTML = item.nom;
                tr.appendChild(tdNom);

                var tdModif = document.createElement("td");
                tdModif.innerHTML = '<td><button type="button" class="btn btn-warning btn-rounded">Modifier</button></td>';
                tr.appendChild(tdModif);
                tdModif.addEventListener('click', function(){
                    $.ajax({
                        url : 'http://localhost:8081/etp/' + item.id,
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
                        url : 'http://localhost:8081/deleteEtp/' + item.id,
                        type : 'DELETE',
                        success : function(data){
                            refresh();
                        }
                    })
                })
            }
        })
    }

    //Fonction qui va afficher tous les pays dans la BDD 'pays' dans une liste deroulante
    $('#paysChoix').focus(function() {
        $.ajax({
            url : 'http://localhost:8081/searchPays',
            type : 'GET',
            success : function(data){
            var paysChoix = document.getElementById('paysChoix');

            paysChoix.innerHTML= '';
            console.log(data);
                data.forEach((item, index) => {
                    var paysChoix = document.getElementById('paysChoix');

                    var option = document.createElement('option');
                    option.value = item.idPays;
                    option.text = item.nom;
                    paysChoix.appendChild(option);

                })
            }
        })
    })

    // Affiche l'ID de pays mais je n'arrive pas à le récuperer
    $('select').on('change', function() {
        alert( this.value);
    })

})



$(document).ready(function () {

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
                $.ajax({
                    url : "http://localhost:8081/search",
                    success : function(data){}
                })
            }
        })
    })

    $("#BDD").click(function() {
        $.ajax({
            url : "http://localhost:8081/res/personnes/search",
            type : "GET",
            success : function(data) {
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
})


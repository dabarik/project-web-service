$(document).ready(function () {

    $("#inscription").click(function() {
        //Reprends le contenu de chaque attribut de la BDD afin qu'il ne réecrit pas toutes ses informations
        var nom = $("#nom").val();
        var prenom = $("#prenom").val();
        var mail = $("#mail").val();
        var mdp = $("#mdp").val();
        var confirmMdp = $("#confirmMdp").val();

        if(mdp == confirmMdp){
            $.ajax({
                url : "http://localhost:8081/createUser/" + nom + "/" + prenom + "/" + mail + "/" + mdp,
                type : "POST",
                success : function(data) {
                    alert('Votre connexion est terminé ! Vous pouvez vous connecter');
                    window.location.href = 'http://localhost:8081/connexion.html';
                }
            })
        }else{
            alert('Mot de passe différents, veuillez réessayez.');
            $('#mdp')[0].value = '';
            $('#confirmMdp')[0].value = '';
        }
    })

    $('#connecter').click(function() {
        $.ajax({
            url : "http://localhost:8081/user/search",
            success : function(data){
                var mail = $("#mail").val();
                var mdp = $("#mdp").val();

                data.forEach((item, index) => {
                    if(item.mail == mail && item.mdp == mdp){
                        window.location.href = 'http://localhost:8081/home.html';
                        alert('Vous êtes bien connectes ! Bienvenue à vous ' + item.nom + ' ' + item.prenom);
                    }else{
                        $('#mdp')[0].value = '';
                    }
                })
            }
        })
    })
})
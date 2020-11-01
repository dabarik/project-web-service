$(document).ready(function () {

    $("#validerPays").click(function() {
        var nomPays = $("#nomPays").val();
        $.ajax({
            url : "http://localhost:8081/createPays/" + nomPays,
            type : "POST",
            success : function(data) {
                window.location.href = 'http://localhost:8081/entreprise.html';
            }
        })
    })


})
$(document).ready(function () {

    function refresh() {}



    $("#search").click(function() {
        var nom = $("#Nom").val();
        $.ajax({
            url : "http://localhost:8081/res/personnes/search",
            type : "GET",
            success : function(data) {
                console.log(data);
            }
        })
    })


})


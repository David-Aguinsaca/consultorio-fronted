$(document).ready(function () {
    
    const HOST = 'https://localhost:7240';

    //mostrar asegurados
    $.ajax({
        url: HOST+"/api/SureInsured/GetSureInsured",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (resp) {
            console.log(resp.data);

            $('#table-sure-insured').DataTable({
                data: resp.data,
                columns: [
                    { data: "identification" },
                    { data: "nameInsured" },
                    { data: "code" },
                    { data: "nameSure" }
                ]
            });
        },
        error: function (error) {
            console.log("Error al cargar los datos: " + error);
        }
    });
});
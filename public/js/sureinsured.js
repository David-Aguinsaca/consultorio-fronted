$(document).ready(function () {

    const HOST = 'https://localhost:7240';

    //mostrar asegurados
    $.ajax({
        url: HOST + "/api/Insured/GetInsured",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (resp) {
            console.log(resp.data);
            var select = $('#select-insured');

            // Recorre los datos y agrega las opciones al select
            $.each(resp.data, function (index, item) {
                select.append($('<option>', {
                    value: item.idinsured,
                    text: item.name
                }));
            });

        },
        error: function (error) {
            console.log("Error al cargar los datos: " + error);
        }
    });

    //mostrar seguros
    $.ajax({
        url: HOST + "/api/Sure/GetSure",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (resp) {
            resp.data.forEach(function (parametro) {
                var checkboxDiv = $('<div class= "checkbox-item">');
                var checkbox = $('<input>').attr({
                    type: 'checkbox',
                    id: parametro.idsure,
                    name: 'sures[]',
                    value: parametro.idsure,
                    class: 'check-box-sures'
                });
                var label = $('<label>').attr('for', parametro.idsure).text(parametro.name);

                checkboxDiv.append(checkbox).append(label);
                $('#checkboxContainer').append(checkboxDiv);
            });
        },
        error: function (error) {
            console.log("Error al cargar los datos: " + error);
        }
    });

    //asignar seguros
    $('#div-btn-save').click(function (event) {
        event.preventDefault();
        var checkboxes = $('input[name="sures[]"]:checked')
            .map(function () {
                return $(this).val();
            })
            .get();

        var selectValue = $('#select-insured').val();

        var datos = {
            idsure: checkboxes,
            idinsured: selectValue
        };

        console.log(datos);

        $.ajax({
            type: 'POST',
            url: HOST+'/api/SureInsured/SaveSureInsured',
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {
                Swal.fire('Cambios guardados!').then((result) => {
                    location.reload();
                });
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });

    });

    $('#select-insured').on('change', function () {
        var id = $(this).val(); 
        selectcheckbox(id)
    });

    function selectcheckbox(selectValue) {

        $('.check-box-sures').prop('checked', false);

        $.ajax({
            url: HOST + "/api/SureInsured/GetSureInsured/" + selectValue,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: function (resp) {

                $('input[type="checkbox"]').each(function () {
                    resp.data.forEach(el => {
                        if (this.id == el.idsure) {
                            $(this).prop('checked', true); // Marcar el checkbox
                        }
                    });
                });
            },
            error: function (error) {
                console.log("Error al cargar los datos: " + error);
            }
        });

    }
});
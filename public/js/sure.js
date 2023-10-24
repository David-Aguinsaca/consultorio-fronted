$(document).ready(function () {

    const HOST = 'https://localhost:7240';
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
            console.log(resp.data);

            $('#table-sure').DataTable({
                data: resp.data,
                columns: [
                    { data: "name" },
                    { data: "code" },
                    { data: "sumassured" },
                    { data: "prima" },
                    // Columna Editar
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button class="btn-edit btn btn-info" data-id="' + data.idsure + '">Editar</button>';
                        }
                    },
                    // Columna Eliminar
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button class="btn btn-danger btn-delete" data-id="' + data.idsure + '" >Eliminar</button>';
                        }
                    }
                ]
            });
        },
        error: function (error) {
            console.log("Error al cargar los datos: " + error);
        }
    });

    //crear seguros
    $('#btn-create-sure').click(function (event) {
        event.preventDefault();
        var formData = {
            identification: $("#identification").val(),
            name: $("#name").val(),
            code: $("#code").val(),
            sumassured: $("#sumassured").val(),
            prima: $("#prima").val()
        };

        $.ajax({
            type: 'POST',
            url: HOST + "/api/Sure/CreateSure",
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function (response) {
                location.reload();
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    //eliminar
    $('#table-sure tbody').on('click', '.btn-delete', function () {
        var id = $(this).data('id');
        Swal.fire({
            title: "Estas a punto de eliminar",
            text: "¿Seguro quieres eliminar seguro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: HOST + "/api/Sure/DeleteSure?Idsure=" + id,
                    type: "DELETE",
                    success: function () {
                        location.reload();
                    },
                    error: function () {
                        alert("No se pudo eliminar el registro.");
                    }
                });
            }
        })
    });

    //traer datos del seguro
    $('#table-sure').on('click', '.btn-edit', function () {
        var id = $(this).data('id');

        $('#div-btn-save').hide();
        $('#div-btn-edit').css('display', 'block');

        $('#btn-edit-sure').attr('data-id', id);

        $.ajax({
            url: HOST + "/api/Sure/GetSure/" + id,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: function (resp) {
                $('#code').val(resp.data.code)
                $('#name').val(resp.data.name)
                $('#sumassured').val(resp.data.sumassured)
                $('#prima').val(resp.data.prima)
            },
            error: function (error) {
                console.log("Error al cargar los datos: " + error);
            }
        });
    });

    //editar
    $('#btn-edit-sure').click(function (event) {
        var id = $(this).data('id');
        event.preventDefault();

        var formData = {
            identification: $("#identification").val(),
            name: $("#name").val(),
            code: $("#code").val(),
            sumassured: $("#sumassured").val(),
            prima: $("#prima").val()
        };

        $.ajax({
            url: HOST + "/api/Sure/UpdateSure/" + id,
            type: 'PUT', // Método PUT
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function (response) {
                Swal.fire('Datos actualizados!').then((result) => {
                    location.reload();
                });
            },
            error: function (error) {
                // Maneja los errores de la solicitud
                console.error('Error: ', error);
            }
        });

    });

    $('#btn-cancel').click(function (event) {
        event.preventDefault();
        location.reload();
    });

});
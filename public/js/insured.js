$(document).ready(function () {

    const HOST = 'https://localhost:7240';

    //crear asegurados
    $('#btn-save-form').click(function (event) {
        event.preventDefault();
        var formData = {
            identification: $("#identification").val(),
            name: $("#name").val(),
            phone: $("#phone").val(),
            age: $("#age").val()
        };

        $.ajax({
            type: 'POST',
            url: HOST + '/api/Insured/CreateInsured',
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

            $('#table-insured').DataTable({
                data: resp.data,
                columns: [
                    { data: "identification" },
                    { data: "name" },
                    { data: "phone" },
                    { data: "age" },
                    // Columna Editar
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button class="btn-edit btn btn-info" data-id="' + data.idinsured + '">Editar</button>';
                        }
                    },
                    // Columna Eliminar
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button class="btn btn-danger btn-delete" data-id="' + data.idinsured + '" >Eliminar</button>';
                        }
                    }
                ],
                columnDefs: [
                    {
                        "targets": [4],
                        "orderable": false,
                        "searchable": false,
                    },
                    {
                        "targets": [5],
                        "orderable": false,
                        "searchable": false,
                    }
                ]
            });
        },
        error: function (error) {
            console.log("Error al cargar los datos: " + error);
        }
    });

    //eliminar
    $('#table-insured tbody').on('click', '.btn-delete', function () {
        var id = $(this).data('id');
        Swal.fire({
            title: "Estas a punto de eliminar",
            text: "¿Seguro quieres eliminar el asegurado?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: HOST + "/api/Insured/DeleteInsured?IdInsured=" + id,
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

    //traer datos del usuario
    $('#table-insured').on('click', '.btn-edit', function () {
        var id = $(this).data('id');

        $('#div-btn-save').hide();
        $('#div-btn-edit').css('display', 'block');

        $('#btn-edit-form').attr('data-id', id);

        $.ajax({
            url: HOST + "/api/Insured/GetInsured/" + id + "",
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: function (resp) {
                $('#identification').val(resp.data.identification)
                $('#name').val(resp.data.name)
                $('#phone').val(resp.data.phone)
                $('#age').val(resp.data.age)
            },
            error: function (error) {
                console.log("Error al cargar los datos: " + error);
            }
        });
    });

    //editar
    $('#btn-edit-form').click(function (event) {
        var id = $(this).data('id');
        event.preventDefault();
        var formData = {
            identification: $("#identification").val(),
            name: $("#name").val(),
            phone: $("#phone").val(),
            age: $("#age").val()
        };

        $.ajax({
            url: HOST + "/api/Insured/UpdateInsured/" + id + "",
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

    $('#formFileMultiple').MultiFile({
        accept: 'xlsx|txt|xlsm|xlsb|xltx',
        list: '#demo1-list'
    });


});
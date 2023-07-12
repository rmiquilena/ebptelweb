window.addEventListener('load', function () {

    var oTable = $('#table_rangos').dataTable({
        processing: true,
        responsive: true,
        order: [[ 0, "desc" ]],
        dom: 'Blfrtip',
        pageLength: 5,
        bLengthChange: false,
        buttons: [ 'excel'],
        buttons: [
            { extend: 'excelHtml5', title: 'Listados General de Rangos', className: 'btn btn-default btn-sm'  },
            { extend: 'pdfHtml5', title: 'Listados General de Rangos', className: 'btn btn-default btn-sm', orientation: 'landscape', pageSize: 'A4',  exportOptions: { columns: [2,3,4,5,6,7] }},
            { extend: 'print', title: 'Listados General de Rangos', className: 'btn btn-default btn-sm' }
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
    });

    fetch('list/',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'X-CSRFToken': $("[name='csrfmiddlewaretoken']").val()
        }
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                oTable.fnClearTable();                
                data.forEach(val => {

                    baseEdit = '/productos/update/'+val.id+'/'
                    baseDele = '/productos/delete/'+val.id+'/'
                    button="<div class='btn-group open'><button type='button' class='btn btn-info dropdown-toggle btn-xs' data-bs-toggle='dropdown' aria-expanded='false' type='button' id='dropdownEdit'>Acciones &nbsp;</button><ul class='dropdown-menu dropdown-menu-right' aria-labelledby='dropdownEdit'><li><a class='dropdown-item  dropdown-content' href='#' onclick='abrir_modal(\""+baseEdit+"\",\"#productosEdit\"\);'><i class='far fa-edit'></i>&nbsp; Editar</a></li><li><a class='dropdown-item dropdown-content' href='#' onclick='abrir_modal(\""+baseDele+"\",\"#productosdele\"\)'><i class='far fa-trash-alt'></i>&nbsp; Borrar</a></li></ul></div>"

                    oTable.fnAddData([
                        val.id,
                        button,
                        val.nombre,
                        val.codigo,
                    ])
                })
            })
        }
    })
});

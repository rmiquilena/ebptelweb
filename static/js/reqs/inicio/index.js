/* ########### LIST DE INICIO ###########*/

window.addEventListener('load', function () { 

    let id = document.getElementById('Idusuario').value;

    if(this.sessionStorage.getItem("empr") === null){

        load(id)

    }else{

        let data = JSON.parse(sessionStorage.getItem('empr'));
        document.getElementById('NEmpresa').innerHTML = data.nombre
        document.getElementById('IdEmpresa').value = data.id
    }
})

//########################################################

function load(id) {

    if(typeof id == 'undefined'){
        id = document.getElementById('Idusuario').value;
    }

    fetch('search/'+id)
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                if(data.length >= 1){
                    document.getElementById('btoempresa').style.display = "none";
                    document.getElementById('IdEmpresas').style.display = "block";
                    let select = $('#IdEmpresas')
                    select.empty().append('<option selected value="0" >---------</option>')
                    data.forEach(val => {
                        select.append('<option value="' + val.id + '">' + val.empresa + '</option>')
                    })
                    $('#InicioModal').modal('show');
                }else{
                    document.getElementById('Mnsjerror').innerHTML = 'Debe Registrar una Empresa';
                    document.getElementById('btoempresa').style.display = "block";
                    document.getElementById('btocerrar').style.display = "none";
                    $('#InicioModal').modal('show');
                }
            })
        } 
    })
    .catch(err => console.log(err))
    
}

let emp = document.getElementById("IdEmpresas");
emp.addEventListener("change", function() {

    let selec = emp.options[emp.selectedIndex].text;
    let selecId = emp.value;

    document.getElementById('NEmpresa').innerHTML = selec
    document.getElementById('IdEmpresa').value = selecId

    const empr = {
        id: selecId,
        nombre: selec,
    }

    window.sessionStorage.setItem('empr',JSON.stringify(empr));  


    $('#InicioModal').modal('hide');
})


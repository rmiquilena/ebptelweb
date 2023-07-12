const btn = document.getElementById('btologin')

if (btn) {
    // Not called
    btn.addEventListener('click', () => {
        
        var vacio  = "Debe llenar el campo vacio";
        var enviar = true;

        if(!validar_campo('password', 'Contraseña Empleado', vacio))enviar=false;
        
        if (enviar === true) {
            let forms = document.getElementById('formlogin');
            forms.submit();
        }
    })
}   

var checkbox = document.getElementById('defaultCheck1');
    checkbox.addEventListener("change", validaCheckbox, false);
 
        function validaCheckbox(){
        var checked = checkbox.checked;
        if(checked){
            document.getElementById('idop').style.display = "none";
            document.getElementById('email').style.display = "block";
        }else{
            document.getElementById('idop').style.display = "block";
            document.getElementById('email').style.display = "none";
        }
    }
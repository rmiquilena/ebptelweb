toastr.options = {
    "closeButton": "True",
    "debug": "false",
    "newestOnTop": "false",
    "progressBar": "True",
    "positionClass": "toast-top-right",
    "preventDuplicates": "false",
    "onclick": "null",
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function notification(title, aviso, type) {
    Swal.fire({
        width: 500,
        icon:  type,
        title: title,
        text: aviso,
		confirmButtonColor: '#3085d6',
        allowOutsideClick: false
    })
}

function notificationConfirm(title, aviso, type) {
    Swal.fire({
        width: 500,
        icon:  type,
        title: title,
		showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
        customClass: {
            confirmButton: 'order-2',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(aviso, '', 'success')
            setTimeout(document.location.reload(), 10000);
        }
    })
}

function uniqueId (prefix, campoid, campona) {
    var idCounter = 0
    var id = ++idCounter + ''
    document.getElementById(campoid).value = prefix ? prefix + id : id
    document.getElementById(campona).innerHTML = prefix ? prefix + id : id

}

function valinput(s,i,l)
{   
    //EXAMPLE onkeyup="valinput(this,1);

	if (i===0) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\s]/;	// 0 Solo acepta letras
	if (i===1) patron = /[0123456789,.%]/;			// 1 Solo acepta n�meros
	if (i===2) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]/;			// 2 Acepta n�meros y letras
	if (i==3) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789��������������\s]/;
	if (i===4) patron=  /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz��������������\s]/;
	if (i===5) patron=  /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-]/;
	if (i===6) patron=  /[ABCDEFabcdef0123456789]/;
	if (i===7) patron = /[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789��������������()@:;_\-.,/]/;
	if (i===8) patron = /[01]/;
	if (i===9) patron = /[GJV0123456789]/;
	if (i===10)patron = /[0123456789]/;
	if (i===11)patron = /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789. %()_-]/;
	if (i===12)patron = /[gjveGJVE0123456789]/;	//RIF
	if (i===13)patron = /[0123456789.]/;
	if (i===14)patron = /[0123456789/]/; //fecha
	if (i===15)patron = /[123456789/]/;
	//if (i==16) patron = /[¬ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_-.]/;

	r="";
	ll=0;
	for (i=0;i<s.value.length;i++)
	{
		if (patron.test(s.value.charAt(i)))
		{
			r=r+s.value.charAt(i);
			ll++;
			if (ll==l) break;
		}
	}

	return s.value=r;
}

function val_email(obj_origen){

    //expresion regular
//    var b=/^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //comentar la siguiente linea si no se desea que aparezca el alert()//alert("Email " + (b.test(txt)?"":"no ") + "válido.");
     if (obj_origen === ''){
        var msj = "Formato del Correo Electrónico inválido.";
        notification('¡Algo salió mal!', msj, 'error');
     }
     else if (b.test(obj_origen)===false)
     {
        msj = "Formato del Correo Electrónico inválido.";
        notification('¡Algo salió mal!', msj, 'error');
        //
     }
     /*else
     {
        //document.getElementById(id_destino).innerHTML='Su direccion de Correo no igual a la Registrada. Verifque';
        document.getElementById(id_destino).innerHTML='';
     }*/
    return b.test(obj_origen);//devuelve verdadero si validacion OK, y falso en caso contrario
}

function entero(e) {
    var tecla;
    tecla = (document.all) ? e.keyCode : e.which;
    if(tecla === 8 || e.which === 0)
    {
        return true;
    }
    var patron;
    //patron = /[abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUV WXYZ0123456789]/
    //patron = /\d/; //solo acepta numeros, mejor dicho, no acepta digitos (letras)
    patron = /[0-9]/; //solo acepta numeros
    var te;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function abrir_modal(url, modal){
    
    $(modal).load(url, function(){
        $(this).modal('show');
    });
}

function cerrar_modal(url, modal){
    $(modal).load(url, function(){
        $(this).modal('hide');
    });
}
function activarButon(){
    if($('#btonCrear').prop('disabled')){
        $('#btonCrear').prop('disabled', false);
    }else{
        $('#btonCrear').prop('disabled', true);
    }
}


//----------------VALIDACION DE CAMPOS Y COMBOS--------------
function validar_campo(id_campo, et_campo,mensaje){

    obj=document.getElementById(id_campo)
    //objmsj=document.getElementById(id_mensaje);
    if(obj.value === "" || obj.value === "...."){
        toastr.error(mensaje, et_campo, {timeOut: 5000})
        return false;
    }
    else{
        return true;
    }
    
}

//----------------MOSTRAR RELOJ CON LA HORA --------------
function DateHours(){

    var hoy = new Date();
    var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

    return  fechaYHora = fecha + ' ' + hora;
}

function passaleatorio(){
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    var contraseña = "";
    for (i=0; i<20; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
}

    function format(input) {
        var num = input.value.replace(/\./g,'');
        if(!isNaN(num)){
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/,'');
            input.value = num;
        }else{ 
            alert('Solo se permiten numeros');
            input.value = input.value.replace(/[^\d\.]*/g,'');
        }
    }

    function mostrar(inimg, otimg, addimg){

        var archivo = inimg.files[0];
        var reader = new FileReader();

        if (inimg) {
          reader.readAsDataURL(archivo);
          reader.onloadend = function () {
            document.getElementById(addimg).value =  reader.result;
            document.getElementById(otimg).src = reader.result;
          }
        }
      } 
//---------------- FUNCION ENCODE Y DECODE base 64 --------------
function convertBase64 (element) {

    const file = element.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        //console.log('RESULT', reader.result)
        //document.getElementById("id_files").value = reader.result
            reader.result;

    }, false);

   if (file) {
        reader.readAsDataURL(file);
    }
}

function number_format(number, decimals, dec_point, thousands_point) {

        if (number == null || !isFinite(number)) {
            throw new TypeError("number is not valid");
        }
    
        if (!decimals) {
            var len = number.toString().split('.').length;
            decimals = len > 1 ? len : 0;
        }
    
        if (!dec_point) {
            dec_point = '.';
        }
    
        if (!thousands_point) {
            thousands_point = ',';
        }
    
        number = parseFloat(number).toFixed(decimals);
    
        number = number.replace(".", dec_point);
    
        var splitNum = number.split(dec_point);
        splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
        number = splitNum.join(dec_point);
    
        return number;
    }

// Serialize form data into an object
function serialize (data) {

	let obj = {};
	for (let [key, value] of data) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]];
			}
			obj[key].push(value);
		} else {
			obj[key] = value;
		}
	}
	return obj;
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break; 
            }
        }
    }
    return cookieValue;
}


function cambiaValor(label, campoid){

    let textoInput = document.getElementById(campoid).value;
    document.getElementById(campoid).value = label + textoInput;
}

// La función devuelve el numero formateado
function truncateDecimals (num, digits) 
{
    var numS = num.toString();
    var decPos = numS.indexOf('.');
    var substrLength = decPos == -1 ? numS.length : 1 + decPos + digits;
    var trimmedResult = numS.substr(0, substrLength);
    var finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

    // adds leading zeros to the right
    if (decPos != -1){
        var s = trimmedResult+"";
        decPos = s.indexOf('.');
        var decLength = s.length - decPos;

            while (decLength <= digits){
                s = s + "0";
                decPos = s.indexOf('.');
                decLength = s.length - decPos;
                substrLength = decPos == -1 ? s.length : 1 + decPos + digits;
            };
        finalResult = s;
    }
    return finalResult;
};

function aleatorio(minimo, maximo, label, retor){

    let val2  = Math.floor(Math.random() * ((maximo+1)-minimo)+minimo);
        //return(val1+"-"+val2)
    document.getElementById(retor).value = label+val2;
    
}

function isNumber(n) { 
    return !isNaN(parseFloat(n)) && isFinite(n); 
}

const rand=()=>Math.random(0).toString(36).substr(2);
const token=(length)=>(rand()+rand()).substr(0,length);

var keySize = 256;
var ivSize = 128;
var iterations = 100;

function encrypt (text) {

  const key = ("253D3FB468A0E24677C28A624BE0F939")

  var encrypted = CryptoJS.AES.encrypt(text, key);

  return encrypted;

}

function decrypt (encrypted) {

  const key = ("253D3FB468A0E24677C28A624BE0F939")

  const decrypted = CryptoJS.AES.decrypt(encrypted, key);
  if (decrypted) {
    try {
        const str = decrypted.toString(CryptoJS.enc.Utf8);
        if (str.length > 0) {
          return str;
        } else {
          return 'error 1';
        } 
      } catch (e) {
        return 'error 2';
    }
    return 'error 3';
  }

}

function b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
  
    var byteCharacters =  window.atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
  
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      var byteArray = new Uint8Array(byteNumbers);
  
      byteArrays.push(byteArray);
    }
      
    var blob = new Blob(byteArrays, {type: contentType});

    return blob;
  }


  function downloadPDF(zip) {
    const linkSource = `data:file/zip;base64,${zip}`;
    const downloadLink = document.createElement("a");
    const fileName = "file.zip";

    downloadLink.setAttribute("type", "zip");  
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    return downloadLink
}

// program to encode a string to Base64
// create Base64 Object
const Base64 = {
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    
    // public method for encoding
    encode : function (input) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
    
        input = Base64._utf8_encode(input);
    
        while (i < input.length) {
    
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
    
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
    
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
    
            output = output +
            Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
            Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
    
        }
    
        return output;
    },
    
    // public method for decoding
    decode : function (input) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
    
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    
        while (i < input.length) {
    
            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));
    
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
    
            output = output + String.fromCharCode(chr1);
    
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
    
        }
    
        output = Base64._utf8_decode(output);
    
        return output;
    
    },
    
    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        let utftext = "";
    
        for (let n = 0; n < string.length; n++) {
    
            let c = string.charCodeAt(n);
    
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
    
        }
    
        return utftext;
    },
    
    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        let string = "";
        let i = 0;
        let c = c1 = c2 = 0;
    
        while ( i < utftext.length ) {
    
            c = utftext.charCodeAt(i);
    
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
    
        }
        return string;
    }
    }

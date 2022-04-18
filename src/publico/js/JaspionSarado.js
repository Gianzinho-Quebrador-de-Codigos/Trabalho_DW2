 $(function() {
    $("#exampleInputTelefone1").mask('(00) 00000-0000');
    $("#exampleInputCpf1").mask('000.000.000-00');
});

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function validar(){
    let ret = true;
    let msgToast = document.getElementById('msgToast')
    msgToast.innerHTML = "";

    let form = document.forms["dataForm"];

    if (form.exampleInputNome1.value.trim() == "") {
        msgToast.innerHTML = "Favor preencher o campo nome <br>";
        form.exampleInputNome1.focus();
        ret = false;
    }

    if (form.exampleInputData1.value.trim() == "") {
        msgToast.innerHTML = "Favor preencher o campo data <br>";
        form.exampleInputData1.focus();
        ret = false;
    }

    if (form.exampleInputEmail1.value.trim() == "") {
        msgToast.innerHTML = "Favor preencher o campo e-mail <br>";
        form.exampleInputEmail1.focus();
        ret = false;
    }

    if (form.exampleInputCpf1.value.trim() == "") {
        msgToast.innerHTML = msgToast.innerHTML +  "Favor preencher o campo CPF <br>";
        form.exampleInputCpf1.focus();
        ret = false;
    }

     if (form.exampleInputTelefone1.value.trim() == ""){
        msgToast.innerHTML = msgToast.innerHTML + "Favor preencher o campo telefone";
        form.exampleInputTelefone1.focus();
        ret = false;
    }   
    
    if (form.disabledSelect.value.trim() == ""){
        msgToast.innerHTML = msgToast.innerHTML + "Favor preencher o campo estado cívil";
        form.disabledSelect.focus();
        ret = false;
    } 

    if (!ret){
        let toastLive = document.getElementById('liveToast')
        let toast = new bootstrap.Toast(toastLive)
        toast.show()
    }

    return ret;
}
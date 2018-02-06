var parametroAjax = {
    'token': $('input[name=_token]').val(),
    'tipo': 'POST',
    'data': {},
    'ruta': '',
    'async': false
};

var ManejoRespuestaLogin = function(res){
    if (res.code==200){
        if (res.respuesta.code==200){
            window.location.href = res.respuesta.des_code;       
            $('#FormLogin')[0].reset();
        }else{
            $.growl({message:res.respuesta.des_code},{type: "warning", allow_dismiss: true,});
        }
    }else{
        $.growl({message:"Contacte al personal informatico."},{type: "danger", allow_dismiss: true,});
    }
}

var ManejoRespuestaPasswd = function(res){
    if (res.code==200){
        if(res.respuesta.code==200){
            $.growl({message:res.respuesta.des_code},{type: "success", allow_dismiss: true,});
        }else{
            $.growl({message:res.respuesta.des_code},{type: "warning", allow_dismiss: true,});
        }
    }else{
        $.growl({message:res.respuesta.des_code},{type: "danger", allow_dismiss: true,});
    }  
}

var MostrarFormPasswd = function() {
    $(".divLogin").toggle();
    $('#FormLogin')[0].reset();
}

var MostrarFormLogin = function(){
    $(".divLogin").toggle();
    $('#FormPasswd')[0].reset();
}

var EnviarFormLogin = function(){
    parametroAjax.ruta="login";
    parametroAjax.data = $("#FormLogin").serialize();
    respuesta=procesarajax(parametroAjax);
    ManejoRespuestaLogin(respuesta);
}

var EnviarFormPasswd = function(){
    parametroAjax.ruta="/admin/recuperar";
    parametroAjax.data = $("#FormPasswd").serialize();
    respuesta=procesarajax(parametroAjax);
    ManejoRespuestaPasswd(respuesta);
}

var validadorLogin = function(){
    $('#FormLogin').formValidation('validate');
};

var validadorPasswd = function(){
    $('#FormPasswd').formValidation('validate');
};

$(document).ready(function(){
    $(document).on('click','#LinkForgot',MostrarFormPasswd);
    $(document).on('click','#VolverLogin',MostrarFormLogin);
    $(document).on('click','#EnviarLogin',validadorLogin);
    $(document).on('click','#EnviarPasswd',validadorPasswd);
    $('#FormLogin').formValidation({
        excluded:[':disabled'],
        fields: {
            'usrUserName': {
                verbose: false,
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    },
                }
            }, 
            'usrPassword': {
                verbose: false,
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    },
                }
            },
        }
    })
    .on('success.form.fv', function(e){
        EnviarFormLogin();
    })
    .on('status.field.fv', function(e, data){
        data.element.parents('.form-group').removeClass('has-success');
    });

    $('#FormPasswd').formValidation({
        excluded:[':disabled'],
        fields: {
            'usrEmail': {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    },
                    emailAddress: {
                        message: 'Ingrese una dirección de correo valida'
                    }
                }
            },
        }
    })
    .on('success.form.fv', function(e){
        EnviarFormPasswd();
    })
    .on('status.field.fv', function(e, data){
        data.element.parents('.form-group').removeClass('has-success');
    });
});
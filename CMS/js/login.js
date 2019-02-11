function login(){
    var $userName=$('#username'),
        $pwd=$('#password'),
        $code=$("#code");
    if(!$userName.val()) {
        message.alert("请输入用户名", message.error);
        return;
    }
    if(!$pwd.val()) {
        message.alert("请输入密码", message.error);
        return;
    }
    if(!$code.val()) {
        message.alert("请输入验证码", message.error);
        return;
    }
    var index = window.base.loadAnimation();
    var params={
        url:'/token/app',
        type:'post',
        data:{
            username:$userName.val(),
            password:$pwd.val(),
            code:$code.val()
        },
        sCallback:function(res){
            window.base.closeLoadAnimation(index);
            if(res){
                window.base.setLocalStorage('token',res.token);
                window.location.href = 'index.html';
            }
        },
        eCallback:function(e){
            window.base.closeLoadAnimation(index);
            if(e.status==400 || e.status==401){
                message.alert(e.responseJSON.msg, message.error);
                refresh();
                $code.val("");
            }
            else{
                message.alert("异常！");
            }
        }
    };
    window.base.getData(params);

}


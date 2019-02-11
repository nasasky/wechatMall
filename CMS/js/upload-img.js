$(function(){
	$("#uploadify").uploadify({
        'swf'             : 'js/uploadify/uploadify.swf',
        'fileTypeExts'  : '*.jpg;*.jpge;*.png',
        'uploader'        : 'http://www.a.com/api/v1/image/upload',
        'buttonText'	  : '图片上传',
        'onUploadSuccess' : function(file, data, response) {
        	data = JSON.parse(data)

            if (response) {
            	if (data.code==200) {
                    $("#img_id").attr("value", data.img.id)
            		$("#uploadify").attr("value", "/" + data.img_info)
            		$("#img").attr("hidden", false)
            		$("#img").attr("src", window.base.url + '/images/' + data.img_info)
            	}
            	else{
            		window.message.alert(data.msg, window.message.error)
            	}
            }
            else{
            	window.message.alert("上传图片出现异常！", window.message.error)
            }
		},
        'onUploadError' : function(file, errorCode, errorMsg, errorString) {
            window.message.alert(errorString, window.message.error)
        }
    });

})
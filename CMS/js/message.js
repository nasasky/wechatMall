window.message = {
	alert:function(content,icon=0){
		layer.msg(content, {icon: icon});
	}
}

message.irregular = 0;
message.success = 1;
message.error = 2;

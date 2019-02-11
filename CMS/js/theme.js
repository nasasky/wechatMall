$(function(){
	if(!window.base.getLocalStorage('token')){
            window.location.href = 'login.html';
        }
    window.base.getUsername();

	getAllThemes();


	function getAllThemes(){
        var params={
            url:'/theme/all',
            tokenFlag:true,
            sCallback:function(res) {
                const str = getThemeHtmlStr(res)
                $('#theme-table').append(str)
                $(".main-add").mouseenter(function(event){
                    const id = "#" + event.currentTarget.id
                    layer.tips('添加主题', id, {
                        tips: [4, '#78BA32'],
                        time: 500
                    })

                });
                $(".main-update").mouseenter(function(event){
                    const id = "#" + event.currentTarget.id
                    layer.tips('修改主题', id, {
                        tips: [1, '#0FA6D8'],
                        time: 500
                    })
                })
                $(".main-del").mouseenter(function(event){
                    const id = "#" + event.currentTarget.id
                    layer.tips('删除主题', id, {
                        tips: [3, '#009688'],
                        time: 500
                    });
                })

                $(".add").mouseenter(function(event){
                    const id = "#" + event.currentTarget.id
                    layer.tips('添加商品到此主题', id, {
                        tips: [4, '#78BA32'],
                        time: 500
                    })

                });
                $(".del").mouseenter(function(event){
                    const id = "#" + event.currentTarget.id
                    layer.tips('从此主题删除商品', id, {
                        tips: [3, '#009688'],
                        time: 500
                    });
                })

            }
        };
        window.base.getData(params);
    }
    function getThemeHtmlStr(res){
        if (res){
            var len = res.length, str = '', item = null;
            if(len>0) {

                for (var i = 0; i < len; i++) {
                    item = res[i];
                    str += `<tr id="${item.id}">
					          <th scope="row"><br><br><br>${item.id}</th>
					          <td><br><br><br>${item.name}</td>
					          <td><br><br><br>${item.description}</td>
					          <td id="photo-${item.topic_img_id}" onclick="openImg(${item.topic_img_id})">
                              <img class="theme-main-img" layer-src="${item.topic_img_i_d.url}" src="${item.topic_img_i_d.url}">
                              </td>
                              <td id="photo-${item.head_img_i_d}" onclick="openImg(${item.head_img_i_d})">
                              <img class="theme-head-img" layer-src="${item.head_img_i_d.url}" src="${item.head_img_i_d.url}">
                              </td>
					          <td>	
					          		<br><br><br>
					          		<div>
						          		<a class="main-add" id="item-add-${item.id}" onclick="mainAdd()"><span style="color:red;" class="glyphicon glyphicon-plus"></span></a>
						          		<a class="main-update" id="item-update-${item.id}" ><span style="color:red;" class="glyphicon glyphicon-pencil"></span></a>
						          		<a class="main-del" id="item-del-${item.id}" onclick="mainDel(${item.id})"><span style="color:red;" class="glyphicon glyphicon-remove"></span></a>
					          		</div>
					          		<br>
					          		<div>
						          		<a class="add" id="add-${item.id}" onclick="window.base.myOpen('','addProIntoTheme.html?${item.id}')"><span class="glyphicon glyphicon-plus"></span></a>
						          		<a class="del" id="del-${item.id}" href="javascript:void();" onclick="window.base.myOpen('','delProFromThemes.html?${item.id}',area=['550px', '250px'])"><span class="glyphicon glyphicon-remove"></span></a>
					          		</div>
					          		
					          </td>
        					</tr>`;
                  
                }
                
            }
            return str;
        }
        return '';
    }
})

function mainDel(id){
    layer.confirm('确定要删除此主题？', {
    }, function(index){
        var params={
            url:'/theme/delete?id='+id,
            type:"delete",
            tokenFlag:true,
            sCallback:function(res) {
                layer.close(index);
                $("#"+id).remove();
            },
            eCallback:function(e) {
                message.alert(e.responseJSON.msg, message.error);
            }
        };
        window.base.getData(params);
    });
}
$(function(){
    if(!window.base.getLocalStorage('token')){
        window.location.href = 'login.html';
    }
    window.base.getUsername()

    getAllCategory()

    function getAllCategory() {
        (async () => {
            const res = await window.base.request({
                url:'/category/all',
                tokenFlag: true,
            }).catch(err => {
                window.base.handleError(err)
            })
            const str = getCategoryHtmlStr(res)
            $("#category-table").append(str)
        })()

    }
    function getCategoryHtmlStr(res){
        if (res){
            let len = res.length, str = '', item = null;
            if(len>0) {
                for (let i = 0; i < len; i++) {
                    item = res[i]
                    str += `<tr id="${item.id}">
					          <th scope="row"><br><br><br>${item.id}</th>
					          <td><br><br><br>${item.name}</td>
					          <td id="photo-${item.topic_img_id}" onclick="openImg(${item.topic_img_id})">
                              <img class="theme-main-img" layer-src="${item.topic_img_i_d.url}" src="${item.topic_img_i_d.url}">
                              </td>
					          <td>	
					          		<br><br><br>
					          		<div>
						          		<a class="main-add" id="item-add-${item.id}" onclick="window.base.myOpen('','add-category.html?${item.id}')"><span style="color:red;" class="glyphicon glyphicon-plus"></span></a>
						          		<a class="main-update" id="item-update-${item.id}" onclick="window.base.myOpen('','update-category.html?${item.id}')"><span style="color:red;" class="glyphicon glyphicon-pencil"></span></a>
						          		<a class="main-del" id="item-del-${item.id}" onclick="mainDel(${item.id})"><span style="color:red;" class="glyphicon glyphicon-remove"></span></a>
					          		</div>
					          		<br>
					          </td>
        					</tr>`

                }

            }
            return str
        }
        return ''
    }
})

function mainUpdate(id) {
    (async () => {
        const res = await window.base.request({
            url:'/category/update',
            method:"post",
            tokenFlag:true,
        }).catch(err => {
            message.alert(err.responseJSON.msg, message.error);
        })
        layer.close(index);
        $("#"+id).remove();
    })()
}
function mainDel(id){
    layer.confirm('确定要删除此分类？', {
    }, function(index){
        (async () => {
            const res = await window.base.request({
                url:'/category/delete?id='+id,
                method:"delete",
                tokenFlag:true,
            }).catch(err => {
                message.alert(err.responseJSON.msg, message.error);
            })
            layer.close(index);
            $("#"+id).remove();
        })()
    });
}
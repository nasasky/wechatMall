$(function(){
    if(!window.base.getLocalStorage('token')){
                window.location.href = 'login.html' 
            }
    window.base.getUsername() 

    let pageIndex = 1,
        moreDataFlag = true 

    window.base.getProducts = (pageIndex=1) => {
        (async ()=>{
            try{
                const res = await window.base.request({
                    url:'/product/all/page',
                    tokenFlag: true,
                    data: {current_page:pageIndex,size:10},
                })
                const str = getProductHtmlStr(res)
                $('#product-table').append(str) 
            }
            catch(err){
                console.log(err)
                if(err.responseJSON){
                    window.message.alert(err.responseJSON.msg, window.message.error)
                }
                else{
                    window.message.alert("出现异常！", window.message.error)
                }
            }
        })()

    }

    window.base.getProducts(pageIndex) 

    

    /*
    * 获取数据 分页
    */

    /*拼接html字符串*/
    function getProductHtmlStr(res){
        var data = res.data 
        if (data){
            var len = data.length,
                str = '', item 
            if(len>0) {
                for (var i = 0; i < len; i++) {
                    item = data[i] 
                    str += `<tr id="${item.id}">
					          <th scope="row"><br><br>${item.id}</th>
					          <td><br><br>${item.name}</td>
					          <td><br><br>${item.price}</td>
					          <td><br><br>${item.stock}</td>
					          <td id="photo-${item.img_id}" onclick="openImg(${item.img_id})">
                              <img class="product-img" layer-src="${item.main_img_url}" src="${item.main_img_url}">
                              </td>
					          <td><br><br>${item.category.name}</td>
					          <td><br><br>${item.create_time}</td>
					          <td>
                                <br><br>
					          	<button type="button" class="btn btn-primary" onclick="window.base.myOpen('添加商品','add-product.html')">添加商品</button>
					          	<button type="button" class="btn btn-success" onclick="window.base.myOpen('更新商品','update-product.html?${item.id}')">修改</button>
					          	<button type="button" class="btn btn-danger" onclick="del(${item.id})">删除</button>
					          </td>
        					</tr>` 
                  
                }
            }
            else{
                updateMoreBtn() 
                moreDataFlag=false 
            }
            return str 
        }
        return '' 
    }

    
    function updateMoreBtn(){
        if(moreDataFlag) {
            $('#more').hide().next().show() 
        }
    }


    $(document).on('click','#more',function(){
        if (moreDataFlag) {
            pageIndex++ 
            window.base.getProducts(pageIndex) 
        }
    }) 
    
}) 





function del(id){
    layer.confirm('确定要删除此商品？', {
    }, function(index){
        var params={
            url:'/product/delete?id='+id,
            type:"delete",
            tokenFlag:true,
            sCallback:function(res) {
                layer.close(index) 
                $("#"+id).remove() 
            },
            eCallback:function(e) {
                message.alert(e.responseJSON.msg, message.error) 
            }
        } 
        window.base.getData(params) 
    }) 
}
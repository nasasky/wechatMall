$(function(){
	window.base.getAllCategory() 
	const id = location.href.split("?")[1]
	if (id) {
		$("#product-id").attr("value", id)
		getProductByID(id) 
	}

	function getProductByID(id){
		var params={
            url:'/product/' + id,
            tokenFlag:true,
            sCallback:function(res) {
            	if (res) {
            		$("#name").val(res.name) 
            		$("#price").val(res.price) 
            		$("#stock").val(res.stock) 
            		$("#category").val(res.category_id) 
            		$("#img").attr("src", res.main_img_url) 
            	
            	}
                
            }
        } 
        window.base.getData(params) 
	}
	
})

function update(){
    const id = $("#product-id").val()
    const name = $("#name").val()
    const price = $("#price").val()
    const stock = $("#stock").val()
    const category_id = $("#category").val()
    const img_id = $("#img_id").val()
    const main_img_url = $("#uploadify").attr("value")

    ;(async ()=>{
        try{
            await window.base.request({
                url:"/product/update",
                tokenFlag: true,
                data: {
                    id,
                    name,
                    price,
                    stock,
                    category_id,
                    main_img_url,
                    img_id,
                },
                method:"POST"
            })

            parent.layer.closeAll()

        }catch(err){
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
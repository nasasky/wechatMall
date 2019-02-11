$(function(){
	window.base.getAllCategory();
})

function add(){
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
                url:"/product/create",
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


$(function () {
    const id = location.href.split("?")[1]
    if (id) {
        $("#product-id").attr("value", id)
        getCategoryByID(id)
    }

    function getCategoryByID(id) {
        (async () => {
            const res = await window.base.request({
                url: "/category/" + id,
                tokenFlag: true,
            })
            $("#name").val(res.name)
            $("#img").attr("src", res.topic_img_i_d.url)
        })()
    }
})
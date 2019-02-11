window.base = {
    url: 'http://www.a.com/',
    base_url: 'http://www.a.com/api/v1',

    request: function ({url, tokenFlag = false, data = {}, method = "GET"}) {
        const promise = new Promise((resolve, reject) => {
            this._request(url, resolve, reject, tokenFlag, data, method)
        })
        return promise
    },

    _request: function (url, resolve, reject, tokenFlag = false, data = {}, method = "GET") {
        $.ajax({
            url: this.base_url + url,
            data,
            method,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: XMLHttpRequest => {
                if (tokenFlag) {
                    XMLHttpRequest.setRequestHeader('token', this.getLocalStorage('token'));
                }
            },
            success: function (res) {
                resolve(res)
            },
            error: function (res) {
                reject(res)
            }
        })

    },
    //旧版发送请求方法
    getData: function (params) {
        if (!params.type) {
            params.type = 'get';
        }
        var that = this;
        $.ajax({
            type: params.type,
            url: this.base_url + params.url,
            data: params.data,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (XMLHttpRequest) {
                if (params.tokenFlag) {
                    XMLHttpRequest.setRequestHeader('token', that.getLocalStorage('token'));
                }
            },
            success: function (res) {
                params.sCallback && params.sCallback(res);
            },
            error: function (res) {

                params.eCallback && params.eCallback(res);
            }
        });
    },

    setLocalStorage: function (key, val) {
        const exp = new Date().getTime() + 2 * 24 * 60 * 60 * 100; //令牌过期时间
        const obj = {
            val: val,
            exp: exp
        }
        localStorage.setItem(key, JSON.stringify(obj))
    },

    getLocalStorage: function (key) {
        let info = localStorage.getItem(key)
        if (info) {
            info = JSON.parse(info)
            if (info.exp > new Date().getTime()) {
                return info.val
            } else {
                this.deleteLocalStorage('token')
            }
        }
        return ''
    },

    deleteLocalStorage: function (key) {
        return localStorage.removeItem(key)
    },

    loadAnimation: function () {
        var index = layer.load(1, {shade: false})
        return index
    },
    closeLoadAnimation: function (index) {
        layer.close(index)
    },
    getAllCategory: function () {
        ;(async () => {
            const res = await window.base.request({
                url: '/category/all',
            }).catch(err => {
                this.handleError(err)
            })
            const str = window.base.getSelEleStr(res);
            $('#category').append(str)

        })()
    },

    getSelEleStr: function (res) {
        if (res) {
            var str = ""
            for (var i = res.length - 1; i >= 0; i--) {
                var item = res[i];
                str += `<option value="${item.id}">${item.name}</option>`
            }
            return str
        }
        return "<option value=''>空</option>"
    },

    getCheEleStr: function (res) {
        if (res) {
            let str = ""
            for (let i = res.length - 1; i >= 0; i--) {
                let item = res[i]
                str += `<label class="col-md-6"><input name='products' type='checkbox' value="${item.id}"/>${item.name}</label>`
                if (i % 3 == 0) {
                    str += "</br>"
                }

            }
            return str
        }
        return "<label value=''>空</label>"
    },

    logout: function () {
        this.deleteLocalStorage('token')
        window.location.href = 'login.html'
    },

    getUsername: function () {
        ;(async () => {
            try {
                const res = await window.base.request({
                    url: '/token/app/username',
                    tokenFlag: true,
                })
                $("#username").html(res)
            } catch (err) {
                window.base.logout()
            }
        })()
    },

    getThemeByThemeID: function (id) {
        ;(async () => {
            const res = await window.base.request({
                url: "/theme/" + id,
                tokenFlag: true,
            }).catch(err => {
                this.handleError(err)
            })
            const str = this.getSelEleStr(res.products)
            $('#products').append(str)

        })()
    },

    getAllProduct: function (id) {
        ;(async () => {

            const res = await window.base.request({
                url: "/product/all",
                tokenFlag: true,
            }).catch(err => {
                this.handleError(err)
            })
            const str = this.getCheEleStr(res);
            console.log(str)
            $('#checkbox').append(str)


        })()
    },

    myOpen: function (title, url, area = ['650px', '550px']) {

        layer.open({
            type: 2,
            title: title,
            content: url,
            area: area
        })
    },
    handleError:function(err){
        if (err.responseJSON) {
            window.message.alert(err.responseJSON.msg, window.message.error)
        } else {
            window.message.alert("出现异常！", window.message.error)
        }
    }
}
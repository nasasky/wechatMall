import {
  config
} from "../config.js"
import {
  Token
} from "../utils/token.js"

class Http {
  constructor() {}
  request(url, data = {}, method = "GET", noRefetch) {
    const promise = new Promise((resolve, reject)=>{
      this._request(url,resolve, reject, data, method)
    })
    return promise
  }
  _request(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: config.baseUrl + url,
      data,
      method,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success:res => {
        const code = res.statusCode.toString();
        if (code.startsWith("2")){
          resolve(res.data)
        }
        else{
          reject()
          if (code == '401') {
            if (!noRefetch) {
              that._refetch(url, data, method);
            }
          }
          this._showToast(res.data.msg)
        }
      },
      fail:err=>{
        reject()
        this._showToast()
      }
    })
  }

  _refetch(url, data, method) {
    const token = new Token();
    token.getToken(() => {
      this.request(url, data, method, true);
    });
  }

  _showToast(title){
    if(!title){
      title = '出现了一个错误！'
    }
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000,
    })
  }

  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }

}

export {Http}
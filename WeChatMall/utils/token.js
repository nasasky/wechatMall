import {
  config
} from "../config.js"
import {
  Http
} from "../utils/http.js"

const http = new Http()

class Token {
  constructor() {
    this.verifyUrl = "token/verify"
    this.getTokenUrl = "token/user"
    this.storageName = "token"
  }

  verify() {
    const token = wx.getStorageSync(this.storageName)
    if (!token) {
      this.getToken()
    } else {
      this.verifyFromServer()      
    }
  }

  verifyFromServer() {
    http.request(this.verifyUrl).then(res => {
      const isValid = res.isValid
      if (!isValid) {
        this.getToken()
      }
    })
  }

  getToken(callback) {
    wx.login({
      success: res => {
        if (res.code) {
          http.request(this.getTokenUrl, { code: res.code }, "POST")
            .then(res => {
              wx.setStorageSync(this.storageName, res.token);
              callback && callback()
            })
        }
      }
    })
  }
}

export { Token }
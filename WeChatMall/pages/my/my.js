// pages/my/my.js
import {AddressModel} from "../../models/address.js"

const address = new AddressModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    address.getAddress().then(res => {
      const addressInfo = address.getTotalAddressInfo(res)
      this.setData({
        address: addressInfo
      })
    })
  },
  addAddress: function(){
    wx.chooseAddress({
      success: res => {
        const data = {
          name: res.userName,
          province: res.provinceName,
          city: res.cityName,
          country: res.countyName,
          mobile: res.telNumber,
          detail: res.detailInfo
        }
        address.setAddress(data).then(res=>{
          if(res.code == 201){
            const addressInfo = address.getTotalAddressInfo(data)
            this.setData({
              address: addressInfo
            })
          }
        })
      }
    })
  }

 
})
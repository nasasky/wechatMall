// pages/search/search.js
import {
  ProductModel
} from "../../models/product.js"

const product = new ProductModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    q: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索',
    })
  },

  onCancel:function(){
    wx.navigateBack({
      delta: -1
    })
  },

  onConfirm: function (event) {
    const q = event.detail.value.replace(/\s+/g, "")
    if(q){
      wx.showLoading({
        title: '加载中....',
      })
      product.searchProductsByName(q).then(res => {
        this.setData({
          products: res
        })
        wx.hideLoading()
      })
    }
  },
  onDelete:function() {
    this.setData({
      q: "",
      products: null
    })
  },
})
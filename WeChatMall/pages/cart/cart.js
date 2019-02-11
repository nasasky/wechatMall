// pages/cart/cart.js
import {
  CartModel
} from "../../models/cart.js"

const cart = new CartModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedProductsCounts: 0,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.reflesh()
  },

  reflesh: function () {
    const cartData = cart.getDataFromStorage(),
      selectedProductsCounts = cart.getSeletedProductsCount(),
      totalPrice = cart.calculateSelectedProductPrice()
    this.setData({
      selectedProductsCounts,
      cartData,
      totalPrice,
    })
  },

  // 调整商品数目
  changeCounts: function (event) {
    let id = cart.getDataSet(event, 'id'),
      type = cart.getDataSet(event, 'type'),
      index = this._getProductIndexById(id),
      counts = 1
    if (type == 'add') {
      cart.addCounts(id)
    } else {
      counts = -1;
      cart.cutCounts(id)
    }
    this.reflesh()
  },

  _getProductIndexById: function (id) {
    const data = this.data.cartData,
      len = data.length
    for (let i = 0; i < len; i++) {
      if (data[i].id == id) {
        return i
      }
    }
  },

  delete: function (event) {
    const id = cart.getDataSet(event, 'id')
    cart.delete(id)
    this.reflesh()
  },

  // 触发全选与反选按钮事件
  toggleSelectAll: function(event){
    const status = cart.getDataSet(event, 'status')== "true"
    cart.setSelectAllOrNot(status)
    this.reflesh()
  },
  //触发单件商品的选中或反选事件
  toggleProductSelect: function(event){
    const id = cart.getDataSet(event, 'id'),
      index = this._getProductIndexById(id)
    cart.setProductSelectStatus(index)
    this.reflesh()
  }
})
// pages/product/product.js
import {
  ProductModel
} from "../../models/product.js"
import {
  CartModel
} from "../../models/cart.js"

const product = new ProductModel()
const cart = new CartModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    currentTabsIndex: 0,
    productCounts: 1,
    cartTotalCounts: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    const id = options.id
    product.getProductsByID(id).then(res => {
      this.setData({
        product: res,
        cartTotalCounts: cart.getCartTotalCount()
      })
    })
    
  },
  // tab from page of product
  onTabsItemTap: function (event) {
    const index = product.getDataSet(event, 'index');
    this.setData({
      currentTabsIndex: index
    });
  },

  bindPickerChange: function (e) {
    this.setData({
      productCounts: this.data.countsArray[e.detail.value],
    })
  },
  addIntoCart: function () {
    cart.add(this.data.product, this.data.productCounts)
    this.setData({
      cartTotalCounts: cart.getCartTotalCount()
    })
  },
  goToCart:function(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  }
})
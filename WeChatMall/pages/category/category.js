// pages/category/category.js
import {
  CategoryModel
} from "../../models/category.js"

const category = new CategoryModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分类',
    })
    wx.showLoading({
      title: '正在加载...',
    })
    const categories = category.getCategories()
      // (async () => {
      //   const res = await category.getCategories()
      //   this.setData({
      //     categories: res
      //   })

      // })()
    categories
      .then(res => {
        this.setData({
          categories: res
        })
        return category.getProductsByCategory(res[0].id)
      })
      .then(res => {
        wx.hideLoading()
        this.setData({ products: res.products })
      });
  },
  categoryChanged: function (event) {
    const selected = category.getDataSet(event, "index")
    const id = category.getDataSet(event, "id")
    this.setData({
      selected
    })
    wx.showLoading({
      title: '正在加载...',
    })
    category.getProductsByCategory(id).then(res => {
      wx.hideLoading()
      this.setData({ products: res.products })
    })
  },
  onProductItemTap: function (event) {
    const id = category.getDataSet(event, "id")
    wx.navigateTo({
      url: '/pages/product/product?id=' + id,
    })
  },
})
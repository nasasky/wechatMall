// pages/home/home.js
import {
  HomeModel
} from "../../models/home.js"

const home = new HomeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '首页',
    })
    wx.showLoading({
      title: '加载中',
    })
    const banner = home.getBanner()
    const themes = home.getTheme()
    const products = home.getProducts()

    Promise.all([banner, themes, products])
      .then(res => {
        console.log(res)
        this.setData({
          banner: res[0],
          themes: res[1],
          products: res[2],
        })
        wx.hideLoading()

      })
  },
  onThemesItemTap: function (event) {
    const id = home.getDataSet(event, 'id')
    const name = home.getDataSet(event, 'name')
    wx.navigateTo({
      url: '../theme/theme?id=' + id + '&name=' + name
    })
  },
  onSearching: function(){
    wx.navigateTo({
      url: '../search/search',
    })
  }
})
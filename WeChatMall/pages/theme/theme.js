// pages/theme/theme.js
import {
  ThemeModel
} from "../../models/theme.js"

const theme = new ThemeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    wx.setNavigationBarTitle({
      title: "主题"
    })
    const t = theme.getProductsByTheme(this.data.id)
    t.then(res => {
      this.setData({
        theme:res
      })
    })
  },

})
// components/products/products.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    products: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onProductItemTap: function(event){
      const id = this.getDataSet(event, "id")
      wx.navigateTo({
        url: '/pages/product/product?id=' + id,
      })
    },
    getDataSet(event, key) {
      return event.currentTarget.dataset[key];
    }
  }
})

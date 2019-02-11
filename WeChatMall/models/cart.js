import { Http } from "../utils/http.js"

class CartModel extends Http {
  constructor() {
    super()
    this.storageName = "cart"
  }
  add(item, count){
    let arr = this.getDataFromStorage()
    const result = this._isHasThatOne(item.id, arr)
    
    if(result.index == -1){
      item.count = count
      item.selectStatus = true
      arr.push(item)
    }
    else{
      const oldCount = this._calculateProductCount(result.index, arr)
      arr[result.index].count = oldCount + count
    }
    this.saveIntoStorage(arr)
    return arr
  }
  _calculateProductCount(index, arr){
    return arr[index].count
  }
  saveIntoStorage(data){
    wx.setStorageSync(this.storageName, data)
  }
  getDataFromStorage(){
    const data = wx.getStorageSync(this.storageName)
    if(!data){
      return []
    }
    return data
  }
  getCartTotalCount(){
    let count = 0
    let item = null
    const data = this.getDataFromStorage()
    for (let i = 0; i < data.length; i++) {
      item = data[i];
      count += item.count
    }
    return count
  }
  _isHasThatOne(id, arr) {
    let result = {index:-1}

    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (item.id == id) {
        result = {
          index: i,
        }
        break
      }
    }
    return result
  }
  _changeCounts(id, count) {
    const cartData = this.getDataFromStorage(),
      hasInfo = this._isHasThatOne(id, cartData)
    if (hasInfo.index != -1) {
      if(cartData[hasInfo.index].count + count > 0){
        cartData[hasInfo.index].count += count
      }
    }
    this.saveIntoStorage(cartData)
  };

 /*
  * 购物车+
  * */
  addCounts(id) {
    this._changeCounts(id, 1)
  }

  /*
  * 购物车-
  * */
  cutCounts(id) {
    this._changeCounts(id, -1)
  }
  /*
  * 购物车-del
  * */
  delete(id) {
    const data = this.getDataFromStorage(),
      hasInfo = this._isHasThatOne(id, data)
    if (hasInfo.index != -1) {
        data.splice(hasInfo.index, 1)
        this.saveIntoStorage(data)
    }
  }

  getSeletedProductsCount(){
    const data = this.getDataFromStorage()
    let count = 0
    for(let i = 0; i < data.length; i++){
      let item = data[i]
      if(item.selectStatus){
        count ++
      }
    }
    return count
  }

  // 设置全选或反选
  setSelectAllOrNot(flag){
    const data = this.getDataFromStorage(),
      len = data.length
    for (let i = 0; i < len; i++) {
      data[i].selectStatus = !flag
    }
    this.saveIntoStorage(data)
  }

  // 设置商品选中状态
  setProductSelectStatus(index) {
    const data = this.getDataFromStorage()
    data[index].selectStatus = ! data[index].selectStatus
    
    this.saveIntoStorage(data)
  }
  
  calculateSelectedProductPrice(){
    const data = this.getDataFromStorage(),
      len = data.length
    let totalPrice = 0
    for (let i = 0; i < len; i++) {
      let item = data[i]
      if(item.selectStatus){
        totalPrice += item.price * item.count
      }
    }
    return totalPrice
  }
}

export { CartModel }
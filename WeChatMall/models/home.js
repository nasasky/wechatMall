


import { Http } from "../utils/http.js"

class HomeModel extends Http {
  constructor() {
    super()
   }
  getBanner() {
    return this.request("banner/1")
  }
  getTheme() {
    return this.request("/theme/all")
  }
  getProducts() {
    return this.request("/product/all")
  }
}

export { HomeModel }

import { Http } from "../utils/http.js"

class ProductModel extends Http {
  constructor() {
    super()
  }
  getProductsByID(id) {
    return this.request("product/" + id)
  }
  searchProductsByName(keyword){
    return this.request("product/search?key=" + keyword)
  }
}

export { ProductModel }
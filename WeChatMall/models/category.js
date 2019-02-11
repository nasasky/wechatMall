import { Http } from "../utils/http.js"

class CategoryModel extends Http {
  constructor() {
    super()
  }
  getCategories() {
    return this.request("category/all")
  }
  getProductsByCategory(id){
    return this.request("category/"+id)
  }
}

export { CategoryModel }
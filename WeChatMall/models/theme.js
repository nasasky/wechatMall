import { Http } from "../utils/http.js"

class ThemeModel extends Http {
  constructor() {
    super()
  }
  getProductsByTheme(id) {
    return this.request("/theme/" + id)
  }
}

export { ThemeModel }
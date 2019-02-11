import { Http } from "../utils/http.js"

class AddressModel extends Http {
  constructor() {
    super()
  }
  getAddress() {
    return this.request("address")
  }
  setAddress(data){
    // data = this.formatData(data)
    return this.request("address", data, "POST")
  }
  // formatData(data){
  //   return {
  //     name: data.userName,
  //     province: data.provinceName,
  //     city: data.cityName,
  //     country: data.countyName,
  //     mobile: data.telNumber,
  //     detail: data.detailInfo
  //   }
  // }
  getTotalAddressInfo(res) {
    const province = res.province,
      city = res.city,
      country = res.country,
      detail = res.detail
    let totalDetail = city + country + detail

    if (!this.isCenterCity(province)) {
      totalDetail = province + totalDetail
    }
    const data = {
      name: res.name,
      mobile: res.mobile,
      totalDetail
    }
    return data
  }

  // 是否为直辖市
  isCenterCity(name) {
    const centerCitys = ['北京市', '天津市', '上海市', '重庆市'],
      flag = centerCitys.indexOf(name) >= 0
    return flag
  }
}

export { AddressModel }
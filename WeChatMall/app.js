//app.js
import { Token } from 'utils/token.js'

const token = new Token()

App({
  onLaunch(){
    token.verify()
  }
})
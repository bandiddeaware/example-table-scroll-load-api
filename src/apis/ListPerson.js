import axios from 'axios'
import sconfig from './config'

// eslint-disable-next-line
export default (data) => {
  return axios({
    method: 'post',
    url: sconfig.url +'/dashboard/list/person',
    headers: { 
      'Authorization': 'Bearer ' + sconfig.Token, 
    },
    data : data
  })
}
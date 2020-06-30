import axios from 'axios'
import {localStorage} from '@/assets/js/storage'
import {history} from '@/assets/js/history'

axios.defaults.withCredentials = true; 
axios.defaults.baseURL='/api'
axios.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers['accesstoken'] =localStorage.getItem('token');
    }
    return config
},error =>{
    return Promise.reject(error)
});

axios.interceptors.response.use((response) => {
    let token = response.headers.accesstoken;
      if (token) {
         axios.defaults.headers.common['accesstoken'] = token; 
      }
      if(response.status==200){
      }
      return response
  }, (error) => {
      return Promise.reject(error)
  });

  export const resquest=(method:string,url:string,data:any={}):Promise<any>=>{
    return new Promise((resolve) => {
        let params={};
        if(method==='get'){  
            Object.keys(data).forEach((key) => (data[key] == null||data[key]=='') && delete data[key]); //删除为空的字符串
            params=data;
        };
        let option = {method,url,params,...data}; 
        axios.request(option).then(res => {

        },error => {
          
            
        }).catch((err)=>{
          
        })
    })
  }

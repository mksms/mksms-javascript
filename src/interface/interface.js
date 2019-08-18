const { Observable  } = require("rxjs");
const {base_url} = require('../config/config.json');
const axios = require('axios').create({
    baseURL: base_url,
    headers: {"Content-type": "application/json; charset=utf-8"}
  });
exports.get_request = (url,data=null,params=null) =>{
    
    return Observable
    .create((event)=>{
        axios.get(
            url,
            {
            data:data
            ,
            params:params
            
        }).then((rep)=>{
            
            event.next(rep["data"]);
            event.complete();        
        })
        .catch((err)=>{
            
            event.error(err);
            event.complete();
        });
    });
    
} 

exports.post_request = (url,data,params) =>{
    
    return Observable
    .create((event)=>{
        axios.post(
            url,{
            data:{
                data
            },
            params:params
            
        }).then((rep)=>{
            
            event.next(rep["data"]);
            event.complete();        
        })
        .catch((err)=>{
            
            event.error(err);
            event.complete();
        });
    });
}
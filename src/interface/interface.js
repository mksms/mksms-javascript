const { Observable  } = require("rxjs");
const axios = require('axios');

exports.get_request = (url,data=null,params=null) =>{
    
    return Observable
    .create((event)=>{
        axios.get(
            url,
            {
            data:{
                data
            },
            params:{
                params
            }
        }).then((rep)=>{
            
            event.next(rep["data"]);
            event.complete();        
        })
        .catch((err)=>{
            
            event.error(  err);
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
            params:{
                params
            }
        }).then((rep)=>{
            
            event.next(rep["data"]);
            event.complete();        
        })
        .catch((err)=>{
            
            event.error(  err);
            event.complete();
        });
    });
}
const { Observable  } = require("rxjs");
const axios = require('axios');

exports.getRequest = (url,data=null,params=null) =>{
    
    return Observable
    .create((event)=>{
        axios({
            method:'GET',
            url:url,
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

exports.postRequest = (url,data,params) =>{
    
    return Observable
    .create((event)=>{
        axios({
            method:'POST',
            url:url,
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
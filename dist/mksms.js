const mksms = {
    'this':mksms,
    'postRequest' :(url,data)=>{
        return new Promise((resolve,reject)=>{
            var oReq = new XMLHttpRequest();

        oReq.open("POST", url+ ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        oReq.onload = function(e) {
            var body = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                resolve(body);
            } else {
                reject(body);
        }   }
        oReq.send(data);
        })
        
    }, 
    'getRequest' : (url,data,params=null)=>{
        return new Promise((resolve,reject)=>{
            var oReq = new XMLHttpRequest();

        oReq.open("GET", url+ ((/\?/).test(url) ? "&" : "?") + sereal, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        oReq.onload = function(e) {
            var body = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                resolve(body);
            } else {
                reject(body);
        }   }
        oReq.send(data);
        })
        
    },
    'ENDPOINT':{'send_sms':'/sms/send/',
    'get_sms':'/sms/available/',
    'start_verify':'/phone/verify/start/',
    'confirm_verify':'/phone/verify/confirm/'
    },
    'BASE_URL': "http://api.mksms.cm",
    'BOTH': 0,
    'OUT' : 1,
    'IN' : -1,
    'READ' : true,
    'UNREAD' : false,
    '_Contact' :  {"name":null,"number":null},
    'Contact' :function (number,name=""){

        this.number = number;
        this.name = name;
        },
    '_Message' : {
            "contact":_Contact,
            "body":null,
            "direction":null,
            "read":null
        },
    'Message':    function (contact,body,read=false,direction=mksms.OUT){
            if(contact instanceof( this.Contact)){
                this.contact = contact
            }else{
                this
                this.contact  = new this.Contact(contact);
            }
            this.body = body;
            this.direction = direction;
            this.read = read;
        },
    'Client':function (api_key,api_hash){
        this.api_key = api_key;
        this.api_hash = api_hash;
        
    }

}


    
    
   

mksms.Contact.prototype.get = function(){
    let contact = mksms._Contact;
    contact.name = this.name;
    contact.number = this.number;
    return  contact;
};
mksms.Contact.prototype.set = function(contact){
    this.name = contact.name;
    this.number = contact.number;
};
mksms.Contact.prototype.is = function(name){
    return this.name = name;
}
mksms.Contact.prototype.set_name = function(name){
    this.name = name;
};   
mksms.Contact.prototype.set_number = function(number){
    this.number = number;
}



mksms.Message.prototype.get = function(){
    let message = mksms._Message;
    message.contact = this.contact.get();
    message.body = this.body;
    message.direction = this.direction;
    message.read = this.read;
    return message; 
};
mksms.Message.prototype.set = function(val){
    for( let i of Object.keys(val) ){
        if(i in this){
            this[i]=val [i];
        }
    }     
};

     
    
mksms.Client.prototype.send_message = function(message){ 
           if("to" in message){
            if("name" in message["to"] ){
                if("number" in message["to"]){
                    var contact = new mksms.Contact(message["to"]["number"],message["to"]["name"]);
                }else{
                    return Observable.create((observer)=>{ 
                        observer.error(new Error("mksms: number in to is missing"));
                    });
                }
                
            }else{
                return Observable.create((observer)=>{
                    observer.error(new Error("mksms: to is missing"));
                });
            }
        }else{
           return Observable.create((observer)=>{
                observer.error(new Error("mksms: to is missing"));
           }); 
        }
        if("body" in message){
            var _message = new mksms.Message(contact,message["body"]);
        }else{
            var _message = new mksms.Message(contact,{});
        }
        let data;
        data = _message.get();
        
        data['api_key'] = this.api_key;
        data['api_hash'] =  this.api_hash;
        return mksms.postRequest(BASE_URL+ENDPOINT['send_sms'],data);
        }
        mksms.Client.prototype.get_messages = function(min_date=null, direction=OUT,read=UNREAD,timestamp=null){
        let params = {'direction':direction, 'read':read};
        params['api_key'] = this.api_key;
        params['api_hash'] = this.api_hash;
        if(min_date != null){
            params['min_date'] = min_date;
        }
        if(timestamp!= null){
            params['timestamp'] = timestamp;
        }
        return mksms.getRequest(BASE_URL+ENDPOINT['get_sms'],null ,params); 
    }
    mksms.Client.prototype.start_verify = function(number, name){
      
            
            data = {'number':number, 'name':name};
            data['api_key'] = this.api_key;
            data['api_hash'] = this.api_hash;
            
            endpoint = mksms.ENDPOINT['start_verify'];
            return mksms.postRequest(BASE_URL+endpoint, data);
        
    }  
    mksms.Client.prototype.confirm_verify = function ( number, code){
            
            data = {'number':number, 'code':code}
            data['api_key'] = this.api_key
            data['api_hash'] = this.api_hash
            
            endpoint = ENDPOINT['confirm_verify']
        return    mksms.postRequest(BASE_URL+endpoint, data)
    }

(function($) {

    var postRequest = (url,data)=>{
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
        
    }
    var getRequest = (url,data,params=null)=>{
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
        
    }
    const ENDPOINT = {'send_sms':'/sms/send/',
    'get_sms':'/sms/available/',
    'start_verify':'/phone/verify/start/',
    'confirm_verify':'/phone/verify/confirm/'};
    
    const BASE_URL = "http://api.mksms.cm";
    
    const BOTH = 0,
    OUT = 1,
    IN = -1,
    READ = true,
    UNREAD = false;
    
    const _Contact =  {"name":null,"number":null};
function Contact(number,name=""){

this.number = number;
this.name = name;
}
Contact.prototype.get = function(){
    let contact = _Contact;
    contact.name = this.name;
    contact.number = this.number;
    return  contact;
};
Contact.prototype.set = function(contact){
    this.name = contact.name;
    this.number = contact.number;
};
Contact.prototype.is = function(name){
    return this.name = name;
}
Contact.prototype.set_name = function(name){
    this.name = name;
};   
Contact.prototype.set_number = function(number){
    this.number = number;
}

const _Message = {
    "contact":_Contact,
    "body":null,
    "direction":null,
    "read":null
}
 
    
        /*This class represent a message. It is a convenience class.
        Args:
            * contact: str|`Contact` the contact concerned by the sms
            * body: str the body of the sms
        */
function Message(contact,body,read=false,direction=OUT){
    if(contact instanceof( Contact)){
        this.contact = contact
    }else{
        this.contact  = new Contact(contact);
    }
    this.body = body;
    this.direction = direction;
    this.read = read;
};
Message.prototype.get = function(){
    let message = _Message;
    message.contact = this.contact.get();
    message.body = this.body;
    message.direction = this.direction;
    message.read = this.read;
    return message; 
};
Message.prototype.set = function(val){
    for( let i of Object.keys(val) ){
        if(i in this){
            this[i]=val [i];
        }
    }     
};

     function Client(api_key,api_hash){
        this.api_key = api_key;
        this.api_hash = api_hash;
        
    }
    
    Client.prototype.send_message = function(message){
            /*This methode is used to send a message.
            Args:
                * message: Message object
            
            Return:
                * promise 
            */
            
           if("to" in message){
            if("name" in message["to"] ){
                if("number" in message["to"]){
                    var contact = new Contact(message["to"]["number"],message["to"]["name"]);
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
            var _message = new Message(contact,message["body"]);
        }else{
            var _message = new Message(contact,{});
        }
        let data;
        data = _message.get();
        
        data['api_key'] = this.api_key;
        data['api_hash'] =  this.api_hash;
        return postRequest(BASE_URL+ENDPOINT['send_sms'],data);
        }
    Client.prototype.get_messages = function(min_date=null, direction=OUT,read=UNREAD,timestamp=null){
            /*This method is used to get the list of messages.
            Args:
                * min_date: datetime|str object representating the minimal date to use
                * direction: Union[BOTH|OUT|IN] the direction of the sms to return
                * status: Union[READ|UNREAD|BOTH]
                
            Return:
                [Message, ...]
            */
        let params = {'direction':direction, 'read':read};
        params['api_key'] = this.api_key;
        params['api_hash'] = this.api_hash;
        if(min_date != null){
            params['min_date'] = min_date;
        }
        if(timestamp!= null){
            params['timestamp'] = timestamp;
        }
        return getRequest(BASE_URL+ENDPOINT['get_sms'],null ,params); 
    }
    Client.prototype.start_verify = function(number, name){
            /*THis method is used to start the number verification process.
            
            Args:
                * number
                
            Return:
                * Response object
            */
            
        
            
            data = {'number':number, 'name':name};
            data['api_key'] = this.api_key;
            data['api_hash'] = this.api_hash;
            
            endpoint = ENDPOINT['start_verify'];
            return postRequest(BASE_URL+endpoint, data);
        
    }  
    Client.prototype.confirm_verify = function ( number, code){
            /*THis method is used to confirm the code for a started verification process
            
            Args:
                * number
                * code
                
            Return:
                * Response object
            */   
            data = {'number':number, 'code':code}
            data['api_key'] = this.api_key
            data['api_hash'] = this.api_hash
            
            endpoint = ENDPOINT['confirm_verify']
        return    postRequest(BASE_URL+endpoint, data)
    }
    $.fn.Client = Client;
})(jQuery);
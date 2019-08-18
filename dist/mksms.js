(function(window){
    const {end_points,directions,base_url,states} = {
        "end_points": {
            "send_sms":"/sms/send/",
            "get_sms":"/sms/available/",
            "start_verify":"/phone/verify/start/",
            "confirm_verify":"/phone/verify/confirm/"
        },
        "base_url":"https://api.mksms.cm",
        "directions":{
            "in":-1,
            "out":1,
            "both":0
        },
        "states":{
            "read":true,
            "unread":false
        }
    }
    function queryString (params){
        return Object.keys(params).map(function(key) {
            return key + '=' + params[key]
        }).join('&');
    };
    function get_request (url,data=null,params) {
        return new Promise((resolve,reject)=>{
            var img = new Image();
            data = data || {};
            params = params || {};
            data["no-cache"] = JSON.stringify(new Date);
            img.src = base_url+url+'?'+queryString(data)+'&'+queryString(params);
            img.onload = (data)=>{
                resolve(data);
            };
            img.onerror = (error)=>{
                reject(error)
            };
        })
    }; 
    
    function post_request (url,data,params) {
        
        return new Promise((resolve,reject)=>{
            params = params || {};
            method = "post";

            // function to remove the iframe
            var removeIframe = function( iframe ){
                iframe.parentElement.removeChild(iframe);
            };

            // make a iframe...
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = base_url;
            iframe.onload = ()=>{
                var iframeDoc = iframe.contentWindow.document;

                // Make a invisible form
                var form = iframeDoc.createElement('form');
                form.method = method;
                form.action = url+'?'+queryString(params);
                iframeDoc.body.appendChild(form);

                // pass the parameters
                for( var name in data ){
                    var input = iframeDoc.createElement('input');
                    input.type = 'hidden';
                    input.name = name;
                    input.value = data[name];
                    form.appendChild(input);
                }
                form.onload = (data)=>{
                    resolve(data);
                }
                form.onerror = (err)=>{
                    reject(err);
                }
                form.submit();
                // remove the iframe
                setTimeout( function(){
                    removeIframe(iframe);
                }, 500);
            };

            document.body.appendChild(iframe);
        })
    };
    const _Contact =  {"name":null,"number":null};
    function Contact(number, name){
        this.number = number;
        this.name = name;
    };
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
    };
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
    };
    function Message(contact,body,read=states.unread,direction=directions.out){
        if(contact instanceof( Contact)){
            this.contact = contact;
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
    };
    Client.prototype.send_message = function(message){
        if(message["to"]){
            if(message["to"]["name"] ){
                if(message["to"]["number"]){
                    var contact = new Contact(message["to"]["number"],message["to"]["name"]);
                }else{
                    return Observable.create((observer)=>{ 
                        observer.error(new Error("mksms: number is missing in to "));
                    });
                }
                
            }else{
                return Observable.create((observer)=>{
                    observer.error(new Error("mksms: name is missing in to"));
                });
            }
        }else{
           return Observable.create((observer)=>{
                observer.error(new Error("mksms: to is missing"));
           }); 
        }
        if(message["body"]){
            var _message = new Message(contact,message["body"]);
        }else{
            var _message = new Message(contact,{});
        }
        let data = _message.get();
        data['api_key'] = this.api_key;
        data['api_hash'] =  this.api_hash;
        return post_request(end_points['send_sms'],data);
    };
    Client.prototype.get_messages = function(min_date=null, direction=directions.in,read=states.unread,timestamp=null){
        let params = {'direction':direction, 'read':read};
        params['api_key'] = this.api_key;
        params['api_hash'] = this.api_hash;
        if(min_date != null){
            params['min_date'] = min_date;
        }
        if(timestamp!= null){
            params['timestamp'] = timestamp;
        }
        return get_request(end_points['get_sms'],null ,params); 
    };
    Client.prototype.start_verify = function(number, name){
        let data = {'number':number, 'name':name};
        data['api_key'] = this.api_key;
        data['api_hash'] = this.api_hash;
        return post_request(end_points['start_verify'], data);
    };
    Client.prototype.confirm_verify = function ( number, code){ 
        let  data = {'number':number, 'code':code};
        data['api_key'] = this.api_key;
        data['api_hash'] = this.api_hash;
        return    post_request(end_points['confirm_verify'], data);
    };
    window["mksms"] = {Client,Message,Contact}
}(window))
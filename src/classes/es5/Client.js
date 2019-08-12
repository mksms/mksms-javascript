const { Observable  } = require("rxjs");
const { Contact } = require('./Contact');
const { Message } = require('./Message');
const { get_request, post_request } = require('../../interface/interface');
const { directions, end_points, states } = require('../../config/config.json');



function Client(api_key,api_hash){
    this.api_key = api_key;
    this.api_hash = api_hash;    
}

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
}

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
}

Client.prototype.start_verify = function(number, name){
    let data = {'number':number, 'name':name};
    data['api_key'] = this.api_key;
    data['api_hash'] = this.api_hash;
    return post_request(end_points['start_verify'], data);
}

Client.prototype.confirm_verify = function ( number, code){ 
    let  data = {'number':number, 'code':code};
    data['api_key'] = this.api_key;
    data['api_hash'] = this.api_hash;
    return    post_request(end_points['confirm_verify'], data);
}

module.exports.Client = Client;
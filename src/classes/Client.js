
import { Contact } from './Contact';
import { Message } from './Message';
import { Observable }  from 'rxjs';
import { get_request, post_request } from '../interface/interface';
import { directions, base_url, end_points, states } from '../config/config.json'

export class Client {
    constructor(api_key,api_hash){
        this.api_key = api_key;
        this.api_hash = api_hash;
    }
    
    send_message(message){
        if(message["to"]){
            if( message["to"]["name"] ){
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
        if( message["body"]){
            var _message = new Message(contact,message["body"]);
        }else{
            var _message = new Message(contact,{});
        }
        let data;
        data = _message.get();
        
        data['api_key'] = this.api_key;
        data['api_hash'] =  this.api_hash;
        return  post_request(base_url+end_points['send_sms'],data);
    }

    get_messages(min_date=null, direction=directions.in,read=states.unread,timestamp=null){
        let params = {'direction':direction, 'read':read};
        params['api_key'] = this.api_key;
        params['api_hash'] = this.api_hash;
        if(min_date != null){
            params['min_date'] = min_date;
        }
        if(timestamp != null){
            params['timestamp'] = timestamp;
        }
        return get_request(base_url+end_points['get_sms'],null ,params);
    }

    start_verify(number, name){
        data = {'number':number, 'name':name};
        data['api_key'] = this.api_key;
        data['api_hash'] = this.api_hash;
        return post_request(base_url+end_points['start_verify'], data);
    }  

    confirm_verify( number, code){   
        data = {'number':number, 'code':code};
        data['api_key'] = this.api_key;
        data['api_hash'] = this.api_hash;
        return post_request(base_url+end_points['confirm_verify'], data);
    }
}



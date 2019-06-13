
import {Contact} from './Contact';
import {Message} from './Message';
import { Observable }  from 'rxjs';
import  {getRequest,postRequest} from '../data/data';
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

export class Client {
    constructor(api_key,api_hash){
        this.api_key = api_key;
        this.api_hash = api_hash;
    }
    send_message(message){
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
    get_messages(min_date=null, direction=OUT,read=UNREAD,timestamp=null){
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
    if(timestamp != null){
        params['timestamp'] = timestamp;
    }
        return getRequest(BASE_URL+ENDPOINT['get_sms'], null,params); 
    }
    start_verify(number, name){
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
    confirm_verify( number, code){
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
        return postRequest(BASE_URL+endpoint, data)
    }
}



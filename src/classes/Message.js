import {Contact, _Contact} from './Contact';
export const _Message = {
    "contact":_Contact,
    "body":null,
    "direction":null,
    "read":null
}
const BOTH = 0,
OUT = 1,
IN = -1,
READ = false;

    
        /*This class represent a message. It is a convenience class.
        Args:
            * contact: str|`Contact` the contact concerned by the sms
            * body: str the body of the sms
        */
export class Message{
    constructor(contact,body,read=false,direction=OUT){
        if(contact instanceof( Contact)){
            this.contact = contact
        }else{
            this.contact  = new Contact(contact);
        }
        this.body = body;
        this.direction = direction;
        this.read = read;
    }
    get(){
        let message = _Message;
        message.contact = this.contact.get();
        message.body = this.body;
        message.direction = this.direction;
        message.read = this.read;
        return message; 
    };
    set(val){
        for( let i of Object.keys(val) ){
            if(i in this){
                this[i]=val [i];
            }
        }     
    };
};

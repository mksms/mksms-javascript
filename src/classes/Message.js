import { Contact, _Contact } from './Contact';
import { directions, states } from '../config/config.json'


export const _Message = {
    "contact":_Contact,
    "body":null,
    "direction":null,
    "read":null
}
   
export class Message{
    constructor(contact,body,read=states.unread,direction=directions.out){
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

const {Contact,_Contact} = require('./Contact');
const _Message = {
    "contact":_Contact,
    "body":null,
    "direction":null,
    "read":null
}
const BOTH = 0,
OUT = 1,
IN = -1,
READ = false;
timestamp = null;
min_date= null;
 
    
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
module.exports.Message = Message;
module.exports._Message = _Message;
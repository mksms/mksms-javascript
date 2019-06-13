import { Observable } from "rxjs";





declare namespace mksms{
    
    const BOTH = 0,//Message direction In and Out
    OUT = 1,//Message direction Out
    IN = -1,//Message direction In
    READ:Boolean = true,//Message status read as true
    UNREAD:Boolean = false;//Message status unread as false
    interface _Contact{
        number:string;
        name:string;
    }

    interface _Message{
        contact:_Contact;
        body:string;
        direction:Number;
        status:Number;
    }
 
    class Contact  {
        /*This class represent a contact number. It is a convenience class.*/
         number:string;
         name:string;
        constructor( number:string, name="");
        get():_Contact;
        set(contact:_Contact):void;
        set_name( name:string):void;
        set_number(number:string):void;
        is(name:string):boolean;
    }
    class Message{
        /*This class represent a message. It is a convenience class.
        Args:
            * contact: str|`Contact` the contact concerned by the sms
            * body: str the body of the sms
        */
       private contact:Contact;
       private body:string;
       private direction:Number;
       private status:Number;
       constructor(contact:Contact|_Contact,body:string,direction:Number=OUT);
       get():_Message;
       set_body(body:string):void;
       set_contact(contact:_Contact):void;
    }
    class Client{
        /*This class a the client class for the API.
    
        Args:
        * api_key: Your api key
        * api_hash: Your api hash
        */
        private api_key:string;
        private api_hash:string;
        private contacts:Object<Contact>;
        private listener:Object<Array<Function>>
        constructor(api_key,api_hash);
        send_message(message:Message | _Message):Observable<any>;
        get_messages( min_date=null, direction=OUT, status=UNREAD):Observable<any>;
        /*THis method is used to start the number verification process.
            
            Args:
                * number
                
            Return:
                * Response object
            */
        start_verify(number:string, name:string):Observable<any>;
        /*THis method is used to confirm the code for a started verification process
            
            Args:
                * number
                * code
                
            Return:
                * Response object
            */ 
        confirm_verify( number:string, code:string|number):Observable<any>;     
            
    }

}
export as namespace mksms;

export = mksms;
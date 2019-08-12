import { Observable } from "rxjs";





declare namespace mksms{
    //Api configuration
    interface Config{
         end_points: {
            send_sms:string,
            get_sms:string,
            start_verify:string,
            confirm_verify:string
        },
        base_url:string,
        directions:{
            in:number,
            ou:number,
            both:number
        },
        states:{
            read:boolean,
            unread:boolean
        }
    }

    //Basic Contact
    interface _Contact{
        number:string;
        name:string;
    }

    //Basic Message
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
        constructor( number:string, name:string);
        get():_Contact;
        set(contact:_Contact):void;
        set_name(name:string):void;
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
        constructor(api_key:string,api_hash:string);
        /*This methode is used to send a message.
        Args:
            * message: Message object
        
        Return:
            * promise 
        */
        send_message(message:Message | _Message):Observable<any>;
        /*This method is used to get the list of messages.
        Args:
            * min_date: datetime|str object representating the minimal date to use
            * direction: Union[BOTH|OUT|IN] the direction of the sms to return
            * status: Union[READ|UNREAD|BOTH]
            
        Return:
            [Message, ...]
        */
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
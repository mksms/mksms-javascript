export const _Contact =  {"name":null,"number":null};
export class Contact{
    constructor(number,name){
        this.number = number;
        this.name = name;        
    }
    get(){
        let contact = _Contact;
        contact.name = this.name;
        contact.number = this.number;
        return  contact;
    };
    set(contact){
        this.name = contact.name;
        this.number = contact.number;
    };
    is(name){
        return this.name = name;
    }
    set_name(name){
        this.name = name;
    };   
    set_number(number){
        this.number = number;
    }
}
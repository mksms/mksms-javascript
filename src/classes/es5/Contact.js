

const _Contact =  {"name":null,"number":null};
function Contact(number,name=""){
    this.number = number;
    this.name = name;
}
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
}
Contact.prototype.set_name = function(name){
    this.name = name;
};   
Contact.prototype.set_number = function(number){
    this.number = number;
}
module.exports.Contact = Contact;
module.exports._Contact = _Contact;
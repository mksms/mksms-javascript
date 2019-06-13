(function(){
    'use strict';
    const {Client} = require('./classes/es5/Client');
    const {Contact} = require('./classes/es5/Contact');
    const {Message} = require('./classes/es5/Message');
    const BOTH = 0, OUT = 1, IN = -1, READ = true, UNREAD = false;
    var mksms = {Message,Contact,Client,BOTH,OUT,IN,READ,UNREAD}; 
    module.exports = mksms; 
})();
 
    

    
 

     
     

    
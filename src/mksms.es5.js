(function(){
    'use strict';
    const { Client } = require('./classes/es5/Client');
    const { Contact } = require('./classes/es5/Contact');
    const { Message } = require('./classes/es5/Message');
    const { directions, states } = require('./config/config.json')
    var mksms = { Message, Contact, Client, directions, states }; 
    module.exports = mksms; 
})();
 
    

    
 

     
     

    
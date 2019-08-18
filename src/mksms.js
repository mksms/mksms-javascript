(function(){
    'use strict';
    const { Client } = require('./classes/Client');
    const { Contact } = require('./classes/Contact');
    const { Message } = require('./classes/Message');
    const { directions, states } = require('./config/config.json')
    var mksms = { Message, Contact, Client, directions, states }; 
    module.exports = mksms; 
})();
 
    

    
 

     
     

    
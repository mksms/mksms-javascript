'use strict';
var should = require('should');
const { Client } = require("../src/mksms.es5");
const {test_config,fake_message,good_message} = require('./data/data.json');
const args = require('yargs').argv;

if(args.key){
    test_config.api_key = args.key; 
}

if(args.hash){
    test_config.api_hash = args.hash;
}

if(args.number){
    good_message.to.number = args.number; 
}    

if(args.name){
    good_message.to.name = args.name; 
}
 
if(args.body){
    good_message.body = args.body; 
}

    describe('Test of Mksms API', function(){
       
        describe('mksms test  message',function(){
            it('should error on incorrect number',(done)=>{
                let client = new Client(test_config.api_key,test_config.api_hash);
                client.send_message(fake_message)
                .subscribe({
                    next:(rep)=>{
                        should.not.exist(rep);
                        done();
                    },
                    error:(error)=>{
                        should.exist(error);
                        done();
                    }
                })
            })
            it('should reponse on correct number',(done)=>{
                let client = new Client(test_config.api_key,test_config.api_hash);
                client.send_message(good_message)
                .subscribe({
                    next:(rep)=>{
                        should.exist(rep);
                        done()
                    },
                    error:(error)=>{
                        should.not.exist(error);
                        done();
                    }
                })
            })
        })
        
        describe('mksms test get message',function(){
            it('should reponse',(done)=>{
                let client = new Client(test_config.api_key,test_config.api_hash);
                client.get_messages()
                .subscribe({
                    next:(rep)=>{
                        should.not.exist(rep);
                        done();
                    },
                    error:(error)=>{
                        should.exist(error);
                        done();
                    }
                })
            })
        });
        describe('mksms test post start_verify MboateK with number 677456798',function(){
            it('shoul reponse success ',(done)=>{
                let client = new Client(test_config.api_key,test_config.api_hash);
                client.start_verify('677456798', 'MboateK')
                .subscribe({
                    next:(rep)=>{
                        should.exist(rep);
                       
                        done();
                    },
                    error:(error)=>{
                        should.not.exist(error);
                        done();
                    }
                })
            })
        });
        describe('mksms test post confirm_verify MboateK',function(){
            it('shoul reponse success ',(done)=>{
                let client = new Client(test_config.api_key,test_config.api_hash);
                client.confirm_verify('677456798', '12345')
                .subscribe({
                    next:(rep)=>{
                        should.exist(rep);
                       
                        done();
                    },
                    error:(error)=>{
                        should.not.exist(error);
                        done();
                    }
                })
            })
        });
        describe('mksms test get message from MboateK',function(){
            it('should reponse',(done)=>{
                let client = new Client(test_config.api_key,test_config.api_hash);
                client.get_messages()
                .subscribe({
                    next:(rep)=>{
                        should.exist(rep);
                        done();
                    },
                    error:(error)=>{
                        should.not.exist(error);
                        done();
                    }
                })
            })
        });

    })
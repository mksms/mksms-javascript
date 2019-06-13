'use strict';
var should = require('should');
var { Client } = require("../src/mksms.es5");
let test_config =  {api_key:'830EA3BB2A',api_hash:'73249341d85f566b6f2b8cef4563d6c149efe4df2b43f21776a6c9faf7f61af5'}

let fake_message ={
        to:{"number":"3698368636", "name":"fedim"},
        body:"Salut molah"
    };

let good_message ={
        to:{"number":"698368636g", "name":"fedim"},
        body:"Salut molah"
    };

 

    describe('mksms test api request', function(){
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
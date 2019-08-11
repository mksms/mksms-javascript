'use strict';
var should = require('should');
var { Client } = require("../src/mksms.es5");
let test_config =  {api_key:'BDCAA0C858',api_hash:'f7e88b92f324bdd09d195019053a2d613c3ae6c5b1dcadf988c2b18e75770530'}

let fake_message ={
        to:{"number":"3698368636", "name":"fedim"},
        body:"Salut molah"
    };

let good_message ={
        to:{"number":"698368636g", "name":"fedim"},
        body:"Salut molah"
    };

 

    describe('Test of Mksms API', function(){
        describe('conection ')
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
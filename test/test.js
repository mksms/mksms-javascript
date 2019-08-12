'use strict';
var expect = require('expect.js');
const { Client, Message, Contact,  directions, states } = require("../src/mksms.es5");
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

    describe('Test of mksms package', function(){
       describe('Test config data',function(){
            const config = require('../src/config/config.json');
            it('config must exist',(done)=>{
                expect(config).to.exist;  
                done();
            });
            it('config must be object',(done)=>{
                expect(config).to.be.an('object');
                
                done();
            })
            it('config must content keys end_points base_url directions states',(done)=>{
                expect(config).to.only.have.keys('end_points', 'base_url', 'directions', 'states');              
                done();                        
            });
            if(config.end_points){
                it('end_points proprity must be object',(done)=>{
                    expect(config.end_points).to.be.an('object');
                    done();
                });
                it('end_points must content keys send_sms get_sms start_verify confirm_verify',(done)=>{
                    expect(config.end_points).to.only.have.keys('send_sms','get_sms','start_verify','confirm_verify');              
                    done();                        
                });
                try{
                    it('end_points must only not empty string propiety',(done)=>{
                        expect(config.end_points.send_sms).to.be.an('string');
                        expect(config.end_points.send_sms).to.not.be.empty();
                        expect(config.end_points.get_sms).to.be.an('string');
                        expect(config.end_points.get_sms).to.not.be.empty();
                        expect(config.end_points.start_verify).to.be.an('string');
                        expect(config.end_points.start_verify).to.not.be.empty();
                        expect(config.end_points.confirm_verify).to.be.an('string');
                        expect(config.end_points.confirm_verify).to.not.be.empty();
                        done();   
                    })
                }
                catch(all){
                    console.log(all);
                }    
            }
            if(config.base_url){
                it('base_url proprity must be not empty string',(done)=>{
                    expect(config.base_url).to.be.an('string');
                    expect(config.base_url).to.not.be.empty();
                    done();
                });
            }
            if(config.directions){
                it('directions proprity must be object',(done)=>{
                    expect(config.directions).to.be.an('object');
                    done();
                });
                it('directions must content keys in out both',(done)=>{
                    expect(config.directions).to.only.have.keys('in','out','both');              
                    done();                        
                });
                try{
                    it('directions must have in propriety equal to -1, out 1 and both 0',(done)=>{
                        expect(config.directions.in).to.be.an('number');
                        expect(config.directions.in).to.be.equal(-1);
                        expect(config.directions.out).to.be.an('number');
                        expect(config.directions.out).to.be.equal(1);
                        expect(config.directions.both).to.be.an('number');
                        expect(config.directions.both).to.be.equal(0);
                        done();   
                    })
                }
                catch(all){
                    console.log(all);
                }
            }

            if(config.states){
                it('end_points proprity must be object',(done)=>{
                    expect(config.states).to.be.an('object');
                    done();
                });
                it('end_points must content keys read unread',(done)=>{
                    expect(config.states).to.only.have.keys('read','unread');              
                    done();                        
                });
                try{
                    it('end_points must only not empty string propiety',(done)=>{
                        expect(config.states.read).to.be.an('boolean');
                        expect(config.states.read).to.be.ok();
                        expect(config.states.unread).to.be.an('boolean');
                        expect(config.states.unread).to.not.be.ok();
                        done();   
                    })
                }
                catch(all){
                    console.log(all);
                }
            }
        });
        
        describe('Class instance Test',function(){
            it('can create instance of Contact ',function(done){ 
                expect(new Contact("ds","fdf")).to.be.an(Contact);
                done();
            });
            it('can create instance of Message ',function(done){ 
                expect(new Message({"number":"237633902321","name":"talla"},"ds")).to.be.an(Message);
                done();
            });
            it('can create instance of Client ',function(done){ 
                expect(new Client("ds","fdf")).to.be.an(Client);
                done();
            });
        })
       
        describe('mksms test  message',function(){
            this.timeout(1500);
  
            it('should reponse on correct number',(done)=>{
                let client = new Client(test_config.api_key,test_config.api_hash);
                client.send_message(good_message)
                .subscribe({
                    next:(rep)=>{
                        
                        expect(rep).to.have.property('success',true);
                        done();
                    },
                    error:(error)=>{
                        expect(error).to.not.ok();
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
                        expect(rep).to.exist; 
                        done();
                    },
                    error:(error)=>{
                        expect(error).to.not.ok();
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
                        expect(rep).to.exist;
                        expect(rep).to.have.property('success',true);
                        done();
                    },
                    error:(error)=>{
                        expect(error).to.not.ok();
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
                        expect(rep).to.exist;
                        expect(rep).to.have.property('success',true);
                        done();
                    },
                    error:(error)=>{
                        expect(error).to.not.ok();
                        done();
                    }
                })
            })
        });
    });
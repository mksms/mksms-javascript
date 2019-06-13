# mksms
this is mksms api implement in js to make thier easy utilisation. As a simple example, most of my code looks like this:

```javascript
    var mksms = require('mksms');
    const config = {
        api_key:"MY_API_KEY",
        api_hash:"MY_API_HASH"
    }
    let client = new mksms.Client(config.api_key,config.api_hash);
   
    client.send_message({to:{number:"+237692392932",name:"jean"},body:"hello"}).subscribe({
        error:(error)=>{
          //do any thing
        },
        next:(data)=>{
            //do any thing 
        },
        complete:(rep)=>{
            //do any thing
        }
    }); 
```

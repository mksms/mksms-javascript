# mksms
<p align="left">
  <a href="https://www.npmjs.com/package/mksms">
    <img src="https://img.shields.io/npm/v/mksms.svg" alt="npm version" height="18">
  </a>
  <a href="https://github.com/mksms/mksms-javascript/blob/master/LICENSE.md">
    <img src="https://img.shields.io/github/license/mksms/mksms-javascript.svg">
  </a>
</p>
This is the mksms API implement in js to make it easy to use.

## Table of contents
* [Getting Started](#getting-started)
* [Prerequisites](#prerequisites)
* [Installing](#installing)
* [Use package](#use-package)
* [import](#import)
    * [es2017](#with-es2017)
    * [es2015](#with-es2015)
    * [html](#in-your-html-web-page)
* [use](#use)
* [Authors](#authors)
* [License](#license)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
You need an `API_KEY` and `API_HASH`, get them on our website http://mksms.cm

### Installing
To install the package 
```shell
    $npm i mksms
```
 
## Use package
You can import the package in several ways depending on the version of js that you use and the situation. 
### import
#### with es2017
```javascript
    import * as mksms from 'mksms';
```
#### with es2015
```javascript
    var mksms = require('mksms');
```
#### in your html web page 
```html
<script src="/assets/dist/mksms.js"></script>
```
### use
```javascript
    
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
## Running the tests
```sh
    $npm test
```
## Authors
* **Eugene Fezeu** - *Initial work* - [@fez2000](https://github.com/fez2000)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

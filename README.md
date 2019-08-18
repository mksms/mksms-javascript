# Mksms

[![npm version](https://img.shields.io/npm/v/mksms.svg)](https://www.npmjs.com/package/mksms)
[![license](https://img.shields.io/github/license/mksms/mksms-javascript.svg)](https://github.com/mksms/mksms-javascript/blob/master/LICENSE.md)

This is the mksms API implement in js to make it easy to use.

## Table of contents

* [Getting Started](#getting-started)
* [Prerequisites](#prerequisites)
* [Installing](#installing)
* [Use package](#use-package)
* [Import](#import-in-nodejs)
* [Use](#use)
* [Test](#test)
  * [Launch the test](#launch-the-test)
  * [Set up the tests](#set-up-the-tests)
  * [Test results](#test-results)
* [Documentation of methods](#methods-docs)
  * [Get messages](#get-messages)
  * [Send messages](#send-messages)
  * [Start verify](#start-verify)
  * [Confirm verify](#Confirm-verify)
* [Authors](#authors)
* [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need an `API_KEY` and `API_HASH`, get them on our website [https://mksms.cm](https://mksms.cm)

### Installing

To install the package run

```sh
    $npm i mksms
```

## Use package

To use the package you must first import it. here is an example of import.

### Import in nodejs

```javascript
    const mksms = require('mksms');
```

or

```javascript
    const {Client, Message, Contact} = require('mksms');
```

### Use

```javascript

    const config = {
        api_key:"MY_API_KEY",
        api_hash:"MY_API_HASH"
    };
    let client = new mksms.Client(config.api_key,config.api_hash);

    client.send_message({
        to:{
            number:"+237692392932",
            name:"jean"
            },
        body:"hello"
    }).subscribe({
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

or

```javascript
    var config = {
        api_key:"MY_API_KEY",
        api_hash:"MY_API_HASH"
    };
    var contact = new Contact("+237692392932","jean");
    var message = new Message(contact,"hello");
    var client = new Client(config.api_key,config.api_hash);
    client.send_message(message);
```

## Test

This must be done to test the configurations and the proper functioning of the API.

### Launch the test

```sh
    $npm test
```

or to view test results in the browser

```sh
    $npm run test:browser
```

### Set up the tests

You can change the test configuration in the `./test/data/data.json` file.

```json
    {
        "test_config":{
            "api_key": "BDCAA0C858",
            "api_hash": "f7e88b92f324bdd09d195019053a2d613c3ae6c5b1dcadf988c2b18e75770530"
        },
        "fake_message":{
            "to":{
                "number":"697898466f",
                "name":"moi"
            },
            "body":"Salut molah"
        },
        "good_message" :{
            "to":{
                "number":"697898466",
                "name":"moi"
            },
            "body":"Salut molah"
        }
    }
```

or directly from the command line

```sh
    $npm run test --key="MY_API_KEY" --hash="MY_API_HASH" --number="number" --name="name" --body="message"
```

### Test results

In the console

![test_mksms_console_result](https://github.com/mksms/mksms-javascript/blob/master/test/result/mksms_test_js_console_result.png)

In the [browser](https://github.com/mksms/mksms-javascript/blob/master/test/index.html)

![test_mksms_browser_result](https://github.com/mksms/mksms-javascript/blob/master/test/result/mksms_js_test_browser_result.png)

**NB**: *the api test fails if api_key and api_hash are not valid*.

## Methods docs

### Get messages

|Params |Type |Default value |Required |
|----|----|----|----|----|
|min_date |Date |null |not required |
|direction | number | -1 |not required |
|read |boolean |false |not required |
|timestamp | Date |null |not required |

* name: **get_messages**
* return: Promise< Array >

```json
   []
```

### Send messages

|Params |Type |Default value |Required |
|----|----|----|----|----|
|message|Message | |true|

* name: **send_messages**
* return: Promise< Object >

```json
   {
     "success": true,
     "cost": 1
   }
```

or there is an error

```json
  {
     "success": false,
     "message": "Invalid ..."
  }
```

### Start verify

|Params |Type |Default value |Required |
|----|----|----|----|----|
|number|string | |true|
|name|string | |true|

* name: **start_verify**
* return: Promise< Object>

```json
   {
     "success": true
   }
```

or there is an error

```json
  {
     "success": false,
     "message": "Invalid ..."
  }
```

### Confirm verify

|Params |Type |Default value |Required |
|----|----|----|----|----|
|number|string | |true|
|code|string | |true|

* name: **confirm_verify**
* return: Promise< Object >

```json
   {
     "success": true
   }
```

or there is an error

```json
  {
     "success": false,
     "message": "Invalid ..."
  }
```

## Authors

* **Eugene Fezeu** - *Initial work* - [@fez2000](https://github.com/fez2000)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

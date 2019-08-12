# Mksms

[![npm version](https://img.shields.io/npm/v/mksms.svg)](https://www.npmjs.com/package/mksms)
[![license](https://img.shields.io/github/license/mksms/mksms-javascript.svg)](https://github.com/mksms/mksms-javascript/blob/master/LICENSE.md)

This is the mksms API implement in js to make it easy to use.

## Table of contents

* [Getting Started](#getting-started)
* [Prerequisites](#prerequisites)
* [Installing](#installing)
* [Use package](#use-package)
* [Import](#import)
  * [es2017](#with-es2017)
  * [es2015](#with-es2015)
* [Use](#use)
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

You can import the package in several ways depending on the version of js that you use and the situation.

### Import

#### With es2017

```javascript
    import * as mksms from 'mksms';
```

#### With es2015

```javascript
    var mksms = require('mksms');
```

### Use

```javascript

    const config = {
        api_key:"MY_API_KEY",
        api_hash:"MY_API_HASH"
    }
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

## Running the tests

```sh
    $npm test
```

or

```sh
    $npm run test:browser
```

## Authors

* **Eugene Fezeu** - *Initial work* - [@fez2000](https://github.com/fez2000)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

# A Nodejs Express Website on IBM i

![FormaServe Logo](https://github.com/AndyYouens/NodeExpress-IBMi/blob/master/public/images/Logo.png)

> This repo contains a NodeJS Express website that runs on IBM i.
>
> It shows full database maintenance features of a table/physical file on the IBM i

## Pre-reqs

> Requires Node.js on IBM i at least version 8

## Install Instructions

These commands need to be run in a **QSHELL** session on your **IBM i**

Issue the following command to install clone the repo

```bash
#!/bin/bash
git clone https://github.com/AndyYouens/NodeExpress-IBMi.git

```

CD into directory

```bash
#!/bin/bash
cd \NodeExpress-IBMi
```

Install dependancies

```bash
#!/bin/bash
npm install
```

Generate SSL Certificates\
Need to swap over to certs directory & generate SSL certs

```bash
#!/bin/bash
cd certs
openssl genrsa -out privatekey.pem 2048
openssl req -new -key privatekey.pem -out certrequest.csr
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem -days 730
```

Generate Tables\
In the **public\sql** directory, run the employee.sql script in IBMs Access for Client Solutions (ACS)\
This will create the table needed for this application.

```bash
#!/bin/bash
cd certs
openssl genrsa -out privatekey.pem 2048
openssl req -new -key privatekey.pem -out certrequest.csr
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem -days 730
```

Start application

```bash
#!/bin/bash
npm start
```

Point your browser to [https://your_ibmi:3333](https://your_ibmi:3333)

## Authors

> FormaServe Systems Ltd - _All work_ - [FormaServe](https://www.formaserve.co.uk)

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- **© 1990 - 2021 [FormaServe Systems Ltd](https://www.formaserve.co.uk)**

## Acknowledgments

> Andy Youens - FormaServe Systems Ltd - Twitter [@AndyYouens](https://twitter.com/AndyYouens)

## Published PowerWire Article

> May 2020

## Copyright

> © 1990 - 2021 FormaServe Systems Ltd

## Open Source on IBM i - Oh Yea

:wink:

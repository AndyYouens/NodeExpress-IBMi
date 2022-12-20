# A Nodejs Express Website on IBM i

<img src="/public/images/Logo.png" align="right">

This repo contains a NodeJS Express website that runs on IBM i.
It shows full database maintenance features of a table/physical file on the IBM i

## Pre-reqs

This application requires Node.js on IBM i at least version 8

## Install Instructions

These commands need to be run in a **QSHELL or (preferably) SSH** session on your **IBM i**.
If using QSH, you must first set the `QIBM_MULTI_THREADED` environment variable to `Y` before
starting your QSH session.

```matlab
ADDENVVAR ENVVAR(QIBM_MULTI_THREADED) VALUE(Y) REPLACE(*YES)
```
If you do not, commands may fail with `qsh: 001-0078 Process ended by signal 5.`.

### Clone the repository
Issue the following command to clone the repo

```bash
git clone https://github.com/AndyYouens/NodeExpress-IBMi.git

```

### Move into the new directory

```bash
cd NodeExpress-IBMi
```

### Install all dependancies

```bash
npm install
```

### Generate SSL Certificates
Need to swap over to certs directory & generate SSL certs

```bash
pushd certs
openssl genrsa -out privatekey.pem 2048
openssl req -new -key privatekey.pem -out certrequest.csr
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem -days 730
popd
```

### Generate Schema & Tables

To create the schema & tables, then, populate with sample data, run the following command

```bash
system "RUNSQLSTM SRCSTMF('public/sql/employee.sql')"
```

### Start application

```bash
npm start
```
or to run in debug mode

```bash
npm run debug
```

### Point your browser to the application
Point your browser to [https://your_ibmi:3333](https://your_ibmi:3333)

and hopefully, you will see the application running on the IBM i & you can maintain the table within it.

## 🧑‍🏫 Still Training

We are still providing IBM i training in these strange times.  [Get in contact here.](https://www.formaserve.co.uk/location.php)

If you have any questions or comments, we will be happy to help you.

## 📹 Our IBM i Training Videos

While you are here, why not visit our training videos, which can be found [here.](https://learning.formaserve.co.uk)

## ✔️ YouTube Videos

- Our YouTube channel can be found [here.](https://www.youtube.com/FormaServeSystemsLtdLoughton)
- Subscribe to our YouTube channel to get the latest news &amp; updates on our Training videos at this [link.](https://www.youtube.com/FormaServeSystemsLtdLoughton?sub_confirmation=1 )

## Authors

FormaServe Systems Ltd - _All work_ - [FormaServe](https://www.formaserve.co.uk)

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- **© 1990 - 2021 [FormaServe Systems Ltd](https://www.formaserve.co.uk)**

## Acknowledgments

Andy Youens - FormaServe Systems Ltd

## 🚩 Connect with us

- LinkedIn: https://linkedin.com/in/andyyouens
- Twitter: https://twitter.com/AndyYouens
- Twitter: https://twitter.com/FormaServe
- Website: https://learning.formaserve.co.uk
- Website: https://www.formaserve.co.uk

<p>
  <h2 align="left">☕Support</h2>
  <p>
    <a href="https://ko-fi.com/AndyYouens">
      <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" height="50" width="210" alt="coffee"/>
    </a>
  </p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
</p>

## Copyright

© 1990 - 2022 FormaServe Systems Ltd

## Open Source on IBM i - Oh Yea

:wink:

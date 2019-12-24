var express = require('express');
var router = express.Router();

/* GET signon page. */
router.get('/', function(req, res, next) {
  var title = 'Intranet Signon';

  const { Connection, Statement } = require('idb-pconnector');

  // Show results to log - Demo purposes Only!
  // console.log(`Employee Results: ${JSON.stringify(employees, null, 4)}`)

  // Render Signon Screen
  res.render('signon', {
    title
  });
});

/* POST signon page. */
router.post('/', function(req, res, next) {
  let title = 'Logged On Successfully!';
  let errorFlag = false;

  // get post vars
  let userID = req.body.userID;
  let password = req.body.password;

  console.log(`Varifying User: ${req.body.userID}`);

  var xt = require('itoolkit');
  var conn = new xt.iConn('*LOCAL');

  if (!conn) {
    console.error('Connection Failed!');
    throw new Error('Connection Failed!');
  } else {
    console.log('Connection complete');
  }
  // throw new Error('Die User:' + userID);

  // call IBM API
  var pgm = new xt.iPgm('QSYGETPH', { lib: 'QSYS', error: 'on' });
  pgm.addParam(padding_right(userID.toUpperCase(), ' ', 10), '10A');
  pgm.addParam(padding_right(password, ' ', 50), '50A');
  pgm.addParam(' ', '12A', { io: 'out', hex: 'on' });
  pgm.addParam([[0, '10i0'], [0, '10i0'], [' ', '7A'], [' ', '1A'], [' ', '256A']]);
  pgm.addParam(50, '10i0');
  pgm.addParam(-1, '10i0');

  conn.add(pgm.toXML());

  conn.run(function(rsp) {
    console.log('Running API');
    let results = xt.xmlToJson(rsp);
    console.log(`Results: ${JSON.stringify(results, null, 4)}`);

    // results sent back as array, pickup first element
    let resultarray = results[0];
    // console.log(`Result array: ${JSON.stringify(resultarray, null, 4)}`);
    // console.log(`Success?: ${resultarray.success}`);

    // let rc = results.success;

    if (resultarray.success) {
      console.log('Login Success');
    } else {
      console.error('Login Failed');
      title = 'Log On Failed!';
    }

    // Render signon
    res.render('signon', {
      title
    });
  });
});

function padding_right(s, c, n) {
  if (!s || !c || s.length >= n) {
    return s;
  }
  var max = (n - s.length) / c.length;
  for (var i = 0; i < max; i++) {
    s += c;
  }
  return s;
}

module.exports = router;

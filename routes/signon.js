var express = require('express');
var router = express.Router();
const session = require('client-sessions');

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
    // console.log('Connection complete');

    // call IBM API
    var pgm = new xt.iPgm('QSYGETPH', { lib: 'QSYS', error: 'on' });
    // pgm.addParam(padding_right(userID.toUpperCase(), ' ', 10), '10A');
    pgm.addParam(userID.toUpperCase(), '10A');
    pgm.addParam(password, '50A');
    // pgm.addParam(padding_right(password, ' ', 50), '50A');
    pgm.addParam(' ', '12A', { io: 'out', hex: 'on' });
    pgm.addParam([[0, '10i0'], [0, '10i0'], [' ', '7A'], [' ', '1A'], [' ', '256A']]);
    pgm.addParam(50, '10i0');
    pgm.addParam(-1, '10i0');

    conn.add(pgm.toXML());

    conn.run(function(rsp) {
      let results = xt.xmlToJson(rsp);
      // console.log(`Results: ${JSON.stringify(results, null, 4)}`);

      // results sent back as array, pickup first element
      let resultarray = results[0];

      if (resultarray.success) {
        console.log(`${userID} Has Logged In`);
        // store details in session
        req.fssession.userID = userID;
      } else {
        console.error(`Login Failed for ${userID}`);
        title = 'Log On Failed!';
        req.fssession.reset(); // get rid of session stuff
      }

      // Render signon
      res.render('signon', { title });
    });
  }
});

module.exports = router;

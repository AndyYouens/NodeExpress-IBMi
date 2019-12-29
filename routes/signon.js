var express = require('express');
var router = express.Router();
const session = require('client-sessions');
const { Connection, Statement } = require('idb-pconnector');

/* GET signon page. */
router.get('/', function(req, res, next) {
  let title = 'PowerWire Intranet Signon';
  let accessFlag = false;

  // Render Signon Screen
  res.render('signon', {
    title,
    accessFlag
  });
});

/* POST signon page. */
router.post('/', function(req, res, next) {
  let title = 'Logged On Successfully!';
  let errorFlag = false;
  let accessFlag = false;

  // get post vars
  let userID = req.body.userID;
  let password = req.body.password;

  console.log(`Varyifying User: ${req.body.userID}`);

  var xt = require('itoolkit');
  var conn = new xt.iConn('*LOCAL');

  if (!conn) {
    console.error('Connection Failed!');
    throw new Error('Connection Failed!');
  } else {
    // call IBM API
    var pgm = new xt.iPgm('QSYGETPH', { lib: 'QSYS', error: 'on' });
    pgm.addParam(userID.toUpperCase(), '10A');
    pgm.addParam(password, '50A');
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
        req.fssession.accessFlag = true;
        accessFlag = true;
        title = `${req.fssession.userID} Is Authorised`;
      } else {
        console.error(`Login Failed for ${userID}`);
        title = 'Log On Failed!';
        req.fssession.reset(); // get rid of session stuff
        accessFlag = false;
      }

      // Render Signon Screen
      res.render('signon', {
        title,
        accessFlag
      });
    });
  }
});

module.exports = router;

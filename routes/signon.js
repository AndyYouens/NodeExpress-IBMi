const express = require('express');
const router = express.Router();
const xt = require('itoolkit');
const debug = require('debug')('powerweb:signon')

/* GET signon page. */
router.get('/', function(req, res, next) {

  let title = 'PowerWire Intranet Signon';
  let accessFlag = false;  // Force signon inputs

  // Render Signon Screen
  res.render('signon', {
    title,
    accessFlag
  });

});

/* POST signon page. */
router.post('/', function(req, res, next) {

  let title = 'Logged On Successfully!';
  let accessFlag = false;

  // get post vars
  let userID = req.body.userID;
  let password = req.body.password;

  debug(`Varyifying User: ${req.body.userID}`);

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

      debug(`Rsp Results: ${JSON.stringify(results, null, 2)}`);

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

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = 'Intranet Signon';

  const { Connection, Statement } = require('idb-pconnector');

  // Show results to log - Demo purposes Only!
  // console.log(`Employee Results: ${JSON.stringify(employees, null, 4)}`)

  // Render Employees
  res.render('signon', {
    title
  });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  var title = 'Logged On Successfully!';

  const { Connection, Statement } = require('idb-pconnector');

  // Render signon
  res.render('signon', {
    title
  });
});

module.exports = router;

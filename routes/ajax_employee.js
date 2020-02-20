var express = require('express')
var router = express.Router()
const session = require('client-sessions')
const { Connection, Statement, IN, NUMERIC, CHAR } = require('idb-pconnector')
const schema = 'HRDATA'

/* POST home page. */
router.post('/', function(req, res, next) {
  console.log('--> Into ajax_employee post')

  var isAjaxRequest = req.xhr
  console.log(`Have we got an Ajax Call? ${isAjaxRequest}`)

  // Check if this is an Ajax call
  if (isAjaxRequest) {
    // get post vars
    let action = req.body.action

    // Check action
    if (action == 'delete') {
      let emid = req.body.emid
      console.log(`Deleting Employee ID: ${emid}`)

      async function execDelete(emid) {
        const connection = new Connection({ url: '*LOCAL' })
        const statement = new Statement(connection)

        let sql = `delete from ${schema}.employee where emid = ${emid}`

        await statement.prepare(sql)

        await statement.execute(sql)

        res.send('ok')
      }

      execDelete(emid).catch(error => {
        console.error(`Unable to delete employee ${emid} - Error: ${error}`)
        res.send('error')
      })
    }
  } else {
    // setup error messages & display error page
    console.error('Ajax Header called directly!')
    let message = 'Ajax Header called directly!'
    let error = []
    error.status = 'Direct call not an AJAX call'
    error.stack = 'You cannot directly call an AJAX function'

    // Output to browser
    res.render('error', { message, error })
  }
})

module.exports = router

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

  // get post vars
  let emid = req.body.emid
  let action = req.body.action

  // Check action
  if (action == 'delete') {
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
})

module.exports = router

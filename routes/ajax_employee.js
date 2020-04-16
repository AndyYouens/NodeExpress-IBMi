var express = require('express')
var router = express.Router()
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

    // Delete Functionality
    if (action === 'delete') {
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

    // Update Functionality
    if (action === 'update') {
      let emid = req.body.emid
      let emfir = req.body.emfir
      let emsur = req.body.emsur
      let emdep = req.body.emdep
      let fullName = req.body.emfir.trim() + ' ' + req.body.emsur.trim()

      async function execUpdate(emid) {
        console.log(`Updating Employee ID: ${emid} ${fullName} - Dep: ${emdep}`)
        const connection = new Connection({ url: '*LOCAL' })
        const statement = new Statement(connection)

        let sql = `update ${schema}.employee set emdep = ?, emsur = ?, emfir = ?  where emid = ?`

        await statement.prepare(sql)

        await statement.bindParam([[`${emdep}`, IN, CHAR], [`${emsur}`, IN, CHAR], [`${emfir}`, IN, CHAR], [`${emid}`, IN, NUMERIC]])

        await statement.execute(sql)

        res.send('ok')
      }

      execUpdate(emid).catch(error => {
        console.error(`Unable to update employee ${emid} - Error: ${error}`)
        res.send('error')
      })
    }

    // Add Functionality
    if (action === 'add') {

      let emfir = req.body.emfir
      let emsur = req.body.emsur
      let emdep = req.body.emdep
      let fullName = req.body.emfir.trim() + ' ' + req.body.emsur.trim()

      async function execAdd() {

        console.log(`Adding Employee: ${fullName} - Dep: ${emdep}`)

        const connection = new Connection({ url: '*LOCAL' })
        const statement = new Statement(connection)

        let sql = `insert into ${schema}.employee (emsur, emfir, emdep) values(?,?,?)`

        await statement.prepare(sql)

        await statement.bindParam([[`${emsur}`, IN, CHAR], [`${emfir}`, IN, CHAR], [`${emdep}`, IN, CHAR]])

        await statement.execute(sql)

        res.send('ok')
      }

      execAdd().catch(error => {
        console.error(`Unable to add employee - Error: ${error}`)
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

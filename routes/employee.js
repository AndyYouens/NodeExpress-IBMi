const express = require('express')
const router = express.Router()
const session = require('client-sessions')
const { Connection, Statement } = require('idb-pconnector')
const debug = require('debug')('powerweb:employee')
const schema = 'HRDATA'
var title = 'Employee Database'

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('--> Into employee GET')

  // Dev only check session cookie
  debug(`Session Cookie:  ${JSON.stringify(req.fssession, null, 4)}`)

  // we got a user signed in?
  if (typeof req.fssession.userID !== 'undefined' && req.fssession.userID) {
    async function execEmployees() {
      let sql = `select * from ${schema}.employee where EMCTY = 'UK' order by Upper(EMSUR)`

      const connection = new Connection({ url: '*LOCAL' })
      const statement = new Statement(connection)

      const employees = await statement.exec(sql)

      // Show results to log - Debug Only!
      debug(`Employee Results: ${JSON.stringify(employees, null, 2)}`)

      // Render Employees
      res.render('employee', { title, output: employees })
    }

    execEmployees().catch(error => {
      console.log(error)
    })
  } else {
    console.error('No User Is Signed In')
    title = 'Employee Database - Not Authorised!'
    let notAuthorised = {}

    // Render Employees
    res.render('employee', {
      title,
      output: notAuthorised
    })
  }
})

module.exports = router

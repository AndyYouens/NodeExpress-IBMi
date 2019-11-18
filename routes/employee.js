var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  var title = 'Employee Database'

  const { Connection, Statement } = require('idb-pconnector')

  async function execEmployees () {
    let schema = 'HRDATA'

    let sql = `select * from ${schema}.employee where EMCTY = 'UK' order by EMSUR`

    const connection = new Connection({ url: '*LOCAL' })
    const statement = new Statement(connection)

    const employees = await statement.exec(sql)

    // Show results to log - Demo purposes Only!
    console.log(`Employee Results: ${JSON.stringify(employees, null, 4)}`)

    // Render Employees
    res.render('employee', {
      title,
      output: employees
    })
  }

  execEmployees().catch(error => {
    console.log(error)
  })
})

module.exports = router

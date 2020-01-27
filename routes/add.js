var express = require('express')
var router = express.Router()
const session = require('client-sessions')
const { Connection, Statement, IN, NUMERIC, CHAR } = require('idb-pconnector')

/* GET signon page. */
router.get('/', function(req, res, next) {
  let title = 'Add New Employee'

  // Render Signon Screen
  res.render('add', { title })
})

/* POST signon page. */
router.post('/', function(req, res, next) {
  // get post vars
  let emtel = req.body.emtel
  let emfir = req.body.emfir
  let emsur = req.body.emsur
  let emdob = req.body.emdob
  let title = `Added ${emfir} ${emsur} to our Employees`

  console.log(`Adding User: ${emfir} ${emsur} DOB: ${emdob} `)

  async function execInsert() {
    let schema = 'HRDATA'

    const connection = new Connection({ url: '*LOCAL' })
    const statement = new Statement(connection)

    let sql = `insert into ${schema}.employee (emsur, emfir, emtel, emdob) values(?,?,?,?)`

    await statement.prepare(sql)

    await statement.bindParam([[`${emsur}`, IN, CHAR], [`${emfir}`, IN, CHAR], [`${emtel}`, IN, CHAR], [`${emdob}`, IN, CHAR]])

    await statement.execute(sql)

    // Render Screen
    res.render('add', {
      title
    })
  }

  execInsert().catch(error => {
    console.log(error)
    title = 'Errors occurred - Unable to add employee - Please check logs'
    res.render('add', { title })
  })
})

module.exports = router

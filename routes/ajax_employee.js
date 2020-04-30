const express = require('express')

const router = express.Router()
const debug = require('debug')
const { Connection, Statement, IN, NUMERIC, CHAR } = require('idb-pconnector')

const schema = 'HRDATA'

/* POST home page. */
router.post('/', function (req, res, next) {
  console.log('--> Into ajax_employee post')

  const isAjaxRequest = req.xhr
  console.log(`Have we got an Ajax Call? ${isAjaxRequest}`)

  // Check if this is an Ajax call
  if (isAjaxRequest) {
    // get post consts
    const { action } = req.body

    // Delete Functionality
    if (action === 'delete') {
      const { emid } = req.body
      console.log(`Deleting Employee ID: ${emid}`)

      async function execDelete(emid) {
        const connection = new Connection({ url: '*LOCAL' })
        const statement = new Statement(connection)

        const sql = `delete from ${schema}.employee where emid = ${emid}`

        await statement.prepare(sql)

        await statement.execute(sql)

        res.send('ok')
      }

      execDelete(emid).catch((error) => {
        console.error(`Unable to delete employee ${emid} - Error: ${error}`)
        res.send('error')
      })
    }

    // Update Functionality
    if (action === 'update') {
      const { emid } = req.body
      const { emfir } = req.body
      const { emsur } = req.body
      const { emdep } = req.body
      const fullName = `${req.body.emfir.trim()} ${req.body.emsur.trim()}`

      async function execUpdate(emid) {
        console.log(`Updating Employee ID: ${emid} ${fullName} - Dep: ${emdep}`)
        const connection = new Connection({ url: '*LOCAL' })
        const statement = new Statement(connection)

        const sql = `update ${schema}.employee set emdep = ?, emsur = ?, emfir = ?  where emid = ?`

        await statement.prepare(sql)

        await statement.bindParam([
          [`${emdep}`, IN, CHAR],
          [`${emsur}`, IN, CHAR],
          [`${emfir}`, IN, CHAR],
          [`${emid}`, IN, NUMERIC],
        ])

        await statement.execute(sql)

        res.send('ok')
      }

      execUpdate(emid).catch((error) => {
        console.error(`Unable to update employee ${emid} - Error: ${error}`)
        res.send('error')
      })
    }

    // Add Functionality
    if (action === 'add') {
      const { emfir } = req.body
      const { emsur } = req.body
      const { emdep } = req.body
      const fullName = `${req.body.emfir.trim()} ${req.body.emsur.trim()}`

      async function execAdd() {
        console.log(`Adding Employee: ${fullName} - Dep: ${emdep}`)

        const connection = new Connection({ url: '*LOCAL' })
        const statement = new Statement(connection)

        const sql = `insert into ${schema}.employee (emsur, emfir, emdep) values(?,?,?)`

        await statement.prepare(sql)

        await statement.bindParam([
          [`${emsur}`, IN, CHAR],
          [`${emfir}`, IN, CHAR],
          [`${emdep}`, IN, CHAR],
        ])

        await statement.execute(sql)

        res.send('ok')
      }

      execAdd().catch((error) => {
        console.error(`Unable to add employee - Error: ${error}`)
        res.send('error')
      })
    }
  } else {
    // setup error messages & display error page
    console.error('Ajax Header called directly!')
    const message = 'Ajax Header called directly!'
    const error = []
    error.status = 'Direct call not an AJAX call'
    error.stack = 'You cannot directly call an AJAX function'

    // Output to browser
    res.render('error', { message, error })
  }
})

module.exports = router

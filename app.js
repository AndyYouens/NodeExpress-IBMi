/**
 *  PowerWire Article on Node.js on IBM i
 *
 *  Author: Andy Youens FormaServe Systems Ltd
 *  https://www.formaserve.co.uk
 *
 */

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('client-sessions')

// routing bits
const indexRouter = require('./routes/signon')
const employeeRouter = require('./routes/employee')
const signonRouter = require('./routes/signon')
const ajaxEmployeeRouter = require('./routes/ajax_employee')

const app = express()

// Setup session stuff
app.use(
  session({
    cookieName: 'fssession',
    secret: 'powerwiresecret',
    duration: 4 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
    httpOnly: true,
    secure: true,
    ephemeral: true,
  })
)

// pickup FormaServe icon
app.use('/favicon.ico', express.static('images/favicon.ico'))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/employee', employeeRouter)
app.use('/signon', signonRouter)
app.use('/', signonRouter)
app.use('/ajax_employee', ajaxEmployeeRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

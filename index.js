// Exportando módulos externos
const express = require('express')
const hbs = require('express-handlebars')
const flash = require('express-flash')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

// Exportando modulo de conexão com BD:
const connect = require('./database/connect')

// Exportando models:

// Exportando controllers
const Main = require('./controllers/Main')

const app = express()

app.engine('handlebars', hbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(
    session({
        name: "session",
        secret: "Connect-Session",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'session'), 
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now * 360000),
            httpOnly: true,
        }
    })
)

app.use(flash())

app.get('/', Main.principal)

connect.sync().then(() => app.listen(3000))
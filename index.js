// importando módulos externos
const express = require('express')
const hbs = require('express-handlebars')
const flash = require('express-flash')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

// importando modulo de conexão com BD:
const connect = require('./database/connect')

// importando models:
const Admin = require('./models/Admin')
const User = require('./models/User')
const Divulcacao = require('./models/Divulgacao')
const Mural = require('./models/Mural')
const Reclamacao = require('./models/Reclamacao')
const Servico = require('./models/Servico')
const Sugestao = require('./models/Sugestao')

// importando controllers
const Main = require('./controllers/Main')

// Importando routers
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const divulgaRouter = require('./routes/divulgaRouter')
const muralRouter = require('./routes/muralRouter')
const reclamacaoRouter = require('./routes/reclamacaoRouter')
const servicosRouter = require('./routes/servicoRouter')
const sugestaoRouter = require('./routes/sugestaoRouter')

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

app.use(function (req, res, next) {

    if (req.session.adminid) {
        res.locals.session = req.session

    } else{
        if (req.session.userid) {
            res.locals.session = req.session
        }
    }

    next()
})

app.use('/divulgar', divulgaRouter)

app.use('/adm', adminRouter)

app.use('/mural', muralRouter)

app.use('/rec', reclamacaoRouter)

app.use('/serv', servicosRouter)

app.use('/sugestao', sugestaoRouter)

app.use('/', userRouter)

app.get('/', Main.principal)

connect.sync().then(() => app.listen(3000))

/*Usado na primeira carga da aplicação ou quando houver a necessidade de reset ou mudança no banco */
//connect.sync({force: true}).then(() => app.listen(3000))
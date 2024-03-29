import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import linkedinRouter from './routers/linkedin.router.js'
import secretRouter from './routers/secret.router.js'
import dotenv from 'dotenv'
dotenv.config()

export const app = express()

app.use(session({
    secret: 'signin-auth-4-nc',
    resave: true,
    saveUninitialized: true
}))

app.use(express.static(__dirname + "/public"))
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname + "/views"))
app.set('view engine', 'handlebars')

app.get('/', (req, res, next) => {
    if (req.session.user) return res.redirect('/secret')
    next()
}, (req, res) => res.render('index'))
app.use('/secret', (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
    next()
}, secretRouter)
app.use('/api/linkedin', linkedinRouter)

app.listen(8080, () => console.log('Server Up!'))
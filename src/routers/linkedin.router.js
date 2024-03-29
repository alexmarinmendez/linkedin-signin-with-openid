import { Router } from 'express'
import { Authorization, Redirect } from '../helpers/authHelper.js'

const router = Router()

router.get('/authorize', (req, res) => res.redirect(Authorization()))
router.get('/redirect', async (req, res) => {
    const response = await Redirect(req.query.code)
    if (!response) return res.redirect('/')
    req.session.user = response
    res.redirect('/secret')
})
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
            res.status(500).render('error', {error: err})
        } else res.redirect('/')
    })
})

export default router
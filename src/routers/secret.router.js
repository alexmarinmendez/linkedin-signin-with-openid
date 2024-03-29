import  { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.render('profile', {
        firstname: req.session.user.given_name,
        lastname: req.session.user.family_name,
        email: req.session.user.email,
        picture: req.session.user.picture
    })
})

export default router
module.exports.verificaUser = function (req, res, next) {

    const userid = req.session.userid

    if (!userid) {
        res.redirect('/login')

        return
    }

    next()
    
}
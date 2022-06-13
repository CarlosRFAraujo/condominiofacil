module.exports.verificaAdmin = function (req, res, next) {

    const adminid = req.session.adminid

    if (!adminid) {
        res.redirect('/adm/loginAdmin')
    }

    next()
    
}
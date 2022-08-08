module.exports.hasAdmin = function (admin, req, res, next) {

    if (!admin) {
        req.flash('mensagem', 'Usuário/CPF de usuário não encontrado')
        res.render('sindico/login')

        return
    }

    next()
}
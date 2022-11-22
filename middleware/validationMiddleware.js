module.exports = (req, res, next) => {
    if (req.files == null || req.body.tittle == null) {
        return res.redirect('/posts/new')
    }
    next()
}
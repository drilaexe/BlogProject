module.exports = (req, res, next) => {
    const validationErrors = [];
    if (req.files == null){
        validationErrors.push('Picture is required')
    }
    if (req.body.tittle == null || req.body.tittle == ""  ){
        validationErrors.push('Tittle is required')
    }
 
    if (req.files == null || req.body.tittle == null) {
        req.flash('validationErrors',validationErrors);  
        return res.redirect('/posts/new')
    }
    next()
}
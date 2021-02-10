function Auth(req,res,next){
    if(req.session.user != undefined){
        next()
    }else{
        res.redirect('register')
    }
}

module.exports = Auth
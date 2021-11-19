const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        
        const token = req.cookies['auth_token']
       
        if (!token) return res.status(403).redirect('/login')

        jwt.verify(token,process.env.JWT_KEY, (err, user) => {
            if (err) return res.status(403).render('user/login',{msg:""})
           
            req.user = user
            next();
        })
    } catch (error) {
        res.status(400).render('error', { msg: "Invalid token" })
    }
}
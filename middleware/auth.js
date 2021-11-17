const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.cookies['auth_token']

        if (!token) return res.status(403).render('error', { msg: "Access denied." })

        jwt.verify(token,process.env.JWT_KEY, (err, admin) => {
            if (err) return res.status(403).render('error', { msg: "Token Error" })
            req.admin = admin
            next();
        })
    } catch (error) {
        res.status(400).render('error', { msg: "Invalid token" })
    }
}
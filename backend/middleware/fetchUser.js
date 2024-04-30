const JWT = require("jsonwebtoken")

const JWT_SECRET = "VihariTravelSite"

const fetchuser = ((req, res, next) => {
    //  Get the user from the jwt tokne and add id to req obj
    const token = req.header('auth-token')
    if (!token) {
        res.send('Access denied')
    }
    try { 
        const data = JWT.verify(token, JWT_SECRET)
        req.user = data.user;
        next()

    } catch (error) {
        res.json({ error: "Pleasse authenticate using valid token" })
    }
})
module.exports = fetchuser;
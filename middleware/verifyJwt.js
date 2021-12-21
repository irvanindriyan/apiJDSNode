require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require("../database/models")
const Blacklist = db.Blacklist;

const verifyToken = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        if (token != undefined) {
            const checkBlackList = await Blacklist.findOne({ where: { token } });
            if (checkBlackList) {
              return res.send({
                status: 401,
                message: 'Your token is blacklist, please login again'
              }).status(401)
            }
        }
        
        jwt.verify(token, process.env.JWT_KEY, (error) => {
            if (error) {
                return res.send({ 
                    status: 500, 
                    data: error 
                }).status(500)
            }

            next()
        })
    } else {
        res.send({
            status: 401,
            message: 'Token required'
        }).status(401)
    }
}

module.exports = { verifyToken }

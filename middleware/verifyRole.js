const jwt_decode = require('jwt-decode');

const verifyRole = async (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
    const dataJwt = jwt_decode(token);

	if (dataJwt.userToken.role != 'admin') {
		res.send({
            status: 422,
            message: 'Request must be admin !'
        }).status(422)
	}

	next();
}

module.exports = { verifyRole }
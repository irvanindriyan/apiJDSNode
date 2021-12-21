const verifyRole = async (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    dataJwt = JSON.parse(jsonPayload);

	if (dataJwt.userToken.role != 'admin') {
		res.send({
            status: 422,
            message: 'Request must be admin !'
        }).status(422)
	}

	next();
}

module.exports = { verifyRole }
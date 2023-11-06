const HttpError = require("../../model/httpError")
const jwt = require("jsonwebtoken")

const authentication = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("token is", token)

        if (!token) {
            throw new HttpError("Authentication failed", 401);
        }

        const decodedToken = await jwt.verify(token, "this-is-secretkey");

        if (!decodedToken) {
            throw new HttpError("Invalid token", 401);
        }

        console.log(decodedToken)
        req.adminId = decodedToken.adminId;

        next();
    } catch (error) {
        return next(new HttpError("server error in authentication", 500))
    }
}

module.exports = {authentication}
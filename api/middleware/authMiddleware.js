const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const auth = req.get("authorization");
    let token;

    console.log(auth);

    if (auth && auth.toLowerCase().startsWith("bearer"))
        token = auth.substr(7);


    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedtoken) => {
            if (err) {
                res.status(404).json({ error: "No posees la autorizacion" });
            } else {
                next();
            }
        });
    } else {
        res.status(404).json({ error: "No posees la autorizacion" });
    }
};

module.exports = authMiddleware;
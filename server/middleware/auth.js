import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        if (token && isCustomAuth) {
            const decodedData = jwt.verify(token, "test");
            req.userId = decodedData?.id;
            req.userEmail = decodedData?.email;
        }
        else {
            const decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
        res.status(500).json({ message: "Unothorized to make requests! Please sign in." });        
    } catch (error) {
        console.log(error.message);
    }
};

export default auth;
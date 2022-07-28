const { verifyToken } = require("../utils/authToken.js");

const authenticateAdmin = async (req,res,next) => {
    try{
    const token = req.headers.authorization;
    if(!token){
        res.status(400).json({
            status: false,
            message: "Authorization failed, token not found",
        });
        return;
    }

    const result = verifyToken(token);
    if(!result){
        res.status(404).json({
            status: false,
            message: "Invalid Token",
        })
    }else{
        next();
    }
}catch(err){
    res.status(500).json({
        status: false,
        message: "Something went wrong"
    })
    return;
}
}

module.exports = authenticateAdmin;

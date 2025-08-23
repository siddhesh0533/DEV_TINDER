const UserAuth = (req, res, next)=>{
    const token = "xyz";
    const isUserAuthorized = token === "xyz"
    if (!isUserAuthorized) {
        res.status(401).send("Not Authorized User!!")
    }else{
        next();
    }
} 

module.exports = {UserAuth}
const AdminAuth = (req, res, next)=>{
    const token = "xybz";
    const isAdminAuthorized = token === "xyz"
    if (!isAdminAuthorized) {
        res.status(401).send("Not Authorized User!!")
    }else{
        next();
    }
} 

module.exports = {AdminAuth}
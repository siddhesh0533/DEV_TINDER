const validator = require("validator")

const validateSignUpData = (req) =>{

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error('Name not valid')
    }else if (!validator.isEmail(emailId)) {
        throw new Error('email not valid')
    } else if(!validator.isStrongPassword(password)){
        throw new Error('password is weak')
    }
}

const validateEditData = (req) =>{
    console.log(req);
    
    const allowedEditFields = ["firstName", "lastName", "age", "skills", "gender", "photoUrl"];

    const isEditAllow = Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
    console.log(isEditAllow);
    
    return isEditAllow;
}

module.exports = {validateSignUpData, validateEditData}
const bcrypt = require('bcrypt');
var saltRound = 10;

var encryptedPassword = async (password)=>{
    let salt = await bcrypt.genSalt(saltRound);
    let hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword
}   

module.exports ={encryptedPassword};

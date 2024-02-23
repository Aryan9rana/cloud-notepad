const jwt = require('jsonwebtoken');
const JWT_SECERET = 'thisissecret';

const fetchuser=(req,res,next)=>{
    const token= req.header('auth-token');
    if(!token){
        res.status(500).send({error: "please authenticate using a valid token"});
    }
    try{
    const data= jwt.verify(token,JWT_SECERET);
    req.user =data.user;
    next();
    }
    catch(err){
        console.log(err.message);
        res.staus(400).send({error:err.message});
    }
}

module.exports= fetchuser;
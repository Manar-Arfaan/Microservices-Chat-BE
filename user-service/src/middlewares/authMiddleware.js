const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config");
//Middleware to authenicate user
exports.authenticateUser = (req,res,next)=>{
    const authorizationHeader=req.headers.authorization;
   
    if(!authorizationHeader){
      return res.status(401).json({error:'Authorization token not provided'});
    }
    const token=authorizationHeader.split(' ')[1];
    try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET);
      console.log("yyyyy",decoded)
      req.user=decoded;
      
      next();
  
    }catch(error){
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
 /* exports.authenticateUser=expressJwt({
    secret: 'wswweuwyewyei',
    algorithms: ['sha1', 'RS256', 'HS256'],
  });*/
 

const { expressjwt: expressJwt } = require('express-jwt');

// Middleware to extract userId form the token
/*exports.extractUserId = (req, res, next) => {
  //Check the Authorization header
  const authorizationHeader=req.headers.authorization;
   
  if(!authorizationHeader){
    return res.status(401).json({error:'Authorization token not provided'});
  }
  const token=authorizationHeader.split(' ')[1];
  try{
    const decoded=jwt.verify(token,'wswweuwyewyei');
    console.log("yse",decoded.userId)
    req.userId=decoded.userId;
    next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
}*/
const extractUserId=expressJwt({
  secret:'wswweuwyewyei',
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty:'UserId'
});
module.exports=extractUserId;


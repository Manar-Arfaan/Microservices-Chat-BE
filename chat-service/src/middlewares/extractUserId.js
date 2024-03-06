
const { expressjwt: expressJwt } = require('express-jwt');


const extractUserId=expressJwt({
  secret:process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty:'UserId'
});
module.exports=extractUserId;


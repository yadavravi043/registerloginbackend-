const jwt =require('jsonwebtoken');
 const createJwtToken = (payload) => {
  const expirationTimeInSeconds = 3 * 24 * 60 * 60; // 3 days in seconds
//   const expirationDate = Math.floor(Date.now() / 1000) + expirationTimeInSeconds;

  return jwt.sign(payload, process.env.JWT_SECRET,{
    // expiresIn: process.env.JWT_EXPIRATION,
    expiresIn: expirationTimeInSeconds,
    // expiresIn: '10h',
  });
};
module.exports=createJwtToken
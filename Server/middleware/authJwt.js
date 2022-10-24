const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// const db = require('../models');
// const User = db.user;
// const Role = db.role;

dotenv.config();
const jwtsecret = process.env.JWT_SECRET;

verifyToken = (req, res, next) => {
    let token = req.session.token;
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, jwtsecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
};

// isAdmin = (req, res, next) => {
//     User.findById(req.userId).exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
  
//       Role.find(
//         {
//           _id: { $in: user.roles },
//         },
//         (err, roles) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
  
//           for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "admin") {
//               next();
//               return;
//             }
//           }
  
//           res.status(403).send({ message: "Require Admin Role!" });
//           return;
//         }
//       );
//     });
// };

const authJwt = {
  verifyToken
};

module.exports = authJwt;
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.MYSECRETKEY;


const auth = (req, res, next) => {
const token = req.headers["auth-token"];

// check for token
if (!token)
    return res.status(403).json({ message: "Interdiction d'acces, veuillez vous logger" });

try {
    //verify token
    const decoded = jwt.verify(token, jwtSecret)

    // add user from token payload which contains the user id we attached to the token
    req.user = decoded
    next()

    // restrict all permissions from the restricted users
    // if (req.user.isRestricted) {
    // res.status(401).json({ message: "Your account is banned, contact us" });
    // } else next();
} catch (e) {
    res.status(400).json({ message: "Veuillez vous logger s'il vosu plait" });
}
};

// // check only admin and seller auth
// const sellerAuth = (req, res, next) => {
// const { isSeller } = req.user;

// if (!isSeller) {
//     res.status(401).json({ message: "You aren't a seller" });
// } else next();
// };

// // check only admin auth
// const adminAuth = (req, res, next) => {
// const { isAdmin } = req.user;

// if (!isAdmin) {
//     res.status(401).json({ message: "Authorization denied, only Admins" });
// } else next();
// };

// // check only shipper auth
// const shipperAuth = (req, res, next) => {
// const { isShipper } = req.user;

// if (!isShipper) {
//     res.status(401).json({ message: "Ooooof, ship" });
// } else next();
// };

// module.exports = { auth, sellerAuth, adminAuth, shipperAuth };
module.exports = { auth };

//MYSECRETKEY
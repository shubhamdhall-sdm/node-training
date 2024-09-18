const { send403ResponseWithMessage, send401ResponseWithMessage } = require("../lib/api/response-messages/authorization");
const { checkToken, checkAdminToken, checkDoctorToken, checkUserToken, checkRoleMatch, checkAdminPrivileges,checkLoggedInUserPrivileges } = require("../services/jwtToken.service")
const jwt = require("jsonwebtoken");

/**
 * users login middleware
 * @param req 
 * @param res 
 * @param next 
 * @returns 
*/
exports.checkCustomToken = async (req, res, next) => {
  let token = req.headers.authorization
    ? req.headers.authorization.split(" ")
    : "";
  if (token) {
    try {

      let userDetail = await checkToken(token[1]);
      // console.log("userDetail ", JSON.stringify(userDetail))
      if (userDetail) {
        next();
      } else {
        send403ResponseWithMessage(res, "You are not authorized to access this application, please login and try again");
      }
    } catch (connErr) {
      send403ResponseWithMessage(res, "You are not authorized to access this application");
    }
  } else {
    send401ResponseWithMessage(res, "Auth token not supplied");
  }
};

/**
 * admin login middleware
 * @param req 
 * @param res 
 * @param next 
 * @returns 
*/
exports.checkAdminCustomToken = async (req, res, next) => {

  let token = req.headers.authorization
    ? req.headers.authorization.split(" ")
    : "";
  if (token) {
    try {
      let userDetail = await checkAdminToken(token[1]);
      console.log("userDetail ", userDetail)
      if (userDetail) {
        next();
      } else {
        send403ResponseWithMessage(res, "You are not authorized to access this application, please login and try again");
      }
    } catch (connErr) {
      send403ResponseWithMessage(res, "You are not authorized to access this application");
    }
  } else {
    send401ResponseWithMessage(res, "Auth token not supplied");
  }
};

/**
 * doctor login middleware
 * @param req 
 * @param res 
 * @param next 
 * @returns 
*/
exports.checkDoctorCustomToken = async (req, res, next) => {

  let token = req.headers.authorization
    ? req.headers.authorization.split(" ")
    : "";
  if (token) {
    try {
      let userDetail = await checkDoctorToken(token[1]);
      console.log("userDetail ", userDetail)
      if (userDetail) {
        next();
      } else {
        send403ResponseWithMessage(res, "You are not authorized to access this application, please login and try again with doctor");
      }
    } catch (connErr) {
      send403ResponseWithMessage(res, "You are not authorized to access this application");
    }
  } else {
    send401ResponseWithMessage(res, "Auth token not supplied");
  }
};

/**
 * check admin privileges middleware
 * @param req 
 * @param res 
 * @param next 
 * @returns 
*/
exports.checkAdminPrivileges = async (req, res, next) => {
  let token = req.headers.authorization
    ? req.headers.authorization.split(" ")
    : "";
  if (token) {
    try {
      let userDetail = await checkAdminPrivileges(token[1]); 
      if (userDetail) {
        next();
      } else {
        send403ResponseWithMessage(res, "You are not authorized to make this change");
      }
    } catch (connErr) {
      send403ResponseWithMessage(res, "You are not authorized to access this application");
    }
  } else {
    send401ResponseWithMessage(res, "Auth token not supplied");
  }
};

/**
 * check loggedin user privileges middleware
 * @param req 
 * @param res 
 * @param next 
 * @returns 
*/
exports.checkLoggedInUserPrivileges = async (req, res, next) => {
  let token = req.headers.authorization
    ? req.headers.authorization.split(" ")
    : "";
  if (token) {
    try {
      let userDetail = await checkLoggedInUserPrivileges(req,token[1]); 
      if (userDetail) {
        next();
      } else {
        send403ResponseWithMessage(res, "You are not authorized to make this change");
      }
    } catch (connErr) {
      send403ResponseWithMessage(res, "You are not authorized to access this application");
    }
  } else {
    send401ResponseWithMessage(res, "Auth token not supplied");
  }
};

/**
 * user login middleware
 * @param req 
 * @param res 
 * @param next 
 * @returns 
*/
exports.checkUserCustomToken = async (req, res, next) => {

  let token = req.headers.authorization
    ? req.headers.authorization.split(" ")
    : "";
  if (token) {
    try {
      let userDetail = await checkUserToken(token[1]);
      console.log("userDetail ", userDetail)
      if (userDetail) {
        next();
      } else {
        send403ResponseWithMessage(res, "You are not authorized to access this application, please login and try again");
      }
    } catch (connErr) {
      send403ResponseWithMessage(res, "You are not authorized to access this application");
    }
  } else {
    send401ResponseWithMessage(res, "Auth token not supplied");
  }
};

/**
 * check has role middleware
 * @param req 
 * @param res 
 * @param next 
 * @returns 
*/
exports.checkHasRole = (roles) => {
  return async function (req, res, next) {
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")
      : "";

    if (token) {
      try {
        var decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        console.log("userDetail ", decoded)
        if (!roles.includes(decoded.role_name)) {
          send403ResponseWithMessage(res, "You are not authorized to access this application");
        } else {
          let roleDetails = await checkRoleMatch(decoded);
          if (roleDetails) {
            next();
          } else {
            send403ResponseWithMessage(res, "You are not authorized to access this application, please login and try again");
          }
        }
      } catch (connErr) {
        send403ResponseWithMessage(res, "You are not authorized to access this application");
      }
    } else {
      send401ResponseWithMessage(res, "Auth token not supplied");
    }
  }
}


const crypto = require("crypto");
const secret = process.env.JWT_SECRET;
const algorithm = "aes-256-cbc";

/**
   * Encrypts text
   * @param {string} text - text to encrypt
   */
encrypt(text) {
    const cipher = crypto.createCipher(algorithm, secret);
    let crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  },

  /**
   * Decrypts text
   * @param {string} text - text to decrypt
   */
  decrypt(text) {
    const decipher = crypto.createDecipher(algorithm, secret);
    try {
      let dec = decipher.update(text, "hex", "utf8");
      dec += decipher.final("utf8");
      return dec;
    } catch (err) {
      return err;
    }
  }

/**
 * checkToken
*/
exports.checkToken = async (token) => {
    let result = false;
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        var now = moment(new Date()); //todays date
        var end = moment(decoded.createdAt); // another date
        var duration = moment.duration(now.diff(end));
        var asMinutes = duration.asMinutes();
//Todo:: token time
        if (asMinutes > 20160) {
            return result = false;
        }

        result = await User.findOne({
            _id: decoded._id
        });

        return result;

    } catch (err) {
        if (err) {
            return result = false;
        }
    }

}

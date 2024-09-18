
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";

/**
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = (user, role) => {
    // Gets expiration time
    const expiration =
        Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES;

    // returns signed and encrypted token
    return auth.encrypt(
        jwt.sign(
            {
                data: {
                    _id: user,
                    role: role
                },
                exp: expiration
            },
            process.env.JWT_SECRET
        )
    );
};


/**
 * Builds the registration token
 * @param {Object} item - user object that contains created id
 * @param {Object} userInfo - user object
 */
const returnRegisterToken = (item, userInfo, role) => {
    const data = {
        token: generateToken(item._id, role),
        user: userInfo
    };
    return data;
};


const response = returnRegisterToken(item, userInfo, 'user');
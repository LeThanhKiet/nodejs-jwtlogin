const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const options = {
    expiresIn: "24h",
};

async function generateJwt(email, id) {
    try {
        const payload = { email: email, id: id };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
        return { error: false, token: token };
    } catch (error) {
        return { error: true };
    }
}

module.exports = { generateJwt };

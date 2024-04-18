const express = require("express");

const { getAllAccount, register, login } = require("../controllers/accountController");

const router = express.Router();

router.get("/accounts", getAllAccount);
router.post("/register", register);
router.post("/login", login);

module.exports = { router };

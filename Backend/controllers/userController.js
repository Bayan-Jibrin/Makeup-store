const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const U = await User.login(email, password);
    const { user , admin } = U
    // create token
    const token = createToken(user._id);

    
    res.status(200).json({ user:{ email, token } ,admin});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    // create token
    const token = createToken(user._id);
    res.status(200).json({user:{ email, token },admin:false});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





module.exports = { loginUser, signupUser };

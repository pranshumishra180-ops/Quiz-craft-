const userModel=require("../models/user.model")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerUser(req , res){
    try{
      const { username, email, password, role } = req.body;
        console.log(req.body);
        const isAlreadyRegister = await userModel.findOne({
            $or:[
                {email},
                {username}
            ]
        });

        if(isAlreadyRegister){
            return res.status(400).json({
                message:"user already register"
            })
        }
        
        const hash = await bcrypt.hash(password,10);

      const user = await userModel.create({
  username,
  email,
  password: hash,
  role: role || "student"
});

        const token = jwt.sign({
            id:user._id,
            username:user.username,
                role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"15d"
        }
    );
    res.cookie("token",token);

   return res.status(201).json({
    message:"user register successfully",
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }
});
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:error.message
        })
    }   
}
async function loginUser(req, res) {
  const { username, email, password, role } = req.body;

  const user = await userModel.findOne({
    $or: [
      { email },
      { username }
    ]
  }).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials"
    });
  }

  // Login type check
  if (role && role !== user.role) {
    return res.status(400).json({
      message: "Invalid login type"
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Credentials"
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({
    message: "User Logged in Successfully!",
    token, // 👈 frontend ke liye
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

module.exports ={
    registerUser,
    loginUser
}
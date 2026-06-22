const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({

        username:{
            type:String,
            required:[true,"username is required"],
        unique:[true,"username must be unique"]
        },
        email:{
            type:String,
            required:[true,"email is required"],
            unique:[true,"email must be unique"]
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            select:false
        },
        role: {
  type: String,
  enum: ["admin", "student"],
  default: "student",
},

})

const userModel= mongoose.model("User",userSchema)

module.exports = userModel;
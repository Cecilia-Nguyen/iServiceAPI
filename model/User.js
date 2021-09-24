var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid Email id!`,
    },
  },
  password: {
    type: String,
    // required: false,
    // validate: {
    //   validator: function (v) {
    //     return v.length >= 8;
    //   },
    //   message: (props) => `${props.value} is not a valid Email id!`,
    // },
  },
  address: {
    type: String,
   
  },
  city: {
    type: String,
    
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  phoneNumber: {
    type: String,

  },
});
var User = mongoose.model("User", userSchema);

module.exports = User;

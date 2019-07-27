const db = require('../config/conection');

const UserSchema = db.Schema({
  username: {
    type: String,
    required:true
  },
  password: {
    type:String,
    required: true
  },
  avatar: {
    type:String,
    default:"http://img0.imgtn.bdimg.com/it/u=1901600690,2735789840&fm=26&gp=0.jpg"
  }
})

module.exports = db.model("user",UserSchema);

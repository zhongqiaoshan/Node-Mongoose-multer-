const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/persons', { useNewUrlParser:true })
  .then( () => {
    console.log("数据库连接成功");
  } )
  .catch( () => {
    console.log("网络异常");
  } )


module.exports = mongoose;

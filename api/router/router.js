const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

router.post("/resgin", (req,res) => {
  console.log(req.body);
  let user = new UserModel({
    /* 将请求头携带的查询字符串,赋予数据库的字段 */
    username:req.body.username,
    password:req.body.password
  });
  user.save().then( data => {
    res.send({
      code:"ok",
      msg:"添加成功"
    })
  } ).catch( error => {
    res.send({
      code:"-1",
      msg:'添加失败'
    })
  } )
})

module.exports = router;

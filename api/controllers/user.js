//用户相关代码的控制器代码

const UserModel = require("../model/user");  //引入表模型，方便下方根据id从表中查询字段
const fs = require("fs");   //引入fs模块，方便下方进行文件读取，写入操作
const path = require('path');  //引入path模块，方便下方进行文件夹及文件路径的引用

/* 
  修改用户头像
*/

const postUpdatavatar = (req, res) => {
  //设置传递过来的文件，移入public文件夹文件名字 
  console.log(req.file);
  let newFileName = new Date().getTime() + "" + req.file.originalname;

  //设置新文件存放路径
  let newPath = path.resolve(__dirname, "../public/", newFileName);

  //读取文件，以便下方将文件传入public文件夹
  let fileData = fs.readFileSync(req.file.path);

  //写入文件,将文件写入public文件夹
  fs.writeFileSync(newPath, fileData);

  //获取发送过来的用户名，以便下方从表中查询
  let userid = req.body.id;
  // console.log(usernames);
  //为移入public文件设置获取public内文件路径
  let newavatar = ` http://localhost/${newFileName} `;
  console.log(newavatar)
  //利用更新username字段的图片
  UserModel.update({
    _id: userid
  }, {
      avatar:newavatar
    }).then(data => {
      console.log(data.nModified);
      // console.log(usernames);
      if (data.nModified > 0) {
        res.send({
          code: 0,
          msg: "更新头像成功",
          data: newavatar
        });
      } else {
        res.send({
          code: 0,
          msg: "更新失败"
        })
      }
    })
  }

/* 
  注册
*/

const postSignup = (req, res) => {
  const user = new UserModel(req.body);

  const username = user.username;

  UserModel.find({
    username: username
  }).then(data => {
    if (Object.keys(data).length !== 0) {
      res.send({
        code: '-1',
        msg: "此用户名太受欢迎了，别人用了"
      })
    } else {
      user.save().then(data => {
        res.send({
          code: '200',
          msg: "注册成功"
        })
      }).catch(error => {
        res.send({
          code: "-1",
          msg: error.message
        })
      })
    }
  })
}
module.exports = {
  postSignup,
  postUpdatavatar
}



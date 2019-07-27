//引入express模块，以便利用express框架
const express = require('express');
const app = express();
const router = express.Router();
const userRouter = require("./router/router");
const userModel = require("./model/user");
const multer = require("multer");
const userController = require("./controllers/user");

const update = multer({
  dest: "./tmp"
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get("/", (req, res) => {
  res.send({
    code: "ok",
    meassage: '连接成功'
  });
})

app.post("/resin", (req, res) => {
  //从表中查询字段
  userModel.findOne({
    username: req.body.username
  }).then(data => {
    if (data) {
      res.send({
        code: "-1",
        msg: '用户已存在'
      })
    } else {
      let user = new userModel({
        username: req.body.username,
        password: req.body.password
      })
      console.log(req.body.username, req.body.password)
      user.save().then(data => {
        console.log(data)
        res.send({
          code: "ok",
          msg: "添加成功"
        })
      }).catch(error => {
        res.send({
          code: 'err',
          msg: error.message
        })
      })
    }
  })
})


app.post("/login", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  // console.log(username,password)
  userModel.find({
    username,
    password 
  }
).then(data =>{
  console.log(data+"1");
  //判断对象为空时，验证失败
  if(Object.keys(data).length !== 0){
    res.send({
      code:"200",
      msg:"登陆成功"
    })
  }else{
    res.send({
      code:"-1",
      msg:'用户名或密码错误'
    })
  }
} )
})

// app.use("/user", userRouter);
app.post("/userresgin",userController.postSignup);
app.post("/updatavatar",update.single("avatar"),userController.postUpdatavatar);


app.listen(8080);

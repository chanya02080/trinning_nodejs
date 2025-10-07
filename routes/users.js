var express = require('express');
var router = express.Router();
var userSchema = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenMiddleware = require("../middleware/token.middleware")

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function (req, res, next) {

  let { username, password } = req.body

  if (!username || !password) {
    return res.send({ message: 'ลองอีกครั้ง' })
  }

  let user = new userSchema({
    username: username,
    password: await bcrypt.hash(password, 10)

  })

  await user.save();
  return res.status(200).send({ message: 'สำเร็จ', data: user });
});

router.post('/login', async function (req, res, next) {
  let { username, password } = req.body

  let user = await userSchema.findOne({
    username,
  })


  if (!user) {
    return res.status(400).send('ไม่พบผู้ใช้');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send('รหัสผ่านไม่ถูกต้อง');
  }

  if (user.approved == false) {
    return res.status(401).send('ไม่มีสิทธิ์');
  }
  
  let token = await jwt.sign({ id: user.id }, "1234")
  return res.status(200).send({ message: 'สำเร็จ', token, data: user });
})




module.exports = router;

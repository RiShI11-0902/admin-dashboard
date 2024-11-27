const express = require('express')
const { adduser } = require('../controller/user')

const router = express.Router()

const usercontroller = require('../controller/user')

router
.post("/adduser", usercontroller.adduser )
.get("/getusers", usercontroller.getuser)
.post("/edituser", usercontroller.edituser)
.post("/role-department", usercontroller.set)
.get("/get-role-department", usercontroller.getrole)
.post("/deleteuser",usercontroller.deleteuser)


module.exports = router
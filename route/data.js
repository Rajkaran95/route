const express = require('express')

const data = require('../controler/student')

const router = express.Router()


 
router.post('/register', data.reg) 

router.post('/register/list', data.reg1); 

router.put('/forgot_password/:id', data.reg2 ); 




module.exports = router
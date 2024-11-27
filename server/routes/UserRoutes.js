const express = require('express');
const router = express.Router();
const {registerUser,getUser} = require('../controller/UserController');


// Route to register a new user
router.post('/usercreate', registerUser);
router.post('/usercreate/to', registerUser);

router.get('/getuser',getUser);






module.exports = router;

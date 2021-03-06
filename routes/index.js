var express = require('express');
var router = express.Router();
const User = require('../model/userModel.js');
const jwt = require('jsonwebtoken');

router.post("/signup",(request,response)=>{
  User.create({username:request.body.username,email:request.body.email,password:request.body.password}).then(result=>{
    console.log('signup success')
    return response.status(201).json(result);
  })
  .catch(err=>{
    return response.status(500).json({error: 'Internal Server Error'});
  });
});

router.post('/signin',(request, response)=> {
  console.log(request.body)
  User.findOne({email:request.body.email,password:request.body.password})
    .then(result=>{
      if(result){
        let payload={subject:result._id};
        let token = jwt.sign(payload,'fggfhgsapnapaglehaitjhvhh');
       return response.status(200).
       json({
         status: 'login success',
         current_user: result,
         token : token 
        });
       } else
       return response.status(200).json({status: 'login failed'}); 
    })
  .catch(err=>{
    return response.status(500).json({error : 'internal server error'});
  });
});

module.exports = router;

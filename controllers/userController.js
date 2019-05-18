const bcrypt = require('bcryptjs');
const validator  = require('validator');

const User = require('../models/User');

const createUser = function(req,res){

 
    const {name,email,password} = req.body.user;
    let avatar;
    let errors =[];

    //name validation
    if(! name){
      errors=[...errors,'blank email'];
    }

    //password validation 

    if( password.length < 6){
      errors = [...errors,' error:too short,minimum:6'];
    }
    
    //email validation 
   if(! validator.isEmail(email)){
      errors=[...errors,'error:Invalid Email '];
    }

    //check for errors or proceed
    if (errors.length > 0 ) 
      return res.status(400).json(errors);
    else {
      User.findOne({email})
      .then( user =>{
          if(user){
            errors=['email already taken'];
            return res.status(400).json(errors);
          }else{
            //create new user 
            const user = new User({
                name,
                email,
                password,
            });

            user.save()
            .then(() => {
              return user.getAuthToken();
            })
            .then(token => {
              console.log(user);
              res.json({'auth-token':token,user});
            })
          }
        }).catch(err => res.status(404).json({ err,error: "database error" }));
    }
}


const login = function(req,res){

  const {email,password} = req.body.user;
  if( ! email || ! password)
    return res.status(400).json({errors:'blank email or password'});

  User.findOne({ email })
  .then(user => {
    if (!user) {
      return res.status(404).json({ err: "Invalid email Or Password " });
    } else {
        bcrypt.compare(password, user.password)
        .then(isMatch => {
        if(isMatch) {
          return user.getAuthToken()
          .then(token => {
            res.status(200).send({user,"auth-token":token});
          });
        } else {
          return res.status(400).json({ err: "Invalid email Or Password" });
        }
      })
      .catch(err => {
        res.json({err})});
    }
  });
}
const signout = (req, res) => {
  req.user
  .removeToken(req.token)
  .then(() => res.status(200).json())
  .catch(() => res.status(404).json());
};

module.exports={
    createUser,
    login,
    signout,
}
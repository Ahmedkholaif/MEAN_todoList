const bcrypt = require('bcryptjs');
const validator  = require('validator');

const User = require('../models/User');

const createUser = function(req,res){

 
    const {name,email,password} = req.body.user;
    let avatar;
    let errors ={
        name:[],
        email:[],
        password:[],
    };

    //name validation
    if(! name){
      errors.name=[...errors.name,{error:'blank'}];
    }else{
      delete errors.name;
    }

    //password validation 

    if( password.length < 6){
      errors.password = [...errors.password,{error: 'too short',minimum:6}];
    }else{
      delete errors.password;
    }
    
    //email validation 

    if ( ! email) {
      errors.email=[...errors.email,{error:'blank'}];
    }else if(! validator.isEmail(email)){
      errors.email=[...errors.email,{error:'Invalid Email'}];
    }else {
      delete errors.email
    }

    //check for errors or proceed
    if (Object.keys(errors).length) 
      return res.status(400).json({errors});
    else {
      User.findOne({email})
      .then( user =>{
          if(user){
            errors.email=[{error:'already taken'}];
            return res.status(400).json({errors});
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
  console.log('req.body');
  console.log({email,password});
  if( ! email || ! password)
    return res.status(400).json({errors:'blank email or password'});

  User.findOne({ email })
  .then(user => {
    if (!user) {
      return res.status(404).json({ err: "Invalid email Or Password " });
    } else {
        console.log(user);
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
        console.log(err);  
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
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const validator  = require('validator');
const keys = require('../config/keys');

const userSchema =new mongoose.Schema({
    name:{
        type:"string",required:true
    },
    email:{
        type:"string", 
        required:true,
        unique:true,
        validate:{
            validator: validator.isEmail,
            msg:`not a valid email`
        }
    },
    password:{
        type:"string",required:true,minlength:6
    },
    todos:[
        {type:mongoose.Schema.Types.ObjectId,ref:'Todo'}
    ],
    tokens:[{
        access:{
            type:"string",required:true
        },
        token:{
            type:"string",required:true
        }
    }]
});

//mongo middleware --password encryption
userSchema.pre('save',function (next){  // middleware
    let user = this ;
    if(user.isModified('password')) {
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password=hash;
                next();
            })
        })
    }
    else {
        next();
    }
});

// override the data sent back to the user

userSchema.methods.toJSON =function () {
    const user = this;
    let userObject = user.toObject();

    return _.pick(userObject,['_id','email','todos']);
}
userSchema.methods.getAuthToken = function () {
    const user =this;
    let access = 'auth';
    const pay_load = {_id: user._id,email:user.email,isAdmin:user.isAdmin};
    let token =jwt.sign({pay_load,access},keys.secret).toString(); 
    user.tokens.push({access,token});
   
    return user.save()
    .then(()=>{
        return token;
    });
}

userSchema.methods.removeToken = function (token) {
    const user = this;
    return user.updateOne({
        $pull:{
            tokens: {token}
        }
    });
}
userSchema.statics.findByToken = function(token) {
    const User=this;

    let decoded;
    try {
        decoded = jwt.verify(token,keys.secret);
    }catch(e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id':decoded.pay_load._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
}


const User = new mongoose.model('User',userSchema);

// user1 = new User({
//     firstName:"ahmed",
//     lastName:"kholif",
//     email:"ahmed@sysdb.com",
//     password:"admin123",
//     isAdmin:true
// })
// user1.save();

module.exports = User;
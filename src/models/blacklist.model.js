const mongoose = require('mongoose');

const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    }
}, {timestamps:true});

const tokenblacklistModel=mongoose.model('BlacklistToken',blacklistTokenSchema);

module.exports=tokenblacklistModel;
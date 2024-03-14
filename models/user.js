const { error } = require('console');
const{createHmac, randomBytes}=require('crypto')
const {Schema, model } = require('mongoose')

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type:String,
        
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl:{
        type:String,
        default:"/images/programmer.png",
    },
    role:{
        type:String,
        enum:["user","admin"],//if we give any other value mongoose will throe error
        default:"user",

    }


},
{timestamps:true})
userSchema.pre("save",function(next){
    const user=this;
    if(!user.isModified("password")) return;
    const salt=randomBytes(16).toString();
    const hasedpassword= createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password=hasedpassword;
next();
}) 


userSchema.static('matchPassword',async function(email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error("user not found")
    const salt=user.salt;
    const hasedPassword=user.password;
    const userProvidedHash=createHmac("sha256",salt).update(password).digest("hex")
    if(hasedPassword!==userProvidedHash) throw new Error("Incorrect password")
   return user;
    //return { ...user_doc,password:undefined,salt:undefined}
})




const User= model( 'user', userSchema)
module.exports=User  //we

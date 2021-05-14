import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
        undefined: false,
        maxlength: 8
    },
    passWord: {
        type: String,
        require: true,
        maxlength: 12
    },
    balance: {
        type: Number,
        min: 0,
        default: 0
    },
    gender: String,
    fullName: String,
    email: {
        type: String,
        default: '',
        unique: true
    },
    bankID: {
        type: String,
        default: ''
    },
    bankProvider: {
        type: String,
        default: ''
    },
    houseOwnList: Array,
    houseSellList: Array,
    scheduleList: Array,
    isLogin: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phone_number:{
        type:String,
    }
});

var User = mongoose.model('User', userSchema);

export default User;
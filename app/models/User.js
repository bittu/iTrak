'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    userid: {
        type: Number,
        unique: true,
        required: true
    },
    password: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: String,
    lastName: String,
    dob: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//console.log(bcrypt.hashSync("admin", bcrypt.genSaltSync(8), null));

// Bcrypt middleware on UserSchema
UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    next();
});

//Password verification
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
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

// Bcrypt middleware on UserSchema
UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//Password verification
UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
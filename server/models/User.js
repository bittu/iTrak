'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    userId: {
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
    dob: Date,
    isAdmin: {
        type: Boolean,
        default: false
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

//console.log(bcrypt.hashSync("admin", bcrypt.genSaltSync(SALT_WORK_FACTOR), null));

// Bcrypt middleware on UserSchema
UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
    next();
});

//Password verification
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
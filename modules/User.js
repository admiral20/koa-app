const mongoose = require('mongoose');
// 模板
const Schema = mongoose.Schema;

// 实例化模板
const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String
    },
    avatra: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model("users", UserSchema)
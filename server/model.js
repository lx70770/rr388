//connect mongo and use the collection
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27000/imooc';

let options = {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
mongoose.connect(DB_URL, options);
mongoose.connection.on('connected', function () {
    console.log('MongoDB connect success');
});
const models = {
    user: {
        'user': {'type': String, 'require': true},
        'pwd': {'type': String, 'require': true},
        'type': {'type': String, 'require': true},
        //imgHead
        'avatar': {'type': String},
        //personal and position description
        'desc': {'type': String},
        //position
        'title': {'type': String},
        //boss
        'company': {'type': String},
        'money': {'type': String}
    },
    chat: {
        'chatid': {'type': String, 'require': true},
        'read': {'type': Boolean, 'default': false},
        'from': {'type': String, 'require': true},
        'to': {'type': String, 'require': true},
        'content': {'type': String, 'require': true, 'default': ''},
        'create_time': {'type': Number, 'default': new Date().getTime()}
    }
};

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
};
const express = require('express');//express核心文件
const mongoose = require('mongoose');//操作mongoDB数据库
const bodyParser = require('body-parser');//获取post请求的请求体
const cookieParser = require('cookie-parser');//设置cookie
const utility = require('utility');//MD5加密
//定义字段类型
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd': 0, '__v': 0};


//使用socket.io 需放在app后面
const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(`user login`);
    socket.on('sendmsg', (data) => {
            // console.log(data);
            // io.emit('recvmsg', data);
            const {from, to, msg} = data;
            const chatid = [from, to].sort().join('_');
            Chat.create({chatid, from, to, content: msg}, (err, doc) => {
                io.emit('recvmsg', Object.assign({}, doc._doc))
            })
        }
    )
});

//启动express服务  使用cookie和body-parser
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

//这是加密函数
const md5Fn = (pwd) => {
    let solt = 'I-like-react.js-very-much 23ko*/*-+++``OlLhUNmm.?[]```';
    return utility.md5(utility.md5(solt + pwd + solt));
};

//以下是请求方式以及url
app.get('/', (req, res) => {
    res.send('<h1>服务器已经在localhost:9093启动！</h1>')
});

app.get('/user/list', (req, res) => {
    const {type} = req.query;
    User.find({type}, (err, doc) => {
        return res.json({code: 0, data: doc});
    });
});

//查找数据库里所有的用户信息
app.get('/user/find', (req, res) => {
    User.find({}, _filter, (err, doc) => {
        res.json(doc);
    })
});


app.get('/user/info', (req, res) => {
    let {userid} = req.cookies;
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, (err, doc) => {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'});
        }
        return res.json({code: 0, data: doc});
    });
});


//用户注册
app.post('/user/register', (req, res) => {
    const {user, pwd, type} = req.body;

    User.findOne({user: user}, (err, doc) => {
        if (doc) {
            console.log('用户名重复:' + doc);
            return res.json({code: 1, msg: '用户名重复,请重新输入'});
        }
        const userModel = new User({user, pwd: md5Fn(pwd), type});
        userModel.save((err, doc) => {
            if (err) {
                return res.json({code: 1, msg: '服务器出错！'});
            }
            const {user, type, _id} = doc;
            console.log('注册成功:' + doc);
            res.cookie("userid", _id);
            return res.json({code: 0, data: {user, type, _id}, msg: '注册成功'});
        });
    });
});

//用户登录
app.post('/user/find', (req, res) => {
    const {user, pwd} = req.body;
    User.findOne({user: user, pwd: md5Fn(pwd)}, _filter, (err, doc) => {
        console.log(doc);
        if (doc === null) {
            return res.json({code: 1, msg: '用户名或密码错误'})
        }
        if (err) {
            return res.json({code: 1, msg: '服务器出错'})
        }
        res.cookie("userid", doc._id);
        return res.json({code: 0, data: doc, msg: '登录成功'});
    });
});

//boss信息页更新
app.post('/user/update', (req, res) => {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.json({code: 1});
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, (err, doc) => {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        return res.json({code: 0, data});
    })
});

//获取聊天页面信列表
app.get('/user/getmsgList', (req, res) => {
    const user = req.cookies.userid;
    User.find({}, (e, userdoc) => {
        let users = {};
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar};
        });
        Chat.find({'$or': [{from: user}, {to:user}]}, (err, doc) => {
            if (!err) {
                return res.json({code: 0, msgs: doc, users: users});
            }
        })
    });
});

server.listen(9093, function () {
    console.log('Node app start at port 9093')
});




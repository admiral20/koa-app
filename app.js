const koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');

const bodyParser = require('koa-bodyparser')
// 引入UserSchema
const User = require('./modules/User')


// 实例化koa
const app = new koa();
const router = new Router();

app.use(bodyParser())

// 引入 user.js
const users = require('./routes/api/users')

// 路由
router.get('/', async ctc => {
    ctx.body = { msg: 'Hello Koa Interfaces' }
})


const db = require('./config/key.js').mongoURI;

// 连接数据库
mongoose.connect(
    db,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=> {
    console.log('success connect!!!')
}).catch(err => {
    console.log(err)
})

// 配置路由地址 localhost:5000/api/users
// user
router.use('/api/users', users);

// 配置路由
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`server start on ${port}`)
})

const Router = require('koa-router');

const router = new Router();

const User = require('../../modules/User');

const bcrypt = require('bcryptjs');

const gravatar = require('gravatar');

/**
 * @route GET api/user/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async ctx => {
    ctx.status = 200,
    ctx.body = {
        msg: "user is working..."
    }
}),

/**
 * @route POST api/user/register
 * @desc 注册接口
 * @access 接口是公开的
 */
router.post('/register', async ctx => {
    // ctx.body = ctx.request.body;
    // 存储到数据库
   const findResult = await User.find({ name: ctx.request.body.name });
   console.log(findResult, '112')
   if (findResult && findResult.length > 0) {
        ctx.status = 500;
        ctx.body = { msg: "姓名已被占用" }
   } else {
       const avatra = gravatar.url(ctx.request.body.email, {s: '200', r: 'pg', d: 'mm'});
       const newUser = new User({
            avatra,
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            password: ctx.request.body.password
       });


        await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                // console.log(hash, 'hash')
                if (err) throw err;
                newUser.password = hash;
            });
        });

       await newUser.save().then(user => {
           ctx.body = user;
       }).catch(err => {
        ctx.body = { msg: "系统错误" }
       })
       // 返回json 数据
       ctx.body = newUser;
   }
})

module.exports = router.routes();
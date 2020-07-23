const Router = require('koa-router');
const multer = require('@koa/multer');
const upload = multer();

let { ThomasService } = require('../../services/thomas');

let { UserModel } = require('../../models/user');

const { fork } = require('child_process');
const path = require('path');

const router = new Router({
  prefix: '/v1/thomas',
});

router.get('/getlist', async (ctx, next) => {
  let result = await new ThomasService({}).getList();
  ctx.body = result;
});

router.post('/removefile', async (ctx, next) => {
  let { fileName } = ctx.request.body;
  let result = await new ThomasService({
    originalname: fileName,
  }).removeFile();
  throw new global.errs.Success(`${fileName} 文件已成功删除`, 0, 202);
});

// 普通的单线程导入方法
// router.post('/rollingrow', async (ctx, next) => {
//   let { filePath, modelName } = ctx.request.body;
//   let result = await new ThomasService({
//     originalname: filePath,
//     modelName: modelName,
//   }).rollingRow();
// });

router.post('/rollingrow', async (ctx, next) => {
  let { filePath, modelName } = ctx.request.body;
  let cp = fork(path.join(__dirname, '../../work-process/rollingrow.js'), [], {
    cwd: process.cwd(),
    env: process.env, //子进程的环境变量
    execPath: process.execPath, //运行模块的可执行文件
    execArgv: process.execArgv, //传递给可执行文件的参数列表
    silent: false, //为false表示父进程与子进程共享标准(输入/输出)，为true时不共享。
  });

  cp.on('message', (data) => {
    console.log(`got a message is ${data}`, JSON.stringify(data));
  });
  cp.on('error', function (err) {
    console.log(err.message);
  });
  cp.send({ filePath, modelName });

  throw new global.errs.Success(`${filePath} 文件已生成导入计划`, 0, 201);
});

router.post('/uploadfile', upload.single('file'), async (ctx, next) => {
  let { userId = undefined } = ctx.auth;
  let { nick_name = undefined } = await UserModel.findOne({
    where: {
      user_id: userId,
    },
  });
  let uploadTime = new Date().getTime();
  let { file } = ctx.request;
  Object.assign(file, { operateAuthor: nick_name, uploadTime: uploadTime });

  try {
    let { fileName, fileSize } = await new ThomasService(
      file
    ).writeFileStream();
    ctx.body = { fileName, fileSize };
  } catch (error) {
    let message = error.msg || error.message;
    throw new global.errs.HttpException(
      `${message} 导入文件失败,请重试`,
      10006
    );
  }
});

module.exports = {
  thomas: router,
};

const Router = require('koa-router');
const multer = require('@koa/multer');
const upload = multer();

let { ThomasService } = require('../../services/thomas');

let { UserModel } = require('../../models/user');

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

router.post('/rollingrow', async (ctx, next) => {
  let { filePath, modelName } = ctx.request.body;
  let result = await new ThomasService({
    originalname: filePath,
    modelName: modelName,
  }).rollingRow();
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

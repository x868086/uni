const Router = require('koa-router');
const multer = require('@koa/multer');
const upload = multer();

let { FileStream } = require('../../services/thomas');

const router = new Router({
  prefix: '/v1/thomas',
});

router.post('/uploadfile', upload.single('file'), async (ctx, next) => {
  let { file } = ctx.request;
  let result = new FileStream(file).writeFileStream();

  ctx.body = '传输完成';
});

module.exports = {
  thomas: router,
};

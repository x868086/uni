let { ThomasService } = require('../services/thomas');
const errors = require('../../core/http-exception');

process.on('message', async (msg) => {
  console.log('子进程收到消息', msg);
  global.errs = errors;

  let filePath = msg.filePath;
  let modelName = msg.modelName;
  let result = null;

  try {
    await new ThomasService({
      originalname: filePath,
    }).updateFileInfo('执行中', 0, ['state_name', 'upload_row']);

    result = await new ThomasService({
      originalname: filePath,
      modelName: modelName,
    }).rollingRow();

    await new ThomasService({
      originalname: filePath,
    }).updateFileInfo('完成', result, ['state_name', 'upload_row']);

    process.send({ msg: result });
    process.kill(process.pid, 'SIGTERM');
  } catch (error) {
    process.send({ msg: result });

    await new ThomasService({
      originalname: filePath,
    }).updateFileInfo('失败', 0, ['state_name', 'upload_row']);

    process.kill(process.pid, 'SIGTERM');
  }
});

process.on('uncaughtException', (err, origin) => {
  console.log(`发生未捕获的错误信息 ${err.message} ${origin}`);
  process.kill(process.pid, 'SIGTERM');
});

process.on('unhandledRejection', (error, promise) => {
  console.log(`发生Promise的异常回调 ${error.message} ${promise}`);
  process.kill(process.pid, 'SIGTERM');
  Promise.reject(new Error(`错误信息 ${error}`));
});

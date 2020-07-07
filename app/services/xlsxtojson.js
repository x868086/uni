const fs = require('fs');
const ExcelJS = require('exceljs');

// XLSX 库(必须要将文件的编码类型转成UTF8格式才能使用)
// let getHeaderRow = (sheet) => {
//   const headers = [];
//   const range = XLSX.utils.decode_range(sheet['!ref']);
//   let C;
//   const R = range.s.r;
//   /* start in the first row */
//   for (C = range.s.c; C <= range.e.c; ++C) {
//     /* walk every column in the range */
//     const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
//     /* find the cell in the first row */
//     let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
//     if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
//     headers.push(hdr);
//   }
//   return headers;
// };

// let xlsxToJson = async (filePath) => {
//   // let buf = fs.readFileSync(filePath);
//   // let workBook = XLSX.read(buf, { type: 'buffer' });
//   // const firstSheetName = workBook.SheetNames[0];
//   // const worksheet = workBook.Sheets[firstSheetName];
//   // const results = XLSX.utils.sheet_to_json(worksheet);
// }

// let insertFields = {
//   b2iserial: ['serial_number', 'product_name', 'yf_code', 'id_desc', 'fee'],
// };
let insertFields = () => {
  return {
    b2iserial: ['serial_number', 'product_name', 'yf_code', 'id_desc', 'fee']
  }
}

let equalField = (fields, modelName) => {
  if (!insertFields()[modelName]) {
    throw new global.errs.ParametersException(
      '未找到对应的数据表,请重选择正确的数据表!'
    );
  }
  fields.shift();

  return fields.toString() === insertFields()[modelName].toString() ? true : false;
};

let xlsxToJson = async (filePath, modelName) => {
  const workbook = new ExcelJS.Workbook();
  let workBookFile = null;
  try {
    workBookFile = await workbook.xlsx.readFile(filePath);
  } catch (error) {
    throw new global.errs.ParametersException(
      `${error.message} 未找到对应的上传文件!`
    );
  }

  // 按 id 提取工作表
  const sheet = workBookFile.getWorksheet(1);
  const firstRow = sheet.getRow(1);
  let sheetHeader = firstRow.values;

  // 判断导入表的字段是否与数据model字段一致，不一致直接抛出错误终止程序
  if (!equalField(sheetHeader, modelName)) {
    throw new global.errs.ParametersException(
      '导入文件字段与数据库字段不匹配,请检查导入文件是否符合规范!'
    );
  }

  const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(filePath);

  let rollingArray = [];

  for await (const worksheetReader of workbookReader) {
    for await (const row of worksheetReader) {
      // console.log(row.values);
      let obj = {};
      sheetHeader.map((e, i) => {
        // Object.assign(obj, { e: row.values[i] });
        Object.assign(obj, { [e.toLowerCase()]: row.values[i + 1] });
        // console.log(obj);
      });
      rollingArray.push(obj);
    }
  }
  rollingArray.shift();
  //返回由xlsx row转换的objArray,和数据表的字段名称
  return { rollingArray, fields: insertFields()[modelName] };
};

module.exports = {
  xlsxToJson,
};

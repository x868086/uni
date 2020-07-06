let XLSX = require('xlsx');
const fs = require('fs');
const ExcelJS = require('exceljs');

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


let xlsxToJson = async (filePath) => {
  // let buf = fs.readFileSync(filePath);
  // let workBook = XLSX.read(buf, { type: 'buffer' });
  // const firstSheetName = workBook.SheetNames[0];
  // const worksheet = workBook.Sheets[firstSheetName];
  // const results = XLSX.utils.sheet_to_json(worksheet);



  let getHeaderRow = (row) => {
    return JSON.stringify(row.values)
  }

  // const workbook = new ExcelJS.Workbook();
  // let workBookFile = await workbook.xlsx.readFile(filePath);

  // // 按 id 提取工作表
  // const sheet = workBookFile.getWorksheet(1);
  // const firstRow = sheet.getRow(1);
  // let sheetHeader = getHeaderRow(firstRow)
  // console.log(`开始 ${new Date().toLocaleTimeString()}`)

  // sheet.eachRow(function (row, rowNumber) {
  //     console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
  //   });

  // console.log(`结束 ${new Date().toLocaleTimeString()}`)

  // const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(filePath);

  // for await (const worksheetReader of workbookReader) {
  //   for await (const row of worksheetReader) {
  //     console.log(JSON.stringify(row.values))
  //   }
  // }

  const workbook = new ExcelJS.Workbook();
  let workBookFile = await workbook.xlsx.readFile(filePath);

  // 按 id 提取工作表
  const sheet = workBookFile.getWorksheet(1);
  const firstRow = sheet.getRow(1);
  let sheetHeader = getHeaderRow(firstRow)

  const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(filePath);

  let rollingArray = []
  let str = sheetHeader.replace('[', '').replace(']', '').split(',')

  for await (const worksheetReader of workbookReader) {
    for await (const row of worksheetReader) {
      console.log(row.values)
      row.values.forEach((e, index) => {
        let obj = {
          str[i]: e
        }
        rollingArray.push(obj)
      })
    }
  }


};

module.exports = {
  xlsxToJson,
};

import NProgress from 'nprogress'

export function exportCsv(data) {
  NProgress.start()
  // 仅适用于Array json格式的数据导出为csv格式

  let csvContent = 'data:text/csv;charset=utf-8,\uFEFF'

  // 在第一条数据中获取字段名称，生成表头，注意加换行转义符
  const dataKeys = Reflect.ownKeys(data[0])
  const tableHeader = dataKeys.join(',') + `\n`
  let str = tableHeader

  // 遍历每条数据
  data.map(e => {
    let keyStr = ''
    dataKeys.map(item => {
      //   str += `${e.serial_number},${e.product_name},${e.id_desc},${e.fee},${e.contact_phone},${e.dev_name},${e.dev_phone},${e.operate_time},${e.operate}\n`
      // 将每条数据的json对象的key对应的值value 拼接到一起,注意加逗号
      keyStr += `${e[item]},`
    })
    // 数据拼接完成后要加换行符
    str += keyStr + `\n`
  })
  // 编码UTF8
  str = encodeURIComponent(str)
  csvContent += str

  const fileName = `${(new Date().toJSON().substr(0, 10)).replace(/-/g, '')}${parseInt(Math.random() * 10000)}.csv`
  const link = document.createElement('a')
  link.setAttribute('href', csvContent)
  link.setAttribute('download', fileName)
  document.body.appendChild(link)

  link.click()

  NProgress.done()
}

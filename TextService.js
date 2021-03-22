module.exports = {
  prepareData: (message) => {
    if (!message) {
      return ''
    }

    if(message.length > 24) {
      message = message.match(/.{1,22}/g)
      if (message.length > 1) {
        message = message.map((msg, index) => {
          return message.length - 1 != index ? `${msg}-` : msg
        })
      }
      
      message = message.join(',')
      message = message.replace(/-,\s?/g, '-')
    }
    
    return message
  },
  mountData: (data) => {
    data.map(howTable => {
      module.exports.printData(howTable.title, howTable.message, howTable.align)
    })
  },
  printData: (title = '', message = '', align = 'LEFT/RIGHT') => {
    align = align.split('/')
    
    return module.exports.printer.tableCustom([
      { text: title+":", align: align[0], width: 0.5 },
      { text: module.exports.prepareData(message), align: align[1], width: 0.5 }
    ])
  },
  text: (message) => module.exports.printer.text( message ),
  init: printer => module.exports.printer = printer,
  printer: null,
}
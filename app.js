const TextService = require('./TextService');
const net = require('net');
/*
 * Criado em: 07/02/2019
 * Por:       Jorge Augusto Gallo
 *            IBS tecnologia
 *
 * Funções para preencher e enviar formulário para impressora Bematech MP20-MI
 * Impressora matricial de 48 colunas apenas texto.
 *
 * - function imprimirTicket(socket, dados, cb)
 * - function imprimir(socket, linhas, cb)
 *
 */

/*
 * JSON com os dados a serem inseridos nos campos ticket
 * O limite do tamanho maximo de cada campo deve ser respeitado.
 *
 * dados = {
 *   ticket: " tamanho maximo 38 caracteres ",
 *   filial: " tamanho maximo 38 caracteres ",
 *   endereco1: " tamanho maximo 38 caracteres ",
 *   endereco2: " tamanho maximo 48 caracteres ",
 *   telefone: " tamanho maximo 38 caracteres ",
 *   placa: " tamanho maximo 30 caracteres ",
 *   motorista: " tamanho maximo 30 caracteres ",
 *   transportadora: " tamanho maximo 30 caracteres ",
 *   produto: " tamanho maximo 30 caracteres ",
 *   safra: " tamanho maximo 30 caracteres ",
 *   dataHoraPortaria: " tamanho maximo 19 caracteres ",
 *   dataHoraEntrada: " tamanho maximo 19 caracteres ",
 *   notaFiscal: " tamanho maximo 30 caracteres ",
 *   pesoBruto: " tamanho maximo 30 caracteres ",
 *   tara: " tamanho maximo 30 caracteres "
 *   observacao1: " tamanho maximo 36 caracteres ",
 *   observacao2: " tamanho maximo 48 caracteres "
 * }
 *
 */
// var dadosJson = {
//   ticket: "123456",
//   filial: "Maria Madalena",
//   endereco1: "Rua das camelias, 218",
//   endereco2: "Porto Alegre - RS - CEP: 90000",
//   telefone: "(051)98765-1234",
//   placa: "AFI0J12",
//   motorista: "Senhor Boneco",
//   transportadora: "K.I. Tudo e Junta Depois",
//   produto: "Soja Galvanizada",
//   safra: "Safra teste",
//   dataHoraPortaria: "12/12/2019 12:34:56",
//   dataHoraEntrada: "12/12/2019 13:34:56",
//   notaFiscal: "1234567890",
//   pesoBruto: "73.263,30",
//   tara: "35.200,00",
//   observacao1: "Vista panoramica observada da torre",
//   observacao2: "de observacao do observatorio de Arecibo"
// };

// Cria o socket e chama a impressão do ticket
// socket1.connect(30024, '192.168.1.15', function() {
// 	imprimirTicket(socket1, dadosJson, function() {
//     console.log("FIM");
//     process.exit();
//   });
// });

/*
 * Cria array com as linhas do formulario a ser impresso.
 * Insere nos respectivos campos as informações recebidas no JSON.
 * Chama a função de envio de linhas para impressora.
 */
function imprimirTicket(host, dadosJson, cb, reject) {
  try {
    if (dadosJson.thermal) {
      const escpos = require('escpos'); // modulo para impressoras ESC/POS
      const device = new escpos.Network(host.host, host.port || 9100);
      const options = { encoding: '' /* default */ };
      const printer = new escpos.Printer(device, options);

      escpos.Image.load(__dirname + '/image/smart-slc.png', image => {
        device.open(function() {
          try {
            printer.align('CT');
            printer.image(image, 'D24');
            printer
              .encode('850')
              .font('a')
              .align('ct')
              // .style('bu')
              .size(1, 1);

            TextService.init(printer);

            TextService.text(
              '------------------------------------------------'
            );
            TextService.text('ORDEM DE CARGA/DESCARGA');
            TextService.text(
              '------------------------------------------------'
            );
            TextService.printData(
              'Nr. Acesso',
              dadosJson.nr_acesso,
              'LEFT/LEFT'
            );
            TextService.printData('Filial', dadosJson.filial, 'LEFT/LEFT');
            TextService.text(
              '------------------------------------------------'
            );

            TextService.mountData([
              { title: 'Placa', message: dadosJson.placa },
              { title: 'Motorista', message: dadosJson.motorista },
              { title: 'Transportadora', message: dadosJson.transportadora },
              { title: 'Produto', message: dadosJson.produto },
              { title: 'Safra', message: dadosJson.safra },
              { title: 'Operaçao', message: dadosJson.operacao },
              {
                title: 'Data/Hora Portaria',
                message: dadosJson.dataHoraPortaria
              },
              {
                title: 'Data/Hora Entrada',
                message: dadosJson.dataHoraEntrada
              },
              { title: 'Pesagem 1', message: dadosJson.pesagem1 },
              { title: 'Pesagem 2', message: dadosJson.pesagem2 },
              { title: 'Peso Líquido', message: dadosJson.pesoLiquido },
              {
                title: 'Observaçao',
                message: dadosJson.observacao ? dadosJson.observacao : 'N/A'
              }
            ]);

            TextService.printer
              .text('\n\n\n')
              .text('----------------------------------------')
              .text('Balanceiro')
              .text('\n\n')
              .text('----------------------------------------')
              .text('Recepção/Classificação')
              .text('\n\n')
              .cut()
              .close();

            if (cb) {
              if (typeof cb === 'function') {
                cb();
              }
            }
          } catch (err) {
            return reject(err);
          }
        });
      });
    } else {
      var linhas = [
        '------------------------------------------------\n',
        '            ORDEM DE CARGA/DESCARGA\n',
        '------------------------------------------------\n',
        'Nr. Acesso:   #\n',
        'Filial:   #\n',
        '------------------------------------------------\n',
        'Placa:                 #\n',
        'Motorista:             #\n',
        'Transportadora:        #\n',
        'Produto:               #\n',
        'Safra:                 #\n',
        'Operacao:              #\n',
        'Data/Hora Portaria:    #\n',
        'Data/Hora Entrada:     #\n',
        'Pesagem 1:             #\n',
        'Pesagem 2:             #\n',
        'Peso Liquido:          #\n',
        'Observacao:            #\n',
        '\n',
        '\n',
        '\n',
        '    ----------------------------------------\n',
        '                  Balanceiro\n',
        '\n',
        '\n',
        '    ----------------------------------------\n',
        '           Recepcao/Classificacao\n',
        '\n',
        '\n',
        '\n\n\n\n\n\n\n\n'
      ];

      // Insere os valores no formulário, substituindo o caracter "#" pelo valor
      // informado no JSON
      linhas[3] = linhas[3].replace('#', dadosJson.ticket);
      linhas[4] = linhas[4].replace('#', dadosJson.filial);
      linhas[6] = linhas[6].replace('#', dadosJson.placa);
      linhas[7] = linhas[7].replace('#', dadosJson.motorista);
      linhas[8] = linhas[8].replace(
        '#',
        dadosJson.transportadora ? dadosJson.transportadora : ''
      );
      linhas[9] = linhas[9].replace('#', dadosJson.produto);
      linhas[10] = linhas[10].replace('#', dadosJson.safra);
      linhas[11] = linhas[11].replace('#', dadosJson.operacao);
      linhas[12] = linhas[12].replace(
        '#',
        dadosJson.dataHoraPortaria ? dadosJson.dataHoraPortaria : ''
      );
      linhas[13] = linhas[13].replace(
        '#',
        dadosJson.dataHoraEntrada ? dadosJson.dataHoraEntrada : ''
      );
      linhas[14] = linhas[14].replace(
        '#',
        dadosJson.pesagem1 ? dadosJson.pesagem1 : ''
      );
      linhas[15] = linhas[15].replace(
        '#',
        dadosJson.pesagem2 ? dadosJson.pesagem2 : ''
      );
      linhas[16] = linhas[16].replace(
        '#',
        dadosJson.pesoLiquido ? dadosJson.pesoLiquido : ''
      );
      linhas[17] = linhas[17].replace(
        '#',
        dadosJson.observacao ? dadosJson.observacao : 'N/A'
      );

      // chama a função que envia o formulário para impressora
      imprimir(host, linhas, function() {
        // verifica e chama callback
        if (cb) {
          if (typeof cb === 'function') {
            cb();
          }
        }
      });
    }
  } catch (err) {
    reject(err);
  }
}

/*
 * Envia o formulário para impressora cadenciadamente (1 linha a cada 200 ms)
 * previnindo o estouro do buffer da mesma.
 */
function imprimir(host, linhas, cb) {
  const socket = new net.Socket();

  socket.connect(host.port, host.host, () => {
    var numeroDeLinhas = linhas.length;
    var ponteiroDeLinha = 0;

    var loop = setInterval(function() {
      if (ponteiroDeLinha < numeroDeLinhas) {
        socket.write(linhas[ponteiroDeLinha++]);
      } else {
        clearInterval(loop);
        // verifica e chama callback
        if (cb) {
          if (typeof cb === 'function') {
            cb();
          }
        }
      }
    }, 200);
  });
}

module.exports = { imprimirTicket: imprimirTicket, imprimir: imprimir };

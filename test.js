var imp = require('./app')

let socket
socket = {host: '192.168.1.115'} //termica
// socket = {host: '192.168.1.15', port: 30024}

var dadosJson = {
  ticket: "123456",
  filial: "Maria Madalena",
  endereco1: "Rua das camelias, 218",
  endereco2: "Porto Alegre - RS - CEP: 90000",
  telefone: "(051)98765-1234",
  placa: "AFI0J12",
  motorista: "Senhor Boneco",
  transportadora: "K.I. Tudo e Junta Depois",
  produto: "Soja Galvanizada",
  safra: "Safra teste",
  operacao: 'hahahaha',
  dataHoraPortaria: "12/12/2019 12:34:56",
  dataHoraEntrada: "12/12/2019 13:34:56",
  notaFiscal: "1234567890",
  pesoBruto: "73.263,30",
  tara: "35.200,00",
  observacao: "de o uma palavra bem grande aqui taligado mesmo velho",
  thermal:true
};

imp.imprimirTicket(socket, dadosJson, () => {

})
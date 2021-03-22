# Impressão MP20-MI (Bematech)
Funções para preencher e enviar formulário para impressora Bematech MP20-MI

## "dadosJson"

  JSON com os dados a serem inseridos nos campos ticket
  O limite do tamanho maximo de cada campo deve ser respeitado.

``` javascript  
  dados = {  
    ticket: " tamanho maximo 38 caracteres ",
    filial: " tamanho maximo 38 caracteres ",
    placa: " tamanho maximo 30 caracteres ",
    motorista: " tamanho maximo 30 caracteres ",
    transportadora: " tamanho maximo 30 caracteres ",
    produto: " tamanho maximo 30 caracteres ",
    safra: " tamanho maximo 30 caracteres ",
    dataHoraPortaria: " tamanho maximo 19 caracteres ",
    dataHoraEntrada: " tamanho maximo 19 caracteres ",
    pesoBruto: " tamanho maximo 30 caracteres ",
    tara: " tamanho maximo 30 caracteres "
    observacao1: " tamanho maximo 36 caracteres ",
    observacao2: " tamanho maximo 48 caracteres "
  }
```

#
## Melhorias planejadas

* Criar módulo

#
## Changelog

### Versão 1.0.0 (07/02/19)
- Publicação no GIT (07/02/19)

### Versão 1.0.1 (14/03/19)
- Correção dos campos 'observacao1' e 'observacao2' (14/03/19)
- Removidos campos 'endereco1', 'endereco2', 'telefone' e notaFiscal' (14/03/19)


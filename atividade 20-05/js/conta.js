class Conta {
  constructor(numero, agencia, saldo) {
    this.numero = numero;
    this.agencia = agencia;
    this.saldo = saldo;
  }

  calcularTaxa() {
    throw 'Método calcularTaxa não implementado!';
  }

  exibirSaldo() {
    return `Saldo da conta ${this.numero}: R$ ${this.saldo.toFixed(2)}`;
  }
}
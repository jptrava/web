
class ContaPoupanca extends Conta {
  constructor(numero, agencia, saldo) {
    super(numero, agencia, saldo);
    this.taxaFixa = 20;
  }

  calcularTaxa() {
    return this.taxaFixa;
  }
}
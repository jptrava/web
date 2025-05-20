
class ContaCorrente extends Conta {
  constructor(numero, agencia, saldo) {
    super(numero, agencia, saldo);
  }

  calcularTaxa() {
    return this.saldo * 0.07;
  }
}
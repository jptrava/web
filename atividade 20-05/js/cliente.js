
class Cliente {
  constructor(nome, endereco) {
    this.nome = nome;
    this.endereco = endereco;
    this.contas = [];
  }

  adicionarConta(conta) {
    this.contas.push(conta);
  }

  exibirContas() {
    console.log(`Contas de ${this.nome}:`);
    this.contas.forEach(conta => {
      console.log(`- Conta ${conta.numero} (Agência: ${conta.agencia})`);
      console.log(conta.exibirSaldo());
      console.log(`Taxa aplicada: R$ ${conta.calcularTaxa().toFixed(2)}`);
      console.log('----------------------------------');
    });
  }
}
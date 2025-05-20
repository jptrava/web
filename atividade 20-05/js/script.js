

function cadastrarCliente() {
  const nome = prompt("Digite o nome do cliente:");
  const endereco = prompt("Digite o endereço do cliente:");
  const cliente = new Cliente(nome, endereco);

  let continuar = true;
  while (continuar) {
    const tipoConta = prompt("Digite o tipo de conta (1 para Corrente, 2 para Poupança):");
    const numero = prompt("Digite o número da conta:");
    const agencia = prompt("Digite a agência da conta:");
    const saldo = parseFloat(prompt("Digite o saldo da conta:"));

    if (tipoConta === '1') {
      const contaCorrente = new ContaCorrente(numero, agencia, saldo);
      cliente.adicionarConta(contaCorrente);
    } else if (tipoConta === '2') {
      const contaPoupanca = new ContaPoupanca(numero, agencia, saldo);
      cliente.adicionarConta(contaPoupanca);
    } else {
      console.log("Tipo de conta inválido!")
      
    }

    continuar = prompt("Deseja adicionar outra conta? (s para sim, qualquer tecla para não)") === 's';
  }

  cliente.exibirContas();
}


let clientes = []; // Lista global para armazenar os clientes cadastrados

function cadastrarCliente() {
  const nome = prompt("Digite o nome do cliente:");
  const endereco = prompt("Digite o endereço do cliente:");
  const cliente = new Cliente(nome, endereco);

  let continuar = true;
  while (continuar) {
    const tipoConta = prompt("Digite o tipo de conta (1 para Corrente, 2 para Poupança):");
    const numero = prompt("Digite o número da conta:");
    const agencia = prompt("Digite a agência da conta:");
    const saldo = parseFloat(prompt("Digite o saldo da conta:"));

    if (tipoConta === '1') {
      const contaCorrente = new ContaCorrente(numero, agencia, saldo);
      cliente.adicionarConta(contaCorrente);
    } else if (tipoConta === '2') {
      const contaPoupanca = new ContaPoupanca(numero, agencia, saldo);
      cliente.adicionarConta(contaPoupanca);
    } else {
      console.log("Tipo de conta inválido!");
    }

    continuar = prompt("Deseja adicionar outra conta? (s para sim, qualquer tecla para não)") === 's';
  }


  clientes.push(cliente);


  exibirOpcoesCliente(cliente);
}

function exibirOpcoesCliente(cliente) {
  let opcao;
  do {
    opcao = prompt(`
      === MENU CLIENTE ===
      1 - Exibir todas as contas
      2 - Voltar ao menu principal
      3 - Sair
      Escolha uma opção: 
    `);

    switch (opcao) {
      case '1':
        cliente.exibirContas();
        break;
      case '2':
        return; 
      case '3':
        console.log("Saindo... Até logo!");
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  } while (opcao !== '3');
}

function exibirTodasContas() {
  if (clientes.length === 0) {
    console.log("Nenhum cliente cadastrado ainda.");
    return;
  }

  clientes.forEach(cliente => cliente.exibirContas());
}

function menuPrincipal() {
  let opcao;
  do {
    opcao = prompt(`
      ===== MENU PRINCIPAL =====
      1 - Cadastrar um cliente
      2 - Exibir todas as contas de clientes
      3 - Sair
      Escolha uma opção:
    `);

    switch (opcao) {
      case '1':
        cadastrarCliente();
        break;
      case '2':
        exibirTodasContas(); 
      case '3':
        console.log("Saindo... Até logo!");
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  } while (opcao !== '3');
}

menuPrincipal();
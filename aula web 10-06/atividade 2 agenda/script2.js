document.addEventListener("DOMContentLoaded", () => {
    const inputTitulo = document.getElementById("nova_tarefa");
    const listaTarefas = document.getElementById("lista-tarefas");
    const btnAdicionar = document.getElementById("adicionar-btn");

    const inputHorario = document.createElement("input");
    inputHorario.type = "time";
    inputHorario.id = "novo_horario";
    inputHorario.placeholder = "Horário (opcional)";
    inputTitulo.parentNode.insertBefore(inputHorario, inputTitulo.nextSibling);

    const inputLocal = document.createElement("input");
    inputLocal.type = "text";
    inputLocal.id = "novo_local";
    inputLocal.placeholder = "Local (opcional)";
    inputHorario.parentNode.insertBefore(inputLocal, inputHorario.nextSibling);

    const btnLimparTodas = document.createElement("button");
    btnLimparTodas.textContent = "Limpar Todas as Tarefas";
    btnLimparTodas.classList.add("clear-all-btn");
    document.body.appendChild(btnLimparTodas);

    function criarElementoTarefa(tituloTarefa, horarioTarefa, localTarefa) {
        const li = document.createElement("li");
        li.classList.add('tarefa-item');

        const spanTitulo = document.createElement("span");
        spanTitulo.textContent = tituloTarefa;
        spanTitulo.classList.add('titulo-tarefa');

        const spanDetalhes = document.createElement("span");
        spanDetalhes.classList.add('detalhes-tarefa');
        let detalhesTexto = [];
        if (horarioTarefa) {
            detalhesTexto.push(`Horário: ${horarioTarefa}`);
        }
        if (localTarefa) {
            detalhesTexto.push(`Local: ${localTarefa}`);
        }
        spanDetalhes.textContent = detalhesTexto.length > 0 ? ` (${detalhesTexto.join(' | ')})` : '';

        li.appendChild(spanTitulo);
        li.appendChild(spanDetalhes);

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("edit-btn");
        btnEditar.addEventListener("click", () => editarTarefa(li, tituloTarefa, horarioTarefa, localTarefa));

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("delete-btn");
        btnExcluir.addEventListener("click", () => excluirTarefa(li, tituloTarefa));

        li.appendChild(btnEditar);
        li.appendChild(btnExcluir);

        return li;
    }

    function atualizarListenersBotoes(li, novoTitulo, novoHorario, novoLocal) {
        const btnEditar = li.querySelector(".edit-btn");
        const btnExcluir = li.querySelector(".delete-btn");

        btnEditar.replaceWith(btnEditar.cloneNode(true));
        btnExcluir.replaceWith(btnExcluir.cloneNode(true));

        li.querySelector(".edit-btn").addEventListener("click", () => editarTarefa(li, novoTitulo, novoHorario, novoLocal));
        li.querySelector(".delete-btn").addEventListener("click", () => excluirTarefa(li, novoTitulo));
    }

    function carregarTarefas() {
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            try {
                const tarefaObj = JSON.parse(localStorage.getItem(chave));
                if (tarefaObj && typeof tarefaObj === 'object' && tarefaObj.titulo && tarefaObj.horario !== undefined && tarefaObj.local !== undefined) {
                    listaTarefas.appendChild(criarElementoTarefa(tarefaObj.titulo, tarefaObj.horario, tarefaObj.local));
                } else {
                    listaTarefas.appendChild(criarElementoTarefa(chave, '', ''));
                }
            } catch (e) {
                listaTarefas.appendChild(criarElementoTarefa(chave, '', ''));
            }
        }
    }

    function adicionarTarefa(tituloTarefa, horarioTarefa, localTarefa, salvar = true) {
        if (!tituloTarefa) {
            alert("Por favor, digite o título da tarefa.");
            return;
        }

        if (localStorage.getItem(tituloTarefa)) {
            alert(`Já existe uma tarefa com o título "${tituloTarefa}". Por favor, escolha um título diferente.`);
            return;
        }

        const li = criarElementoTarefa(tituloTarefa, horarioTarefa, localTarefa);
        listaTarefas.appendChild(li);

        if (salvar) {
            const tarefaObj = { titulo: tituloTarefa, horario: horarioTarefa, local: localTarefa };
            localStorage.setItem(tituloTarefa, JSON.stringify(tarefaObj));
        }

        inputTitulo.value = "";
        inputHorario.value = "";
        inputLocal.value = "";
    }

    function editarTarefa(li, tituloTarefaAntigo, horarioTarefaAntigo, localTarefaAntigo) {
        const novoTituloTarefa = prompt("Editar título da tarefa:", tituloTarefaAntigo);
        if (!novoTituloTarefa || novoTituloTarefa.trim() === "") {
            alert("O título da tarefa não pode ser vazio.");
            return;
        }

        const novoHorarioTarefa = prompt("Editar horário (HH:MM, opcional):", horarioTarefaAntigo || '');
        const horarioRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
        if (novoHorarioTarefa && !horarioRegex.test(novoHorarioTarefa.trim()) && novoHorarioTarefa.trim() !== '') {
            alert("Formato de horário inválido. Use HH:MM.");
            return;
        }
        const horarioFinal = novoHorarioTarefa ? novoHorarioTarefa.trim() : '';

        const novoLocalTarefa = prompt("Editar local (opcional):", localTarefaAntigo || '');
        const localFinal = novoLocalTarefa ? novoLocalTarefa.trim() : '';

        if (novoTituloTarefa !== tituloTarefaAntigo || horarioFinal !== horarioTarefaAntiga || localFinal !== localTarefaAntigo) {

            if (novoTituloTarefa !== tituloTarefaAntigo) {
                if (localStorage.getItem(novoTituloTarefa)) {
                    alert(`Já existe uma tarefa com o novo título "${novoTituloTarefa}". Por favor, escolha um título diferente.`);
                    return;
                }
                localStorage.removeItem(tituloTarefaAntigo);
            }

            li.querySelector('.titulo-tarefa').textContent = novoTituloTarefa;
            let detalhesTexto = [];
            if (horarioFinal) {
                detalhesTexto.push(`Horário: ${horarioFinal}`);
            }
            if (localFinal) {
                detalhesTexto.push(`Local: ${localFinal}`);
            }
            li.querySelector('.detalhes-tarefa').textContent = detalhesTexto.length > 0 ? ` (${detalhesTexto.join(' | ')})` : '';

            const novaTarefaObj = { titulo: novoTituloTarefa, horario: horarioFinal, local: localFinal };
            localStorage.setItem(novoTituloTarefa, JSON.stringify(novaTarefaObj));

            atualizarListenersBotoes(li, novoTituloTarefa, horarioFinal, localFinal);
        } else {
            alert("Nenhuma alteração detectada.");
        }
    }

    function excluirTarefa(li, chaveDaTarefa) {
        if (confirm(`Tem certeza que deseja excluir a tarefa "${chaveDaTarefa}"?`)) {
            li.remove();
            localStorage.removeItem(chaveDaTarefa);
        }
    }

    function limparTodasAsTarefas() {
        if (confirm("Tem certeza que deseja limpar TODAS as tarefas? Esta ação é irreversível.")) {
            localStorage.clear();
            listaTarefas.innerHTML = "";
        }
    }

    btnAdicionar.addEventListener("click", () => {
        adicionarTarefa(inputTitulo.value.trim(), inputHorario.value.trim(), inputLocal.value.trim());
    });

    [inputTitulo, inputHorario, inputLocal].forEach(input => {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                btnAdicionar.click();
            }
        });
    });

    btnLimparTodas.addEventListener("click", limparTodasAsTarefas);

    carregarTarefas();
});
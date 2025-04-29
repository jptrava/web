document.addEventListener("DOMContentLoaded", () => {
    const inputTarefa = document.getElementById("nova_tarefa");
    const btnAdicionar = document.getElementById("adicionar-btn");
    const listaTarefas = document.getElementById("lista-tarefas");

    function adicionarTarefa(tarefa) {
        const li = document.createElement("li");
        li.textContent = tarefa;

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("edit-btn");
        btnEditar.addEventListener("click", () => editarTarefa(tarefa, li));

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("delete-btn");
        btnExcluir.addEventListener("click", () => excluirTarefa(li));

        li.appendChild(btnEditar);
        li.appendChild(btnExcluir);

        listaTarefas.appendChild(li);
    }

    function editarTarefa(tarefa, li) {
        const novaTarefa = prompt("Editar tarefa:", tarefa);
        if (novaTarefa && novaTarefa.trim() !== "") {
            li.firstChild.textContent = novaTarefa;
        }
    }

    function excluirTarefa(li) {
        if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
            li.remove();
        }
    }

    btnAdicionar.addEventListener("click", () => {
        const tarefa = inputTarefa.value.trim();
        if (tarefa !== "") {
            adicionarTarefa(tarefa);
            inputTarefa.value = "";
        } else {
            alert("Por favor, digite uma tarefa.");
        }
    });

    inputTarefa.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            btnAdicionar.click();
        }
    });
});

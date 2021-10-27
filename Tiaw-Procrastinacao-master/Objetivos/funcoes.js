$(function () {

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var tbObjetivos = localStorage.getItem("tbObjetivos");// Recupera os dados armazenados

	tbObjetivos = JSON.parse(tbObjetivos); // Converte string para objeto

	if (tbObjetivos == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbObjetivos = [];

	function Adicionar() {
		var cli = GetCliente("Objetivo", $("#txtObjetivo").val());

		if (cli != null) {
			alert("Código já cadastrado.");
			return;
		}

		var cliente = JSON.stringify({
			Objetivo: $("#txtObjetivo").val(),
			Porque: $("#txtPorque").val(),
			Status: $("#txtStatus").val(),
			DataEntrega: $("#txtDataEntrega").val(),
			DataFinal: $("#txtDataFinal").val()
		});

		tbObjetivos.push(cliente);

		localStorage.setItem("tbObjetivos", JSON.stringify(tbObjetivos));

		alert("Objetivo adicionado.");
		return true;
	}

	function Editar() {
		tbObjetivos[indice_selecionado] = JSON.stringify({
			Objetivo: $("#txtObjetivo").val(),
			Porque: $("#txtPorque").val(),
			Status: $("#txtStatus").val(),
			DataEntrega: $("#txtDataEntrega").val(),
			DataFinal: $("#txtDataFinal").val()
		});
		localStorage.setItem("tbObjetivos", JSON.stringify(tbObjetivos));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}

	function Listar() {
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>" +
			"	<tr>" +
			"<th></th>" +
			"	<th>Seus Objetivos</th>" +
			"	<th>Motivação</th>" +
			"	<th>Estado atual</th>" +
			"	<th>Data de Entrega</th>" +
			"   <th>Data Final</th>" +
			"	</tr>" +
			"</thead>" +
			"<tbody>" +
			"</tbody>"
		);

		for (var i in tbObjetivos) {
			var cli = JSON.parse(tbObjetivos[i]);
			$("#tblListar tbody").append(
				"<tr>" +
				"	<td><img src='edit.png' alt='" + i + "' class='btnEditar'/><img src='delete.png' alt='" + i + "' class='btnExcluir'/></td>" +
				"	<td>" + cli.Objetivo + "</td>" +
				"	<td>" + cli.Porque + "</td>" +
				"	<td>" + cli.Status + "</td>" +
				"	<td>" + cli.DataEntrega + "</td>" +
				"	<td>" + cli.DataFinal + "</td>" +
				"</tr>");
		}
	}

	function Excluir() {
		tbObjetivos.splice(indice_selecionado, 1);
		localStorage.setItem("tbObjetivos", JSON.stringify(tbObjetivos));
		alert("Objetivo excluído.");
	}

	function GetCliente(propriedade, valor) {
		var cli = null;
		for (var item in tbObjetivos) {
			var i = JSON.parse(tbObjetivos[item]);
			if (i[propriedade] == valor)
				cli = i;
		}
		return cli;
	}

	Listar();

	$("#frmCadastro").on("submit", function () {
		if (operacao == "A")
			return Adicionar();
		else
			return Editar();
	});

	$("#tblListar").on("click", ".btnEditar", function () {
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbObjetivos[indice_selecionado]);
		$("#txtObjetivo").val(cli.Objetivo);
		$("#txtPorque").val(cli.Porque);
		$("#txtStatus").val(cli.Status);
		$("#txtDataEntrega").val(cli.DataEntrega);
		$("#txtDataFinal").val(cli.DataFinal);
		$("#txtObjetivo").attr("readonly", "readonly");
		$("#txtPorque").focus();
	});

	$("#tblListar").on("click", ".btnExcluir", function () {
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
});

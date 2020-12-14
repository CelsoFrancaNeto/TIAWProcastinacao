if (localStorage.dataInicio) {
	document.getElementById('dataInicio').value = localStorage.dataInicio;
}
if (localStorage.dataFinal) {
	document.getElementById('dataFinal').value = localStorage.dataFinal;
}

var saveData = function() {

	var dataInicio = document.getElementById('dataInicio').value;
	var dataFinal = document.getElementById('dataFinal').value;

	localStorage.setItem('dataInicio', dataInicio);
	localStorage.setItem('dataFinal', dataFinal);
};

document.onchange = saveData;

async function init() {
	console.log("init")
	checkLocalStorage();
	await fetchData();
	loadingStorys(DefaultData);
}

function checkLocalStorage() {
	
}

let DefaultData;

async function fetchData() {
	let response = await fetch("http://localhost:5500/defaultData.json");
	let defaultData = await response.json();
	console.log(defaultData);
	DefaultData = defaultData;
}

function renderit(id, html) {
	document.getElementById(id).innerHTML += html
}

function loadingStorys(DefaultData) {
	console.log(DefaultData)
}
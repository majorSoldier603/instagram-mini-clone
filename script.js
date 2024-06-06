async function init() {
	console.log("Try init")
	if (localStorage.UserData) {
		console.log("Local Storage was found, Loading it ...")

	} else {
		console.warn("Local Storage was not found, Loading default ...")
		initLocalStorage();
	}
	
}

function DEL() {
	localStorage.clear();
	console.log(localStorage)
}

async function initLocalStorage() {
	await fetchData();
	loadingStorys();
}

async function fetchData() {
	let response = await fetch("http://localhost:5500/defaultData.json");
	let defaultData = await response.json();
	console.log(defaultData);
	setNewlocalStorage(defaultData);
}

function setNewlocalStorage(defaultData) {
	console.log(defaultData)
	localStorage.setItem('UserData', JSON.stringify(defaultData.UserData))
}

function renderit(id, html) {
	id.innerHTML = ''
	id.innerHTML += html
}

function loadingStorys() {
	const LoopData = JSON.parse(localStorage.getItem("UserData") || "[]");
	console.log(LoopData)

	for (let index = 0; index < LoopData.length; index++) {
		let profileImg = localStorage.UserData[index]
		console.log(localStorage)
		console.log(profileImg)
		renderit(storys, `<div><img src="${profileImg}" alt="" srcset=""><h5>${localStorage.UserData[index].profileimg}</h5></div>`)
	}
}
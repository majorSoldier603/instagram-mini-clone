async function init() {
	console.log("Try init")
	if (localStorage.UserData) {
		console.log("Local Storage was found, Loading it ...")
		loadingStorys();
		LoadUser();
		LoadRecommended();
		LoadPosts();
	} else {
		console.warn("Local Storage was not found, Loading default ...")
		await fetchData();
		loadingStorys();
		LoadUser();
		LoadRecommended();
		LoadPosts();
	}
}

function DEL() {
	localStorage.clear();
	console.log(localStorage)
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
	localStorage.setItem('LoginUser', JSON.stringify(defaultData.LoginUser))
	localStorage.setItem('Recommended', JSON.stringify(defaultData.Recommended))
	localStorage.setItem('Posts', JSON.stringify(defaultData.Posts))
}

function renderit(id, html) {
	id.innerHTML += html
}

function isLike(isIt) {
	debugger
	if (isIt) {
		return "heart-69-64.png"
	} else {
		return "favorite-3-64.png"
	}
}

function loadingStorys() {
	const LoopData = JSON.parse(localStorage.getItem("UserData") || "[]");
	console.log(LoopData)
	
	for (let index = 0; index < LoopData.length; index++) {
		renderit(storys, `<div><img src="${LoopData[index].profileimg}" alt="" srcset=""><h5>${LoopData[index].userName}</h5></div>`)
	}
}

function LoadUser() {
	const LoopData = JSON.parse(localStorage.getItem("LoginUser") || "[]");
	console.log(LoopData)
	
	for (let index = 0; index < LoopData.length; index++) {
		renderit(LoginUser, `<img src="${LoopData[index].profileimg}" alt=""><div><div><p>${LoopData[index].userName}</p><h6>User</h6></div><a>Switch</a></div>`)
	}
}

function LoadUser() {
	const LoopData = JSON.parse(localStorage.getItem("LoginUser") || "[]");
	console.log(LoopData)
	
	for (let index = 0; index < LoopData.length; index++) {
		renderit(LoginUser, `<img src="${LoopData[index].profileimg}" alt=""><div><div><p>${LoopData[index].userName}</p><h6>User</h6></div><a>Switch</a></div>`)
	}
}

function LoadRecommended() {
	const LoopData = JSON.parse(localStorage.getItem("Recommended") || "[]");
	console.log(LoopData)
	
	
	for (let index = 0; index < LoopData.length; index++) {
		renderit(RecommendedMenu, `<div><img src="${LoopData[index].profileimg}" alt=""><div><div><p>${LoopData[index].userName}</p><h6>User</h6></div><a>Follow</a></div></div>`)
	}
}

function LoadPosts() {
	const LoopData = JSON.parse(localStorage.getItem("Posts") || "[]");
	const LoopDataUser = JSON.parse(localStorage.getItem("UserData") || "[]");
	console.log(LoopData)
	console.log(LoopDataUser)

	for (let index = 0; index < LoopData.length; index++) {
		createtionDate = new Date(LoopData[index].createtAt).toLocaleDateString("de-DE")
		renderit(Posts, `
			<article>
				<section class="mainContentImgsHead">
					<img src="${LoopDataUser[LoopData[index].PostedBy].profileimg}" alt="" srcset="">
					<p>${LoopDataUser[LoopData[index].PostedBy].userName}</p>
					<p>${createtionDate}</p>
				</section>
				<div>
					<img src="${LoopData[index].PostImg}" alt="">
					<div>
						<div>
							<a onclick=""><img src="./img/${isLike(LoopData[index].isLiked)}" alt=""></a>
							<a onclick=""><img src="./img/message-2-64.png" alt=""></a>
							<a onclick=""><img src="./img/add-64.png" alt=""></a>
						</div>
						<div>
							<a onclick=""> <img src="./img/bookmark-4-64.png" alt=""></a>
						</div>
					</div>
				</div>
				<div class="mainContentComments">
					<h4 id="${"likeCounter" + index}">Liked ${LoopData[index].Likes} Times</h4>
				
					<section>
						<article>
							<h3>User</h3>
							<h4>Meningless Bs</h4>
						</article>
					</section>
					<div>
						<input type="text" name="comment" id="commentin">
						<input type="button" name="comment" value="dwada" id="commentBnt">
					</div>
				</div>
			</article>
		`)
	}
}
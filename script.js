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
	localStorage.setItem('Recommended', JSON.stringify(defaultData.Recommended))
	localStorage.setItem('Posts', JSON.stringify(defaultData.Posts))
}

function renderit(id, html) {
	id.innerHTML += html
}

function isLike(isIt) {
	if (isIt) {
		return "heart-69-64.png"
	} else {
		return "favorite-3-64.png"
	}
}

function returnComments(Current, UserData) {

	htmlComment =`<span><h3>${UserData[Current.CommentBy].userName}</h3>`+`<h4>${Current.Comment}</h4></span>`
	
	return htmlComment
}

function liken(index) {
	let PostsData = JSON.parse(localStorage.getItem("Posts") || "[]");

	likeimg = document.getElementById("likeimg" + index)
	likeCounter = document.getElementById("likeCounter"+ index)
	if (PostsData[index].isLiked) {
		likeimg.src = "./img/favorite-3-64.png"
		likeCounter.innerHTML = `Liked ${PostsData[index].Likes -1} Times`   
	} else if (!PostsData[index].isLiked) {
		likeimg.src = "./img/heart-69-64.png"
		likeCounter.innerHTML = `Liked ${PostsData[index].Likes +1} Times`
	}

	addlikenDB(index, PostsData)
}

function addlikenDB(index, PostsData) {
	if (PostsData[index].isLiked) {
		PostsData[index].isLiked = false
		cacheing = PostsData[index].Likes -1
		PostsData[index].Likes = cacheing
	} else if (!PostsData[index].isLiked) {
		PostsData[index].isLiked = true
		cacheing = PostsData[index].Likes +1
		PostsData[index].Likes = cacheing
	}

	console.log(PostsData[index])
	localStorage.setItem('Posts', JSON.stringify(PostsData))

}

function postComment(index) {
	const UserData = JSON.parse(localStorage.getItem("UserData") || "[]");

	commentinput = document.getElementById("commentin" + index)
	commentbnt = document.getElementById("commentbnt" + index)
	commentsFromPost = document.getElementById("commentsFromPost" + index)
	htmlString = `<span><h3>${UserData[0].userName}</h3><h4>${commentinput.value}</h4></span>`

	renderit(commentsFromPost, htmlString)
	
	addCommentDB(commentinput.value , index);

	commentinput.value =''
}

function addCommentDB(comment, index) {
	let PostsData = JSON.parse(localStorage.getItem("Posts") || "[]");
	
	PostsData[index].Comments.push({CommentID: PostsData[index].Comments.length, CommentBy: 0, Comment: `${comment}`})

	localStorage.setItem('Posts', JSON.stringify(PostsData))
}

function loadingStorys() {
	const LoopData = JSON.parse(localStorage.getItem("UserData") || "[]");
	console.log(LoopData)
	
	for (let index = 1; index < LoopData.length; index++) {
		renderit(storys, `<div><img src="${LoopData[index].profileimg}" alt="" srcset=""><h5>${LoopData[index].userName}</h5></div>`)
	}
}

function LoadUser() {
	const LoopData = JSON.parse(localStorage.getItem("UserData") || "[]");
	console.log(LoopData)
	
	renderit(LoginUser, `<img src="${LoopData[0].profileimg}" alt=""><div><div><p>${LoopData[0].userName}</p><h6>User</h6></div><a>Switch</a></div>`)
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

	let index

	for (index = 0; index < LoopData.length; index++) {
		createtionDate = new Date(LoopData[index].createtAt).toLocaleDateString("de-DE")
		

		let comment
		console.log(comment)

		LoopData[index].Comments.forEach(element => {
			Current = index
			if (Current === index) {
				if (comment === undefined) {
					comment = ""	
				}
				comment += returnComments(element, LoopDataUser)
			} else {
				comment = returnComments(element, LoopDataUser)
			}
		})

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
							<a onclick="liken(${index});"><img id="likeimg${index}" src="./img/${isLike(LoopData[index].isLiked)}" alt=""></a>
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
						<article id="commentsFromPost${index}">
						${comment}
						</article>
					</section>
					<div>
						<input type="text" name="comment" id="commentin${index}">
						<input type="button" onclick="postComment(${index})" name="comment" value="Comment" id="commentBnt${index}">
					</div>
				</div>
			</article>
		`)
	}
}
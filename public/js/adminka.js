const someSpinner = gid("someSpinner");
function getUsers(el){
	contentBox.innerHTML = "";
	
	someSpinner.className = "show";
	
		vax('get', '/api/getUsers', {}, on_get_users, on_error, el, false);
	
	
}
function on_get_users(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
}
function on_error(l, v){
	console.error(l);
	someSpinner.className = "hide";
	note({ content: l.message, type: "error", time: 5 });
}

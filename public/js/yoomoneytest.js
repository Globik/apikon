const yform = document.forms.myyoomoney;
yform.addEventListener('submit', saveSecret, false);
function saveSecret(ev){
	ev.preventDefault();
	let client_id = ev.target['client_id'].value.trim();
	let client_secret = ev.target.client_secret.value.trim();
	if(!client_id || !client_secret) return;
	let d = {};
	d.client_id = client_id;
	d.client_secret = client_secret;
	console.log(d);
vax(ev.target.method, ev.target.action, d, on_save_client, on_error, ev.target, false);
ev.target.className = "puls";
ev.target.disabled = true;
}
function on_save_client(l, ev){
	ev.className = "";
	ev.target.disabled = false;
	note({ content: l.message, type: (l.error?"error":"info"), time: 5 });
}
function on_error(l, ev){
	ev.className = "";
	ev.target.disabled = false;
	note({ content: l.message, type:"error", time: 5 });
}

function goAuth(el){
	el.className = "puls";
	el.disabled = true;
	vax('post', '/admin/getYoomoney', {}, on_save_getAuth, on_getAuth_error, el, false);
}
function on_save_getAuth(l, el){
	el.className = "";
	el.disabled = false;
	note({ content: l.message, type: (l.error?"error":"info"), time: 5 });
	window.location.href=l.message;
}

function on_getAuth_error(l, el){
	el.className = "";
	el.disabled = false;
	note({ content: l, type:"error", time: 5 });
}
function getInfo(el){
	el.className = "puls";
	el.disabled = true;
	vax('post', '/admin/getYoomoneyinfo', {}, on_get_info, on_getAuth_error, el, false);
}

function on_get_info(l, el){
	el.className = "";
	el.disabled = false;
	console.log(l.message, l.list);
	if(l.error){
		note({ content: l.message.code, type: 'error', time: 5 });
		return;
	}
	for(let i in l.list){
	out.innerHTML += l.list[i] + 'br';
}
}








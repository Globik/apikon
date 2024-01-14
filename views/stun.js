
function stun(n){
	return `<section id="stunContainer">
	<header>Образец:</header>
	<pre>
	 var iceServers = {"iceServers": [ 
	  {
        urls: 'stun:stun.l.google.com:19302'
      },
      { urls: 'turn:relay1.expressturn.com:3478', username: 'efZIKNPZ0Y17GFG3WZ', credential: 'HIYNupkIAHFXSgW8'},
 { urls: "stun:stun.relay.metered.ca:80", },
{ urls: "turn:a.relay.metered.ca:80", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
{ urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", },
  { urls: "turn:a.relay.metered.ca:443", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
  { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }
  ]};
	</pre>
	
	<form name="stun" action="/api/stun1" id="suka" method="post">
	<div>
	<!-- stun:stun.l.google.com:19302 -->
	<label> <b>stun 1 address: </b><input type="text" class="stuninp" placeholder="stun:stun.l.google.com:19302" value="stun:stun.l.google.com:19302" required name="stun1"/></label>
	</div><hr>
	<div>
	<label> <b>stun 2 address: </b><input class="stuninp" type="text" required name="stun2"  placeholder="stun:stun.relay.metered.ca:80" value="${stun2(n)?stun2(n):''}"/></label>
	</div><hr>
	<section>
	<div>
	<label> <b>turn 1 address: </b><input class="stuninp" type="text" required name="turn1" placeholder="turn:a.relay.metered.ca:80" value="${turn1(n)?turn1(n):''}"/></label>
	</div>
	<div>
	<label> <b>username: </b><input class="stuninp" type="text" required name="username1" placeholder="username" value="${username1(n)?username1(n):''}"/></label>
	</div>
	<div>
	<label> <b>credential: </b><input class="stuninp" type="text" required name="credential1" placeholder="credential" value="${credential1(n)?credential1(n):''}"/></label>
	</div>
	</section>
	<hr>
	<section>
	<div>
	<label> <b>turn 2 address: </b><input class="stuninp" type="text" required name="turn2" placeholder="turn:a.relay.metered.ca:80?transport=tcp" value="${turn2(n)?turn2(n):''}"/></label>
	</div>
	<!--
	<div>
	<label> <b>username: </b><input class="stuninp" type="text" required name="username1" placeholder="username" value="${username1(n)?username1(n):''}"/></label>
	</div>
	<div>
	<label> <b>credential: </b><input class="stuninp" type="text" required name="credential1" placeholder="credential" value="${credential1(n)?credential1(n):''}"/></label>
	</div>
	-->
	</section>
	<hr>
	<section>
	<div>
	<label> <b>turn 3 address: </b><input class="stuninp" type="text" placeholder="turn:a.relay.metered.ca:443" name="turn3" value="${turn3(n)?turn3(n):''}"/></label>
	</div>
	<!--
	<div>
	<label> <b>username: </b><input class="stuninp" type="text" required name="username1" placeholder="username" value="${username1(n)?username1(n):''}"/></label>
	</div>
	<div>
	<label> <b>credential: </b><input class="stuninp" type="text" required name="credential1" placeholder="credential"  value="${credential1(n)?credential1(n):''}"/></label>
	</div>
	_-->
	</section>
	<hr>
	<section>
	<div>
	<label> <b>turn 4 address: </b><input class="stuninp" type="text" placeholder="turn:a.relay.metered.ca:443?transport=tcp" name="turn4" value="${turn4(n)?turn4(n):''}"/></label>
	</div>
	<!--
	<div>
	<label> <b>username: </b><input class="stuninp" type="text" required name="username1" placeholder="username" value="${username1(n)?username1(n):''}"/></label>
	</div>
	<div>
	<label> <b>credential: </b><input class="stuninp" type="text" required name="credential1" placeholder="credential"  value="${credential1(n)?credential1(n):''}"/></label>
	</div>
	-->
	</section>
	<hr>
	<section>
	<div>
	<label> <b>turn 5 address: </b><input class="stuninp" type="text"  name="turn5" placeholder="turn:relay1.expressturn.com:3478" value="${turn5(n)?turn5(n):''}"/></label>
	</div>
	<div>
	<label> <b>username2: </b><input class="stuninp" type="text" required name="username2" placeholder="username2" value="${username2(n)?username2(n):''}"/></label>
	</div>
	<div>
	<label> <b>credential2: </b><input class="stuninp" type="text" required name="credential2" placeholder="credential2" value="${credential2(n)?credential2(n):''}"/></label>
	</div>
	</section><hr>
	<div>
	<button type="submit" onsubmit="goStun(this);">Сохранить</button>
	</div>
	</form>
	</section>`;
}
module.exports = { stun }


function get_stun(n){
	let a=n;
	
	try{
		//a = JSON.parse(n.stun);
		a = n.stun;
		//console.log('*** a ***: ', a);
		return a;
	}catch(err){
		//console.log("*** err *** ", err);
		return null;
	}
	return a;
	
}
function stun2(n){
	let a = get_stun(n);
	if(!a) return null;
	let b = a.stun2;
	//console.log('*** b *** ', b.stun2);
	return b;
}
function turn1(n){
	let a = get_stun(n);
	if(!a) return null;
	let b = a.turn1;
	return b;
}
function turn2(n){
	let a = get_stun(n);
	if(!a) return null;
	let b = a.turn2;
	return b;
}
function turn3(n){
	let a = get_stun(n);
	if(!a) return null;
	let b = a.turn3;
	return b;
}
function turn4(n){
	let a = get_stun(n);
	if(!a) return null;
	let b = a.turn4;
	return b;
}
function turn5(n){
	let a = get_stun(n);
	if(!a) return null;
	let b = a.turn5;
	return b;
}

function username1(n){
	let a = get_stun(n);
	if(!a) return null;
	let b = a.username1;
	return b;
}
function username2(n){
	let a = get_stun(n);
	if(!a) return null;
	let b = a.username2;
	return b;
}
function credential1(n){
	let a = get_stun(n);
	if(!a) return null;
	let b = a.credential1;
	return b;
}
function credential2(n){
	let a = get_stun(n);
	if(!a) return null;
	let b = a.credential2;
	return b;
}

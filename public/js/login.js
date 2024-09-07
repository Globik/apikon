/*
    window.onload=function(){
   const cat = localStorage.getItem("myCat");
   if(!cat && cat !=="Tom"){
    window.location.href="#regeln";
}else{
	let islogin = localStorage.getItem("islogin");
	if(!islogin && islogin !=="yes")window.location.href="#login";
}
}
   
    
function confirmRules(){
	localStorage.setItem("myCat", "Tom");
	window.location.href="#login";
}
function isOpenModal(){
	 window.location.href="#regeln";
}
*/
function logi(el){
	el.preventDefault();
	//el.stopPropogation();
}

const myform = gid("myform");
const name = gid("name");
const password = gid("password");
const btnlogin = gid("btnlogin");
const btnregister = gid("btnregister");
btnlogin.addEventListener('click', register, false);
btnregister.addEventListener('click', register, false);

async function register(el){
	el.preventDefault();
	//el.stopPropagation();
    errormsg.textContent = "";
   
   var sname = document.getElementById('name').value;
   if(!sname){
	    note({content:"Введите имя!", type:"info", time: 5});
	    return;
	}
	if(!password.value){
		note({content: "Введите пароль!", type: "info", time: 5});
		return;
	}
	el.target.disabled = true;
let user = {};
user.name = sname;
user.password = password.value;
user.type = "gewohn";

let uri = (el.target.className=="register-button" ? "/api/register":"/api/auth");
//alert(uri)
//console.warn(uri)
try{
var r=await fetch(uri, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(user)
    });
    
  console.log('res ', r);
    if(r.ok){
		console.log('ok');
		let data=await r.json();
		console.log('data: ', data);
		if(data.error){
			//Missing credentials", status: 401
			//'Пароль должен содержать минимум 6 символов, а Имя минимум 2!', status: 402
			//'Имя должно быть меньше 20 букв.', status: 403
			// 404 nick already in use
			//'Пользователь не найден!', status:406
			//'Имя или пароль неверный!!', status:407
			let s;
			if(data.status == 401){
				s=L()=='ru'?'Нет пароля или ника':L()=='en'?data.message:
				L()=='zh'?'没有密码或昵称':
				L()=='id'?'Bukan masalah atau masalah':'';
			}else if(data.status == 402){
				s=L()=='ru'?data.message:L()=='en'?'Password is minimum 6 symbols and nick 2 as a minimmum!':
				L()=='zh'?'密码必须至少包含 6 个字符，名称必须至少包含 2 个字符':
				L()=='id'?'Password minimal 6 simbol dan nick minimal 2!':'';
			}else if(data.status == 403){
				s=L()=='ru'?data.message:L()=='en'?'Nick must content less than 20 letters':
				L()=='zh'?'名称必须少于 20 个字母':
				L()=='id'?'Nick harus berisi kurang dari 20 huruf':'';
			}else if(data.status == 404){
				s=L()=='ru'?data.message:L()=='en'?'Nick already in use!':
				L()=='zh'?'名字已经在那里了!':
				L()=='id'?'Nick sudah digunakan':'';
			}else if(data.status == 406){
				s=L()=='ru'?data.message:L()=='en'?'User not found!':
				L()=='zh'?'未找到用户':
				L()=='id'?'Pengguna tidak ditemukan':"'";
			}else if(data.status == 407){
				s=L()=='ru'?data.message:L()=='en'?'Nick or password wrong':
				L()=='zh'?'用户名或密码不正确':
				L()=='id'?'Nick atau kata sandi salah':'';
			}else if(data.status == 409){
				s=L()=='ru'?data.message:"You're banned!";
			}else{
				s = data.message;
			}
			 errormsg.textContent = s;//data.message;
			
			  setTimeout(() => {
        el.target.disabled = false;
         errormsg.textContent = "";
        }, 3500)
return;
			 
		}
	
localStorage.setItem("islogin" , "yes");
window.location.href="#."
          location.reload();
         // in_rem_hash();
          
   
		
	}
	
}catch(error){
	
      

        setTimeout(() => {
          errormsg.textContent = "";
        }, 3500)

        console.error(error)
	
	}
	el.style.backGround="green";
	}
	function logi(ev){
		ev.preventDefault();
	}
	
async function logout(){
	try{
var r=await fetch('/logout', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({user:'user'})
    });
    
  console.log('res ', r);
    if(r.ok){
		console.log('ok');
		let data=await r.json();
		console.log('data: ', data);
		if(data.error){
			console.error(data.error);
			 errormsg.textContent = data.message;
			
			  setTimeout(() => {
        
         errormsg.textContent = "";
        }, 3500)
return;
			 
		}
	//localStorage.removeItem("islogin");
	//localStorage.removeItem("myCat");
	location.reload();
}}catch(err){
	alert(err);
}
}

async function onTelega(user){
	alert(JSON.stringify(user));
	console.log(user);
	try{
var r = await fetch('/api/register', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({ type: "tg", password:'123456', tgid: user.id, hash: user.hash, name: user.username, auth_date: user.auth_date, first_name: user.first_name })
    });
    //alert(JSON.stringify(r));
  console.log('res ', r);
    if(r.ok){
		console.log('ok');
		let data=await r.json();
		console.log('data: ', data);
		if(data.error){
			 errormsg.textContent = data.message;
			
			  setTimeout(() => {
    //    el.target.disabled = false;
         errormsg.textContent = "";
        }, 3500)
return;
			 
		}
	
localStorage.setItem("islogin" , "yes");
window.location.href="#."
         // location.reload();
}
}catch(error){
	console.log(error);
    //  alert(error);

        setTimeout(() => {
          errormsg.textContent = "";
        }, 3500)

        console.error(error)
	
	}
	//el.style.backGround="green";
	}

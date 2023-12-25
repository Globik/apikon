
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

function logi(el){
	el.preventDefault();
}


myform.addEventListener('submit', logi, false);

async function register(el){
	//myform.preventDefault();
    errormsg.textContent = "";
   // commit('setLoading', true)
let user = {};
user.name = document.getElementById('name').value;
user.password = password.value;
//alert(JSON.stringify(user))
let uri = (el.className=="register-button" ? "/api/register":"/api/auth");
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
			 errormsg.textContent = data.message;
			// commit('setLoading', false);
			  setTimeout(() => {
         // commit('clearError')
         errormsg.textContent = "";
        }, 3500)
return;
			 
		}
	//	if (data.user && data.user.token) {
        //  localStorage.setItem('accessToken', data.user.token)
          //localStorage.setItem('currentUser', JSON.stringify(data.user))
         // axios.defaults.headers.common['Authorization'] = `Bearer ${data.user.token}`

         // commit('setUser', data.user)
          //commit('setToken', data.user.token)
          //commit('setLoading', false)
localStorage.setItem("islogin" , "yes");
window.location.href="#."
          location.reload()
    //    }
		
	}
	
}catch(error){
	
      //  commit('setLoading', false)

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

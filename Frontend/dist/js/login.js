
    window.onload=function(){
   const cat = localStorage.getItem("myCat");
   if(!cat && cat !=="Tom"){
    window.location.href="#regeln";
}
}
   
    
function confirmRules(){
	localStorage.setItem("myCat", "Tom");
	window.location.href="#";
}

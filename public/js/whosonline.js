function showWhosOnline(){
	window.location.href = "#whosonline";
	panelOpen();
}

function handleDynamic(obj){
	let whosonlinecontent = gid('whosonlinecontent');
	//console.log(obj);
	if(obj.sub == "total"){
		camsCount.textContent = obj.cams.length;
		let b = setConnects(obj.cams.length);
		//if(b){
		connects.textContent = b;
	//}
		obj.cams.forEach(function(el, i){
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", el[1].id);
		d.innerHTML=`<div class="caption">${el[1].nick}</div><div class="dynamicImgHalter"><img data-pid="${el[1].id}" src="${el[1].src}"/></div>`;
		whosonlinecontent.appendChild(d);
	})
	}else if(obj.sub == "remove"){
		camsCount.textContent = obj.camcount;
		let b = setConnects(obj.camcount);
		
		connects.textContent = b;
	let el = document.querySelector(`[data-id="${obj.id}"]`);
	if(el)el.remove();
	}else if(obj.sub == "add"){
		
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", obj.id);
		d.innerHTML=`<div class="caption">${obj.nick}</div><div class="dynamicImgHalter"><img src="${obj.src}"/></div>`;
		whosonlinecontent.appendChild(d);
		camsCount.textContent = obj.camcount;
		 
		let b = setConnects(obj.camcount);
		
		connects.textContent = b;
	
		
	}else if(obj.sub == "connects"){
		//alert('connects');
		//let b = Number(obj.connects);
		//if(b == 0)return;
		//connects.textContent = b / 2;
	}else if(obj.sub == "srcdata"){
		let el = document.querySelector(`[data-pid="${obj.id}"]`);
		if(el) el.src = obj.src;
	}else{
		
	}
}

// https://dev.vk.com/ru/admin/app-settings/52272918/platform

vkBridge.subscribe((e)=>{console.log('vk ', e);})

vkBridge.supportsAsync('VKWebAppResizeWindow').then(res=>{
	if(res){
		console.log('res ', res);
		//vkBridge.send('VKWebAppResizeWindow',{'width': 800, 'height': 1000 });
	}
})

// https://dev.vk.com/ru/admin/app-settings/52272918/platform 1000 x 730 | 576 278 bolshoi snippet 1120 × 630 px 3 screenshot Размер: 600 × 1200 px
if(vkBridge){
vkBridge.subscribe((e)=>{console.log('vk ', e);})

vkBridge.supportsAsync('VKWebAppResizeWindow').then(res=>{
	if(res){
		console.log('res ', res);
		//vkBridge.send('VKWebAppResizeWindow',{'width': 800, 'height': 1000 });
	}
})
}

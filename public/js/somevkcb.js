 //console.log('href ', window.location.href);
 //out.textContent = 'hash ' + window.location.hash+'\n';
 let suka ="https://rouletka.ru/api/somevkcb?code=vk2.a.tYdm42pt3VNhKViiOWSw8pDYYbDz-WpKtvCZKSuqGpS1JCYcc_dqezXY1pwlZS7O1usPba_PjlCuZHkWjZzlgam6sUTnksejEZGJL7YWo3bxCRPkbprFmZ0HhVjPr9vGQkSTXEKE150fCamJYT5gWOIwiOwaPPscd29RI8qiwUX3a0ZAvezaoY_3rPnlTf8_vLYuQJYvhQvhoeK31g90cg&expires_in=600&device_id=_DZZ5pSqLBisirU9QwknViW0hIFf3iJdNFgqjVFMGb2l82Pt89yKpeeqFcsz4vQx_GI2emyyWxj9NzzaOZ0CCg&state=mamamia&type=code_v2";
 const url = new URL(suka);
 console.log('url.search ', url.search);
 const paramStr = new URLSearchParams(url.search);
 out.textContent += 'code ' + paramStr.get('code') + ' device_id ' + paramStr.get('device_id');
//https://id.vk.com/authorize?lang_id=0&scheme=light&code_challenge=6NLj0mGsBS4Nt7UwpUnjzhVV8P-vI1poOdE6r0qmA2w&code_challenge_method=s256&client_id=52271555&response_type=code&state=mamamia&provider=vkid&prompt=&stats_info=eyJmbG93X3NvdXJjZSI6ImZyb21fbXVsdGlicmFuZGluZyIsInNlc3Npb25faWQiOiJqaGtieHYifQ%3D%3D&origin=https%3A%2F%2Frouletka.ru&v=2.3.0&sdk_type=vkid&app_id=52271555&redirect_uri=https%3A%2F%2Frouletka.ru%2Fapi%2Fsomevkcb

 //console.log('href ', window.location.href);
 //out.textContent = 'hash ' + window.location.hash+'\n';
 let suka ="https://rouletka.ru/api/somevkcb?code=vk2.a.tYdm42pt3VNhKViiOWSw8pDYYbDz-WpKtvCZKSuqGpS1JCYcc_dqezXY1pwlZS7O1usPba_PjlCuZHkWjZzlgam6sUTnksejEZGJL7YWo3bxCRPkbprFmZ0HhVjPr9vGQkSTXEKE150fCamJYT5gWOIwiOwaPPscd29RI8qiwUX3a0ZAvezaoY_3rPnlTf8_vLYuQJYvhQvhoeK31g90cg&expires_in=600&device_id=_DZZ5pSqLBisirU9QwknViW0hIFf3iJdNFgqjVFMGb2l82Pt89yKpeeqFcsz4vQx_GI2emyyWxj9NzzaOZ0CCg&state=mamamia&type=code_v2";
 const url = new URL(suka);
 console.log('url.search ', url.search);
 const paramStr = new URLSearchParams(url.search);
 out.textContent += 'code ' + paramStr.get('code') + ' device_id ' + paramStr.get('device_id');

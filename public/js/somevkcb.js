 console.log('href ', window.location.href);
 const paramStr = new URLSearchParams(window.location.href);
 out.textContent = 'code ' + paramStr.get('code') + ' device_id ' + paramStr.get('device_id');

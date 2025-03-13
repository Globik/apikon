/*const express = require('express')
const axios=require('axios').default;
const app = express()
app.use(express.static('./test'));
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/

let s='';let step = 0;
for(var i = 29000; i < 31940;i+=5){
	s+='insert into ban(usid,nick) select id, name from users where id between '+(31930-step)+' and '+ (31940-step)+';\n';
	step+=5;
}
console.log(s)

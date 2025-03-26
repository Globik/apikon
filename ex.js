const express = require('express')
const axios=require('axios').default;
const app = express()
app.use(express.static('./test'));
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


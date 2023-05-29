const express = require('express')
const app = express()
const cors=require('cors')
const port = process.env.PORT||5000;

// meddaleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`ema john server is runing ${port}`)
})
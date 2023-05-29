const express = require('express')
const app = express()
const cors=require('cors');
require('dotenv').config()
const port = process.env.PORT||5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


// meddaleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fnxcgsn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const prodectsCollaction =client.db('emaJhonDB').collection('prodects');

    app.get('/products',async(req,res)=>{
        const prodects = await prodectsCollaction.find().toArray();
        res.send(prodects)
    });

    app.get('/totalProduct',async(req,res)=>{
      const result = await prodectsCollaction.estimatedDocumentCount();
      res.send({totalProducts:result})
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`ema john server is runing ${port}`)
})
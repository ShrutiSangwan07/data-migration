const express = require("express");
const cors = require("cors");


const mysql = require("mysql2/promise"); 
const { MongoClient } = require('mongodb');


const app = express();
app.use(express.json());
app.use(cors());



// MySQL configuration
const mysqlConfig = {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "reporting_dashboard",
  };
  
  // MongoDB configuration
  const mongoConnectionUrl = 'mongodb://mongo_host:27017';
  const mongoDatabaseName = 'my_mongodb_database';
  const collectionName = 'mongodb_collection';
  
// MySQL route to fetch data
app.get("/mysqlData", async (req, res) => {
    try {
      const mysqlConnection = await mysql.createConnection(mysqlConfig);
      const [mysqlRows] = await mysqlConnection.query("SELECT * FROM users");
      mysqlConnection.end();
      res.json(mysqlRows);
    } catch (error) {
      res.status(500).json({ error: "MySQL data retrieval failed." });
    }
  });
  
  // Add a new route for data migration from MySQL to MongoDB
  app.post("/migrateData", async (req, res) => {
    try {
      const mysqlConnection = await mysql.createConnection(mysqlConfig);
      const [mysqlRows] = await mysqlConnection.query("SELECT * FROM users");
  
      const mongoClient = new MongoClient(mongoConnectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await mongoClient.connect();
  
      const mongoDb = mongoClient.db(mongoDatabaseName);
      const collection = mongoDb.collection(collectionName);
  
      // Insert MySQL data into MongoDB
      const insertResult = await collection.insertMany(mysqlRows);
  
      res.json({
        message: `Migrated ${insertResult.insertedCount} records from MySQL to MongoDB.`,
      });
  
      mysqlConnection.end();
      mongoClient.close();
    } catch (error) {
      res.status(500).json({ error: "Data migration failed." });
    }
  });
  




app.get("/", (req, res) =>{
   const sql = "SELECT * FROM users";
   db.query(sql,(err,data) =>{
    if(err) return res.json("Error");
    return res.json(data);
   })
})

app.post('/Create',(req,res)=> {
    const sql = "INSERT INTO users (username, email) VALUES (?,?)";
    const values = [

        req.body.name,
        req.body.email
    ]
db.query(sql, values, (err,result)=>{
    if (err) 
            return res.json( "Database error" );
    
    return res.json(result);
})
})



app.put('/update/:id',(req,res)=> {
    const sql = "UPDATE users SET username = ?,  email = ? WHERE user_id = ?";
    const values = [

        req.body.name,
        req.body.email,
        req.params.id
    ];
  

db.query(sql,values, (err,data)=>{
    if (err)  return res.status(500).json("Database error");
    
    return res.json(data);
})
})


app.delete('/user/:id',(req,res)=> {
    const sql = "DELETE  FROM users WHERE user_id = ?";
   
   const id = req.params.id;

db.query(sql, [id], (err,data)=>{
    if (err) return res.json( "Database error");
    
    return res.json(data);
})
})

app.listen(8081, () =>{
    console.log("listening");
})
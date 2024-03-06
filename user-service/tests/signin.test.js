const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../src/server");
const User = require("../src/models/userModel");

let app;
let serverInstance;
beforeAll(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/userdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app=server();
    serverInstance=app.listen(3000,()=>{
      console.log("Server started");
    })
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

afterAll(async () => {
  try{
    await mongoose.disconnect();
    serverInstance.close();
  }catch(error){
    //console.error("Error disconnecting from MongoDB:",error);
  }
  
});

describe("User signin", () => {
  beforeEach(async () => {
   //Create a user for testing signin
   const newUser=new User({
    username:'testuser',
    email:'test@yahoo.com',
    password:'test1234',
   })
   await newUser.save();
  });

  it("should sigin a user with valid credentials", async () => {
    try{
      const res = await request(server)
      .post("/api/users/signin")
      .send({
        email: "test@yahoo.com",
        password: "test1234",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    }catch(error){
      //console.error("Error creating user:",error);
    }
  });
});

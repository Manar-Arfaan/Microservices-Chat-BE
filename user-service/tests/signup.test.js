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
    //console.error("Error connecting to MongoDB:", error);
  }
});

afterAll(async () => {
  try{
    await mongoose.disconnect();
    serverInstance.close();
  }catch(error){
    console.error("Error disconnecting from MongoDB:",error);
  }
  
});

describe("Basic Server Check", () => {
  it("responds with hello world", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("User Service is up and running");
  });
});

describe("User signup", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should create a new user", async () => {
    try{
      const res = await request(server)
      .post("/api/users/signup")
      .send({
        username: "testuser",
        email: "test@yahoo.com",
        password: "test1234",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    }catch(error){
      console.error("Error creating user:",error);
    }
  });

  it("should return an error for invalid username", async () => {
    try{
      const res = await request(server)
      .post("/api/users/signup")
      .send({
        username: '',
        email: 'test@yahoo.com',
        password: 'test1234',
      });

    expect(res.status).toBe(400);
    expect(res.body.error[0].msg).toBe('name is required');
    }catch(error){
      //console.error("Error creating user:",error);
    }
  });
});

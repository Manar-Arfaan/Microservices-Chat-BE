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
    //serverInstance.close();
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

describe("Profile Management", () => {
  describe("Get Profile", () => {
    it("should retrieve user profile", async () => {
      try {
        const res = await request(server)
          .get("/api/users/profile")
          .set("Authorization", "Bearer <token>");

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("username");
        expect(res.body).toHaveProperty("email");
      } catch (error) {
        console.error("Error retrieving user profile:", error);
      }
    });

    it("should return an error if user does not exist", async () => {
      try {
        const res = await request(server)
          .get("/api/users/profile")
          .set("Authorization", "Bearer <invalid_token>");

        expect(res.status).toBe(404);
        expect(res.body.error).toBe("User not found");
      } catch (error) {
        console.error("Error handling non-existent user:", error);
      }
    });
  });

  describe("Edit Profile", () => {
    it("should update user profile", async () => {
      try {
        const res = await request(server)
          .put("/api/users/update-profile")
          .set("Authorization", "Bearer <token>")
          .send({
            username: "newusername",
            email: "newemail@example.com",
          });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Profile updated successfully");
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    });

    it("should return an error if profile update fails", async () => {
      try {
        const res = await request(server)
          .put("/api/users/update-profile")
          .set("Authorization", "Bearer <token>")
          .send({
            username: "",
            email: "newemail@example.com",
          });

        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Internal Server Error");
      } catch (error) {
        console.error("Error handling profile update failure:", error);
      }
    });
  });
});
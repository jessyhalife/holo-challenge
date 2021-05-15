const request = require("supertest");
const app = require("../server");
jest.setTimeout(30000);

const logIn = async (username = "jess") => {
  const resAuth = await request(app)
    .post("/login")
    .send({ username, password: "1234" });
  const { token } = resAuth.body;
  return token;
};

describe("login endpoint", () => {
  it("Should return 200 and the user auth token", async () => {
    const res = await request(app).post("/login").send({
      username: "jes",
      password: "1234",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
  it("Should return bad request when no user or password is provided", async () => {
    const res = await request(app).post("/login").send({
      username: "jes",
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("get endpoint", () => {
  it("Should return forbidden when not logged in", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(401);
  });
  it("Should return results, total, and page when logged in", async () => {
    const token = await logIn();
    const res = await request(app)
      .get("/users")
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("results");
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("page");
  });
  it("Should return page `2` when sending query param", async () => {
    const token = await logIn();
    const res = await request(app)
      .get("/users?page=2")
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toBe(200);
    expect(res.body.page).toBe(2);
  });
});

describe("post endpoint", () => {
  it("should return forbidden when not logged in", async () => {
    const res = await request(app)
      .post("/users")
      .send({ username: "test1", email: "test2", password: "test3" });
    expect(res.statusCode).toBe(401);
  });

  it("should return forbidden when not logged in as`admin` user", async () => {
    const token = await logIn();
    const res = await request(app)
      .post("/users")
      .set("Authorization", "Bearer " + token)
      .send({ username: "jes1", email: "test@gmail.com", password: "1234" });

    expect(res.statusCode).toBe(401);
  });

  it("should return bad request when not providing sufficient information", async () => {
    const token = await logIn("admin");
    const res = await request(app)
      .post("/users")
      .set("Authorization", "Bearer " + token)
      .send({ username: "jes2", email: "test@gmail.com" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual("Incomplete data");
  });

  it("should return return 201 as Created object", async () => {
    const token = await logIn("admin");
    token;
    const res = await request(app)
      .post("/users")
      .set("Authorization", "Bearer " + token)
      .send({ username: "jes3", email: "test@gmail.com", password: "1234" });

    expect(res.statusCode).toBe(201);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

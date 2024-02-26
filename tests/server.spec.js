const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obteniendo un 200", async () => {
    // Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    const largo = response.body.length;

    expect(status).toBe(200);
    expect(largo).toBeGreaterThanOrEqual(1);
  });

  it("Obteniendo un 404", async () => {
    // Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe
    const jwt = "token";
    const idDeProductoAEliminar = 5;
    const response = await request(server)
      .delete(`/cafes/${idDeProductoAEliminar}`)
      .set("Authorization", jwt)
      .send();
    const status = response.statusCode;
    expect(status).toBe(404);
  });

  it("Obteniendo un 201 al crear un cafe", async () => {
    // Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
    const id = Math.floor(Math.random() * 999);
    const cafe = { id, nombre: "Chococcino" };
    const response = await request(server).post("/cafes").send(cafe);

    const cafes = response.body;
    const status = response.statusCode;
    expect(status).toBe(201);
    expect(cafes).toContainEqual(cafe);
  });

  it("Obteniendo un 400 al actualizar un cafe", async () => {
    // Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.
    const id = Math.floor(Math.random() * 999);
    const idDeProductoAActualizar = id + 1;
    const jwt = "token";
    const cafe = { id, nombre: "Chococcino" };
    const response = await request(server)
      .put(`/cafes/${idDeProductoAActualizar}`)
      .set("Authorization", jwt)
      .send();

    const status = response.statusCode;
    expect(status).toBe(400);
  });
});

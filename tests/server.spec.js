const request = require("supertest");
const server = require("../index.js");

describe("Operaciones CRUD de cafes", () => {
    it("Obtener un 200 y tipo  de dato", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        const producto = response.body;
        expect(producto).toBeInstanceOf(Array);
    });

    it ("Eliminar un cafe no existente y que devuelva un 404", async () => {
        const jwt = "token";
        const idCafeEliminar = 9999;
        const response = await request(server)
            .delete(`/cafes/${idCafeEliminar}`)
            .set("Authorization", jwt)
            .send();

        const status = response.statusCode;

        expect(status).toBe(404);
    });

    it ("Agregar un nuevo cafe y devuelva un 201", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: "nuevo cafe"};

        const response = await request(server)
            .post("/cafes")
            .send(cafe);
        
        const status = response.statusCode;
        const cafes = response.body;

        expect(cafes).toContainEqual(cafe);
        expect(status).toBe(201);

    })
});

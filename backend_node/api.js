const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

class UsuariosDAO {

    constructor() {
        this.pool = new Pool({
            connectionString: 'postgresql://pruebacrud:1234@localhost:5432/prueba_crud'
        });
    }

    async getUsuarios() {
        const result = await this.pool.query('select * from usuarios order by id');
        return result.rows;
    }
}

class ApiServer {

    constructor(port) {
        this.app = express();
        this.port = port;
        this.usuarios = new UsuariosDAO();
        this.app.use(cors({
            origin: 'http://localhost:4200',
            methods: ['GET'],
            allowedHeaders: ['Content-Type']
        }));
        this.app.use(express.json());
        this.routes();
    }

    routes() {
        this.app.get('/usuarios', async (req, res) => {
            try {
                const usuarios = await this.usuarios.getUsuarios();
                res.json(usuarios);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al obtener los usuarios' });
            }
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }
}

const server = new ApiServer(3000);
server.start();
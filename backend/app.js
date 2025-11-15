import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import newsRoutes from './routes/news.js';

dotenv.config(); // Cargar variables de entorno desde el archivo .env
const app = express(); // inicializar express

//Middlewares
app.use(cors()); // habilitar CORS
app.use(express.json()); // para parsear JSON

// Rutas
app.use('/api/news', newsRoutes); // Rutas para noticias

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGO_URI) // Usar variable de entorno para la URI de MongoDB
    .then(() => {
        console.log('Conectado a la base de datos MongoDB'); // mensaje de éxito
        app.listen(4000, () => console.log('Servidor escuchando en el puerto 4000')); // iniciar servidor
    })
    .catch((error) => console.error('Error al conectar a la base de datos MongoDB:', error)); // manejar errores de conexión
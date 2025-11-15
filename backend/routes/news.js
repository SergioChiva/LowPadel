import express from "express"; // importar express para manejar rutas
import { getNews, createNews } from "../controllers/newsController.js"; // importar controladores de noticias
 
const router = express.Router(); // crear un router de express para definir las rutas

router.get("/", getNews); // ruta GET para obtener todas las noticias
router.post("/", createNews); // ruta POST para crear una nueva noticia

export default router; // exportar el router para usarlo en otras partes de la aplicación

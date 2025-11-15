import News from '../models/news.js';

//Obtener todas las noticias
export const getNews = async (req, res) =>{ // Función asíncrona para manejar la solicitud y respuesta
    const news = (await News.find().sort({ fecha: -1 }).limit(3)); // Obtener todas las noticias ordenadas por fecha descendente y limitar a 3
    res.json(news); // Enviar las noticias como respuesta en formato JSON
};

//Crear una noticia
export const createNews = async (req, res) => { // Función asíncrona para manejar la creación de una noticia
    try {
        const { titulo, imagen, contenido } = req.body; // Extraer los datos del cuerpo de la solicitud
        const noticia = new News({ titulo, imagen, contenido }); // Crear una nueva instancia del modelo News
        await noticia.save(); // Guardar la noticia en la base de datos
        res.status(201).json(noticia); // Enviar la noticia creada como respuesta con estado 201
    } catch (error) {
        res.status(500).json({ 
        message: 'Error al crear la noticia', 
        error
     }); // Manejar errores y enviar respuesta con estado 500
    }
};
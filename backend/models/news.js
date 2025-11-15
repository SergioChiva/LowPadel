import mongoose from 'mongoose'; // realiza la importación de mongoose para definir el esquema y el modelo de datos

const newsSchema = new mongoose.Schema({
    titulo: {type: String, required: true}, // define el campo 'titulo' de tipo String
    imagen: {type: String, required: true}, // define el campo 'imagen' de tipo String
    contenido: {type: String, required: true}, // define el campo 'contenido' de tipo String
    fecha: { type: Date, default: Date.now }, // dedine el campo fecha y su valor por defecto
});

export default mongoose.model('News', newsSchema); // exporta el modelo 'News' basado en el esquema definido
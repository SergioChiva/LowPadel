import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('✅ MongoDB ya está conectado');
    return;
  }

  try {
    // En Astro SSR, las variables de entorno están disponibles directamente
    const mongoUri = process.env.MONGODB_URI || 
                     'mongodb+srv://sergiochiva2002_db_user:LRESvpQGs6yZv0p5@lowpadel-cluster.8wnkcdh.mongodb.net/lowpadel?retryWrites=true&w=majority&appName=lowpadel-cluster';
    
    if (!mongoUri) {
      throw new Error('❌ MONGODB_URI no está definida en las variables de entorno');
    }

    console.log('🔄 Intentando conectar a MongoDB...');

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log('✅ MongoDB conectado exitosamente a la base de datos: lowpadel');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    throw error;
  }
};

export default connectDB;

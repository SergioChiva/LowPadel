import connectDB from '../../lib/db.js';
import mongoose from 'mongoose';

export const GET = async () => {
  try {
    console.log('🧪 Iniciando test de conexión...');
    
    await connectDB();
    
    // Verificar estado de la conexión
    const state = mongoose.connection.readyState;
    const states = {
      0: 'desconectado',
      1: 'conectado',
      2: 'conectando',
      3: 'desconectando'
    };

    const dbName = mongoose.connection.db?.databaseName || 'N/A';
    const host = mongoose.connection.host || 'N/A';

    return new Response(JSON.stringify({
      success: true,
      message: '✅ Conexión exitosa a MongoDB',
      estado: states[state],
      baseDeDatos: dbName,
      host: host,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Error en test de conexión:', error);
    return new Response(JSON.stringify({
      success: false,
      message: '❌ Error al conectar con MongoDB',
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

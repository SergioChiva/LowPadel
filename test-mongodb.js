// Script de diagnóstico para probar MongoDB directamente
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://sergiochiva2002_db_user:LRESvpQGs6yZv0p5@lowpadel-cluster.8wnkcdh.mongodb.net/lowpadel?retryWrites=true&w=majority&appName=lowpadel-cluster';

console.log('🔍 Iniciando diagnóstico de MongoDB...\n');
console.log('URI:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'), '\n');

async function testConnection() {
  try {
    console.log('1️⃣ Intentando conectar...');
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ ¡Conexión exitosa!');
    console.log('📊 Estado:', mongoose.connection.readyState);
    console.log('💾 Base de datos:', mongoose.connection.db.databaseName);
    console.log('🌐 Host:', mongoose.connection.host);
    
    // Crear una colección de prueba
    console.log('\n2️⃣ Probando crear una colección...');
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    const doc = await TestModel.create({ name: 'Prueba desde Node.js' });
    console.log('✅ Documento creado:', doc);
    
    // Listar colecciones
    console.log('\n3️⃣ Listando colecciones existentes...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 Colecciones:', collections.map(c => c.name));
    
    // Limpiar
    await TestModel.deleteMany({});
    
    console.log('\n✅ ¡Todo funciona correctamente!');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\n📋 Detalles completos:');
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Conexión cerrada');
    process.exit(0);
  }
}

testConnection();

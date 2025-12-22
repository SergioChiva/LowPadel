import mongoose from 'mongoose';
import User from './src/models/User.js';

const MONGODB_URI = 'mongodb+srv://sergiochiva2002_db_user:LRESvpQGs6yZv0p5@lowpadel-cluster.8wnkcdh.mongodb.net/lowpadel';

async function crearAdmin() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Datos del admin
    const adminEmail = 'admin@lowpadel.com';
    const adminPassword = 'admin123';

    // Verificar si ya existe
    let existente = await User.findOne({ email: adminEmail });
    
    if (existente) {
      console.log('⚠️ El usuario admin ya existe');
      console.log('🗑️ Eliminando usuario anterior...');
      await User.deleteOne({ email: adminEmail });
    }

    // Crear admin con el modelo correcto (que tiene el hook pre-save)
    console.log('✨ Creando nuevo usuario admin...');
    const admin = new User({
      nombre: 'Administrador',
      email: adminEmail,
      password: adminPassword, // Se hasheará automáticamente por el hook pre-save
      rol: 'admin'
    });

    await admin.save();
    console.log('✅ Usuario admin creado exitosamente!');
    console.log('');
    console.log('📝 CREDENCIALES DE ACCESO:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: admin@lowpadel.com');
    console.log('🔑 Contraseña: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await mongoose.disconnect();
    console.log('');
    console.log('✅ Listo! Ahora puedes:');
    console.log('1. Ir a http://localhost:4322/login');
    console.log('2. Usar las credenciales de arriba');
    console.log('3. Acceder al panel de admin en /palas');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    process.exit(0);
  }
}

crearAdmin();

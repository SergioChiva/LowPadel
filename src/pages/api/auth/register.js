import connectDB from '../../../lib/db.js';
import User from '../../../models/User.js';
import { generateToken } from '../../../lib/auth.js';

export const POST = async ({ request }) => {
  console.log('📝 Iniciando registro de usuario...');
  try {
    console.log('🔌 Conectando a MongoDB...');
    await connectDB();
    console.log('✅ Conexión establecida');

    console.log('📨 Parseando datos del request...');
    const { nombre, email, password } = await request.json();
    console.log('📦 Datos recibidos:', { nombre, email, password: '***' });

    // Validaciones
    if (!nombre || !email || !password) {
      console.log('❌ Validación fallida: campos faltantes');
      return new Response(JSON.stringify({
        success: false,
        message: 'Todos los campos son requeridos'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validar formato de contraseña
    if (password.length < 6) {
      console.log('❌ Validación fallida: contraseña muy corta');
      return new Response(JSON.stringify({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!/\d/.test(password)) {
      console.log('❌ Validación fallida: sin número');
      return new Response(JSON.stringify({
        success: false,
        message: 'La contraseña debe contener al menos 1 número'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      console.log('❌ Validación fallida: sin carácter especial');
      return new Response(JSON.stringify({
        success: false,
        message: 'La contraseña debe contener al menos 1 carácter especial (!@#$%^&*)'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verificar si el usuario ya existe
    console.log('🔍 Verificando si el email ya existe...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Email ya registrado');
      return new Response(JSON.stringify({
        success: false,
        message: 'El email ya está registrado'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    console.log('✅ Email disponible');

    // Crear usuario
    console.log('👤 Creando nuevo usuario...');
    const user = new User({
      nombre,
      email,
      password
    });

    console.log('💾 Guardando usuario en BD...');
    await user.save();
    console.log('✅ Usuario guardado exitosamente');

    // Generar token
    console.log('🔑 Generando token...');
    const token = generateToken(user._id.toString());
    console.log('✅ Token generado');

    return new Response(JSON.stringify({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: user.toJSON(),
      token
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ ERROR EN REGISTRO:');
    console.error('Mensaje:', error.message);
    console.error('Stack:', error.stack);
    console.error('Nombre del error:', error.name);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al registrar usuario',
      error: error.message,
      errorName: error.name
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

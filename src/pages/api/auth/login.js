import connectDB from '../../../lib/db.js';
import User from '../../../models/User.js';
import { generateToken } from '../../../lib/auth.js';

export const POST = async ({ request }) => {
  try {
    await connectDB();

    const { email, password } = await request.json();

    // Validaciones
    if (!email || !password) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Email y contraseña son requeridos'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Credenciales inválidas'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verificar password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Credenciales inválidas'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generar token
    const token = generateToken(user._id.toString());

    return new Response(JSON.stringify({
      success: true,
      message: 'Login exitoso',
      user: user.toJSON(),
      token
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en login:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

import connectDB from '../../../lib/db.js';
import User from '../../../models/User.js';
import { getUserFromToken } from '../../../lib/auth.js';

export const GET = async ({ request }) => {
  try {
    await connectDB();

    // Obtener usuario del token
    const decoded = getUserFromToken(request);
    if (!decoded) {
      return new Response(JSON.stringify({
        success: false,
        message: 'No autorizado'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Buscar usuario
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Usuario no encontrado'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      user
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT = async ({ request }) => {
  try {
    await connectDB();

    const decoded = getUserFromToken(request);
    if (!decoded) {
      return new Response(JSON.stringify({
        success: false,
        message: 'No autorizado'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const updateData = await request.json();
    
    // No permitir actualizar password directamente
    delete updateData.password;
    delete updateData.rol;

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    return new Response(JSON.stringify({
      success: true,
      message: 'Perfil actualizado',
      user
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error actualizando perfil:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al actualizar perfil',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

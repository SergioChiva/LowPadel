import connectDB from '../../lib/db.js';
import Pala from '../../models/Pala.js';
import { getUserFromToken } from '../../lib/auth.js';

// GET - Obtener todas las palas
export const GET = async ({ url }) => {
  try {
    await connectDB();

    const jugador = url.searchParams.get('jugador');
    const activo = url.searchParams.get('activo');

    let query = {};
    
    if (jugador) {
      query.jugador = jugador;
    }
    
    if (activo !== null && activo !== undefined) {
      query.activo = activo === 'true';
    } else {
      // Por defecto, solo palas activas
      query.activo = true;
    }

    const palas = await Pala.find(query).sort({ createdAt: -1 });

    return new Response(JSON.stringify({
      success: true,
      count: palas.length,
      palas
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error obteniendo palas:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al obtener palas',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Crear nueva pala (solo admin)
export const POST = async ({ request }) => {
  try {
    await connectDB();

    // Verificar autenticación y rol admin
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

    // Verificar que sea admin
    const User = (await import('../../models/User.js')).default;
    const user = await User.findById(decoded.userId);
    if (!user || user.rol !== 'admin') {
      return new Response(JSON.stringify({
        success: false,
        message: 'Acceso denegado. Solo administradores pueden crear palas.'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const palaData = await request.json();

    const pala = new Pala(palaData);
    await pala.save();

    return new Response(JSON.stringify({
      success: true,
      message: 'Pala creada exitosamente',
      pala
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creando pala:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al crear pala',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

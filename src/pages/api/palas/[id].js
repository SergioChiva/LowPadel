import connectDB from '../../../lib/db.js';
import Pala from '../../../models/Pala.js';
import { getUserFromToken } from '../../../lib/auth.js';

// GET - Obtener pala por ID
export const GET = async ({ params }) => {
  try {
    await connectDB();

    const pala = await Pala.findById(params.id);
    
    if (!pala) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Pala no encontrada'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      pala
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al obtener pala',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PUT - Actualizar pala (solo admin)
export const PUT = async ({ params, request }) => {
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

    // Verificar que sea admin
    const User = (await import('../../../models/User.js')).default;
    const user = await User.findById(decoded.userId);
    if (!user || user.rol !== 'admin') {
      return new Response(JSON.stringify({
        success: false,
        message: 'Acceso denegado. Solo administradores pueden editar palas.'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const updateData = await request.json();

    const pala = await Pala.findByIdAndUpdate(
      params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!pala) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Pala no encontrada'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Pala actualizada',
      pala
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al actualizar pala',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE - Eliminar pala (solo admin)
export const DELETE = async ({ params, request }) => {
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

    // Verificar que sea admin
    const User = (await import('../../../models/User.js')).default;
    const user = await User.findById(decoded.userId);
    if (!user || user.rol !== 'admin') {
      return new Response(JSON.stringify({
        success: false,
        message: 'Acceso denegado. Solo administradores pueden eliminar palas.'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pala = await Pala.findByIdAndDelete(params.id);

    if (!pala) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Pala no encontrada'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Pala eliminada'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al eliminar pala',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

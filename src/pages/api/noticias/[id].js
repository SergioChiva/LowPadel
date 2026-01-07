import connectDB from '../../../lib/db.js';
import Noticia from '../../../models/Noticia.js';
import User from '../../../models/User.js';
import { getUserFromToken } from '../../../lib/auth.js';

// GET - Obtener noticia por ID
export const GET = async ({ params }) => {
  try {
    await connectDB();

    const noticia = await Noticia.findById(params.id)
      .populate('autor', 'nombre email imagen');
    
    if (!noticia) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Noticia no encontrada'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Incrementar visitas
    noticia.visitas += 1;
    await noticia.save();

    return new Response(JSON.stringify({
      success: true,
      noticia
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al obtener noticia',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PUT - Actualizar noticia (solo admin)
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
    const user = await User.findById(decoded.userId);
    if (!user || user.rol !== 'admin') {
      return new Response(JSON.stringify({
        success: false,
        message: 'Acceso denegado. Solo administradores pueden editar noticias.'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const updateData = await request.json();

    // No permitir cambiar autor directamente
    delete updateData.autor;
    delete updateData.visitas;

    const noticia = await Noticia.findByIdAndUpdate(
      params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('autor', 'nombre email');

    if (!noticia) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Noticia no encontrada'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Noticia actualizada',
      noticia
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al actualizar noticia',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE - Eliminar noticia (solo admin)
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
    const user = await User.findById(decoded.userId);
    if (!user || user.rol !== 'admin') {
      return new Response(JSON.stringify({
        success: false,
        message: 'Acceso denegado. Solo administradores pueden eliminar noticias.'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const noticia = await Noticia.findByIdAndDelete(params.id);

    if (!noticia) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Noticia no encontrada'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Noticia eliminada exitosamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al eliminar noticia',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

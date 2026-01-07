import connectDB from '../../lib/db.js';
import Noticia from '../../models/Noticia.js';
import User from '../../models/User.js';
import { getUserFromToken } from '../../lib/auth.js';

// GET - Obtener todas las noticias
export const GET = async ({ url }) => {
  try {
    await connectDB();

    const categoria = url.searchParams.get('categoria');
    const destacada = url.searchParams.get('destacada');
    const publicada = url.searchParams.get('publicada');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const search = url.searchParams.get('search');

    let query = {};
    
    if (categoria) {
      query.categoria = categoria;
    }
    
    if (destacada !== null && destacada !== undefined) {
      query.destacada = destacada === 'true';
    }
    
    if (publicada !== null && publicada !== undefined) {
      query.publicada = publicada === 'true';
    } else {
      // Por defecto, solo noticias publicadas
      query.publicada = true;
    }

    // Búsqueda por texto
    if (search) {
      query.$text = { $search: search };
    }

    const noticias = await Noticia.find(query)
      .populate('autor', 'nombre email')
      .sort({ fechaPublicacion: -1 })
      .limit(limit);

    return new Response(JSON.stringify({
      success: true,
      count: noticias.length,
      noticias
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error obteniendo noticias:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al obtener noticias',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Crear nueva noticia (solo admin)
export const POST = async ({ request }) => {
  try {
    await connectDB();

    // Verificar autenticación
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
        message: 'Acceso denegado. Solo administradores pueden crear noticias.'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const noticiaData = await request.json();

    // Agregar autor
    noticiaData.autor = decoded.userId;
    noticiaData.autorNombre = user.nombre;

    // Si no hay resumen, crear uno automático (primeros 200 caracteres)
    if (!noticiaData.resumen && noticiaData.contenido) {
      noticiaData.resumen = noticiaData.contenido.substring(0, 197) + '...';
    }

    const noticia = new Noticia(noticiaData);
    await noticia.save();

    return new Response(JSON.stringify({
      success: true,
      message: 'Noticia creada exitosamente',
      noticia
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creando noticia:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al crear noticia',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

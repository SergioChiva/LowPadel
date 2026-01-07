import connectDB from '../../lib/db.js';
import Pedido from '../../models/Pedido.js';
import User from '../../models/User.js';
import { getUserFromToken } from '../../lib/auth.js';

// GET - Obtener pedidos del usuario autenticado
export const GET = async ({ request }) => {
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

    const pedidos = await Pedido.find({ usuario: decoded.userId })
      .sort({ createdAt: -1 })
      .populate('productos.pala');

    return new Response(JSON.stringify({
      success: true,
      count: pedidos.length,
      pedidos
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al obtener pedidos',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Crear nuevo pedido
export const POST = async ({ request }) => {
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

    const pedidoData = await request.json();

    // Calcular totales
    const subtotal = pedidoData.productos.reduce((sum, item) => {
      return sum + (item.precio * item.cantidad);
    }, 0);

    const pedido = new Pedido({
      usuario: decoded.userId,
      productos: pedidoData.productos,
      subtotal: subtotal,
      envio: 5,
      total: subtotal + 5,
      direccionEnvio: pedidoData.direccionEnvio,
      datosPago: pedidoData.datosPago
    });

    await pedido.save();

    // Actualizar pedidos del usuario
    await User.findByIdAndUpdate(
      decoded.userId,
      { $push: { pedidos: pedido._id } }
    );

    return new Response(JSON.stringify({
      success: true,
      message: 'Pedido creado exitosamente',
      pedido
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creando pedido:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al crear pedido',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

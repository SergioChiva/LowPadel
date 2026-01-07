import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-super-seguro-cambialo';

export async function verifyToken(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { success: false, message: 'Token no proporcionado' };
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    return { success: true, user };
  } catch (error) {
    return { success: false, message: 'Token inválido o expirado' };
  }
}

export async function verifyAdmin(request) {
  const result = await verifyToken(request);
  
  if (!result.success) {
    return result;
  }

  if (result.user.rol !== 'admin') {
    return { success: false, message: 'Acceso denegado. Se requiere rol de administrador.' };
  }

  return result;
}

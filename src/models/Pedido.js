import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productos: [{
    pala: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pala'
    },
    nombre: String,
    jugador: String,
    precio: Number,
    cantidad: {
      type: Number,
      default: 1,
      min: 1
    }
  }],
  subtotal: {
    type: Number,
    required: true
  },
  envio: {
    type: Number,
    default: 5
  },
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  direccionEnvio: {
    nombre: String,
    email: String,
    telefono: String,
    calle: String,
    ciudad: String,
    codigoPostal: String,
    pais: String
  },
  datosPago: {
    numeroTarjeta: String,
    nombreTitular: String
  },
  numeroSeguimiento: {
    type: String,
    default: ''
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.models.Pedido || mongoose.model('Pedido', pedidoSchema);

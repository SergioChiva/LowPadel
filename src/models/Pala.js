import mongoose from 'mongoose';

const palaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  jugador: {
    type: String,
    required: [true, 'El jugador es requerido'],
    enum: {
      values: ['Arturo Coello', 'Agustín Tapia', 'Alejandro Galán', 'Federico Chingotto'],
      message: 'El jugador debe ser Arturo Coello, Agustín Tapia, Alejandro Galán o Federico Chingotto'
    }
  },
  precio: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  imagen: {
    type: String,
    required: [true, 'La imagen es requerida']
  },
  descripcion: {
    type: String,
    default: ''
  },
  categoria: {
    type: String,
    enum: ['profesional', 'intermedio', 'principiante'],
    default: 'profesional'
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  activo: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.models.Pala || mongoose.model('Pala', palaSchema);

import mongoose from 'mongoose';

const noticiaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es requerido']
  },
  imagen: {
    type: String,
    default: ''
  },
  categoria: {
    type: String,
    enum: ['general', 'torneos', 'jugadores', 'equipamiento', 'otros'],
    default: 'general'
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  autorNombre: {
    type: String,
    default: 'LowPádel'
  },
  destacada: {
    type: Boolean,
    default: false
  },
  publicada: {
    type: Boolean,
    default: true
  },
  visitas: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  resumen: {
    type: String,
    maxlength: 200,
    default: ''
  },
  fechaPublicacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índice para búsquedas
noticiaSchema.index({ titulo: 'text', contenido: 'text', tags: 'text' });

export default mongoose.models.Noticia || mongoose.model('Noticia', noticiaSchema);

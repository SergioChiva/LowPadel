// Script para inicializar las 3 noticias en la base de datos MongoDB
// Ejecutar con: node inicializar-noticias.js

import mongoose from 'mongoose';
import Noticia from './src/models/Noticia.js';
import User from './src/models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sergiochiva2002_db_user:LRESvpQGs6yZv0p5@lowpadel-cluster.8wnkcdh.mongodb.net/lowpadel?retryWrites=true&w=majority&appName=lowpadel-cluster';

// Las 3 noticias que usarán las imágenes disponibles
const noticiasIniciales = [
  {
    titulo: "💥 Ruptura de los Golden Boys: Fin de la Mejor Dupla del Pádel",
    resumen: "Tras meses de especulaciones, se confirma la separación de Arturo Coello y Agustín Tapia, la pareja que dominó el circuito profesional durante dos temporadas consecutivas.",
    contenido: `La noticia que todos temían finalmente se ha confirmado: Arturo Coello y Agustín Tapia, conocidos como los "Golden Boys", han decidido poner fin a su exitosa asociación en el pádel profesional.

La pareja, que conquistó más de 15 torneos juntos y se mantuvo como número 1 del ranking mundial durante 18 meses consecutivos, ha tomado caminos separados debido a diferencias en sus objetivos deportivos.

Coello declaró en conferencia de prensa: "Ha sido un honor compartir pista con Tapia. Hemos vivido momentos increíbles, pero sentimos que es momento de explorar nuevos desafíos en nuestras carreras."

Por su parte, Tapia agradeció a su ex compañero: "Arturo es un crack absoluto. Juntos conseguimos cosas que nunca imaginé. Nos vamos con la cabeza alta y con mucho respeto mutuo."

Los rumores apuntan a que Coello podría asociarse con Ale Galán, mientras que Tapia estaría en conversaciones con Federico Chingotto. El mundo del pádel profesional se prepara para una completa reorganización de las parejas top.`,
    imagen: "/noticias/rupturaDeLosGoldenBoys.jpg",
    categoria: "jugadores",
    destacada: true,
    publicada: true,
    autorNombre: "LowPádel"
  },
  {
    titulo: "⚖️ Polémica por Golpe Ilegal: Galán Expulsado del Torneo",
    resumen: "Alejandro Galán fue descalificado del Madrid Premier Padel tras un polémico golpe considerado ilegal por los árbitros. El español ha presentado una apelación formal.",
    contenido: `El mundo del pádel profesional está conmocionado tras la expulsión de Alejandro Galán del Madrid Premier Padel por ejecutar un golpe considerado ilegal según las nuevas normativas de la FIP.

El incidente ocurrió en los cuartos de final cuando Galán realizó una bandeja con efecto que, según los árbitros, superó el ángulo permitido de 45 grados. A pesar de las protestas del jugador y su pareja, la decisión fue inapelable en ese momento.

"Es ridículo que nos expulsen por un golpe que he ejecutado miles de veces en mi carrera. La nueva regla es confusa y está arruinando el espectáculo", declaró Galán visiblemente molesto tras el partido.

El incidente ha reavivado el debate sobre las recientes modificaciones en el reglamento. Muchos jugadores profesionales han expresado su descontento en redes sociales, argumentando que las nuevas restricciones están limitando la creatividad en el juego.

La Federación Internacional de Pádel (FIP) ha anunciado que revisará el caso, pero mantiene su postura de que las reglas deben aplicarse estrictamente para garantizar la equidad en la competición.`,
    imagen: "/noticias/golpeIlegal.jpg",
    categoria: "torneos",
    destacada: true,
    publicada: true,
    autorNombre: "LowPádel"
  },
  {
    titulo: "🔥 Leo y Lobo Discuten en Pleno Partido: Tensión en las Pistas",
    resumen: "El dúo argentino protagonizó un tenso momento durante su partido de octavos de final en el Buenos Aires Open, generando preocupación sobre su continuidad como pareja.",
    contenido: `Leandro "Leo" Augsburger y Luciano "Lobo" Capra protagonizaron una acalorada discusión durante su partido de octavos de final en el Buenos Aires Open que ha puesto en duda el futuro de la pareja argentina.

El incidente ocurrió en el segundo set, cuando tras perder un punto clave, ambos jugadores comenzaron a recriminarse mutuamente en plena pista. Las cámaras captaron el momento de tensión que duró varios minutos, obligando al árbitro a intervenir.

A pesar de la controversia, la pareja logró recomponerse y ganó el partido en tres sets, pero las imágenes ya se habían viralizado en redes sociales, generando todo tipo de especulaciones sobre una posible ruptura.

"Son cosas que pasan en el calor del partido. Tenemos una gran relación y esto no afectará nuestro proyecto deportivo", declaró Leo Augsburger tras el encuentro, intentando minimizar el incidente.

Lobo Capra añadió: "La intensidad del pádel profesional genera estas situaciones. Lo importante es que seguimos adelante y con los mismos objetivos."

Los expertos señalan que estas tensiones son comunes en el alto rendimiento, pero advierten que la pareja deberá trabajar en su comunicación para mantener su nivel competitivo en el circuito.`,
    imagen: "/noticias/Leo_y_Lobo_discuten.webp",
    categoria: "jugadores",
    destacada: false,
    publicada: true,
    autorNombre: "LowPádel"
  }
];

async function inicializarNoticias() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Buscar un usuario admin para asignar como autor
    let adminUser = await User.findOne({ rol: 'admin' });
    
    if (!adminUser) {
      console.log('⚠️  No se encontró usuario admin. Buscando cualquier usuario...');
      adminUser = await User.findOne();
      
      if (!adminUser) {
        console.log('❌ No hay usuarios en la base de datos. Creando usuario admin por defecto...');
        adminUser = await User.create({
          nombre: 'Admin',
          email: 'admin@lowpadel.com',
          password: 'admin123',
          rol: 'admin'
        });
        console.log('✅ Usuario admin creado');
      }
    }

    console.log(`📝 Usando autor: ${adminUser.nombre} (${adminUser.email})`);

    // Eliminar noticias anteriores
    const deleteResult = await Noticia.deleteMany({});
    console.log(`🗑️  Eliminadas ${deleteResult.deletedCount} noticias antiguas`);

    // Insertar las nuevas noticias
    const noticiasConAutor = noticiasIniciales.map(noticia => ({
      ...noticia,
      autor: adminUser._id
    }));

    const noticiasCreadas = await Noticia.insertMany(noticiasConAutor);
    console.log(`✅ ${noticiasCreadas.length} noticias creadas exitosamente:`);
    
    noticiasCreadas.forEach((noticia, index) => {
      console.log(`   ${index + 1}. ${noticia.titulo}`);
    });

    console.log('\n🎉 Inicialización completada!');
    console.log('📰 Puedes ver las noticias en: http://localhost:4321/noticias');
    console.log('⚙️  Puedes editarlas en: http://localhost:4321/admin');

  } catch (error) {
    console.error('❌ Error al inicializar noticias:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Desconectado de MongoDB');
    process.exit(0);
  }
}

// Ejecutar la inicialización
inicializarNoticias();

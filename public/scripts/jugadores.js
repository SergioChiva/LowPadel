let main = document.querySelector("#palas");

let jugadores =[
{
    nombre: "Alejandro Galán",
    palas: [
      {
        imagen: "/public/palas/adidas-metalbone-hrd.png",
        nombrePala: "Adidas Metalbone HDR",
        precio: "75$",
        descripcion:
          "La Adidas Metalbone HDR es una pala profesional que combina potencia y control. Su forma de diamante, balance alto y tecnología avanzada permiten golpes precisos y fuertes, mientras que su construcción en carbono y goma EVA asegura durabilidad y comodidad. Ideal para jugadores ofensivos de alto nivel.",
      },
      {
        imagen: "/public/palas/pala-adidas-metalbone-pro-edt.png",
        nombrePala: "Adidas Metalbone EDT",
        precio: "60$",
        descripcion:
          "La Adidas Metalbone EDT es una pala versátil que combina potencia y control. Su forma de diamante y balance medio-alto facilitan golpes ofensivos y buena manejabilidad. Fabricada en fibra de vidrio y carbono, con goma EVA para un tacto suave, es ideal para jugadores intermedios y avanzados que buscan rendimiento profesional con comodidad.",
      },
    ],
  },
  {
    nombre: "Agustín Tapia",
    palas: [
      {
        imagen: "/public/palas/at10-luxury-genius-18k-alum-.png",
        nombrePala: "Nox AT10 Luxury Genius 18K",
        precio: "80$",
        descripcion:
          "La Nox AT10 Luxury Genius 18K es la pala oficial de Agustín Tapia, diseñada para ofrecer un equilibrio perfecto entre potencia y control. Su forma de lágrima y su superficie de carbono 18K le confieren una salida de bola excepcional y un tacto firme, ideal para jugadores ofensivos que buscan dominar desde cualquier zona de la pista. Incorpora la goma EVA HR3 de alta densidad, que aporta mayor potencia en los golpes y una excelente durabilidad. Con tecnología Smartstrap y diseño moderno, es una pala que refleja el estilo creativo y explosivo de Tapia.",
      },
      {
        imagen: "/public/palas/nox-at-luxury-attack-18k-alum.png",
        nombrePala: "Nox AT Luxury Attack",
        precio: "70$",
        descripcion:
          "La Nox AT Luxury Attack está diseñada para jugadores ofensivos que buscan máxima potencia en su juego. Con forma de diamante y carbono de alto rendimiento, permite imprimir gran velocidad a la bola sin perder estabilidad en los golpes. Su núcleo de goma EVA HR3 aporta solidez y control, mientras que el acabado rugoso de la superficie favorece los efectos. Una pala ideal para quienes quieren un arma demoledora en la pista, inspirada en la esencia de Agustín Tapia.",
      },
    ],
  },
  {
    nombre: "Arturo Coello",
    palas: [
      {
        imagen: "/public/palas/pala-head-delta-pro.png",
        nombrePala: "Head Delta Pro",
        precio: "85$",
        descripcion:
          "La Head Delta Pro es la pala de referencia de Arturo Coello, pensada para jugadores que buscan una potencia extraordinaria en su juego. Su forma de diamante y su balance alto permiten desplegar un ataque demoledor desde cualquier posición ofensiva. Fabricada con grafeno y carbono de alta calidad, ofrece una gran rigidez y durabilidad. Su núcleo Power Foam genera una salida de bola potente y dinámica, ideal para los remates de máxima fuerza. La Delta Pro es la pala perfecta para los que quieren dominar el juego ofensivo, como lo hace Coello en cada partido.",
      },
      {
        imagen: "/public/palas/pala-head-extreme-pro.png",
        nombrePala: "Head Extreme Pro",
        precio: "75$",
        descripcion:
          "La Head Extreme Pro está diseñada para ofrecer un equilibrio entre control y potencia, siendo una alternativa versátil dentro de la gama de Head. Su construcción en carbono de alta resistencia, combinada con el núcleo Power Foam, proporciona un tacto cómodo y una gran salida de bola. Es una pala ideal para jugadores avanzados que buscan un arma completa para afrontar cualquier situación en la pista.",
      },
    ],
  },
  {
    nombre: "Federico Chingotto",
    palas: [
      {
        imagen: "/public/palas/bullpadel-vertex-03-comfort.png",
        nombrePala: "Bullpadel Vertex 03 Comfort",
        precio: "70$",
        descripcion:
          "La Bullpadel Vertex 03 Comfort es una pala pensada para jugadores que buscan un equilibrio entre control y potencia, con un tacto cómodo y una gran salida de bola. Su forma de diamante, combinada con el núcleo de goma MultiEva, ofrece una gran versatilidad, adaptándose tanto al ataque como a la defensa. La tecnología Air React Channel aporta mayor manejabilidad y estabilidad, mientras que el acabado rugoso de la superficie facilita los efectos. Una pala completa que acompaña a la perfección el estilo dinámico de Chingotto.",
      },
      {
        imagen: "/public/palas/pala-bullpadel-vertex-control.png",
        nombrePala: "Bullpadel Vertex 03 Control",
        precio: "75$",
        descripcion:
          "La Bullpadel Vertex 03 Control está diseñada para quienes priorizan el control absoluto del juego sin renunciar a la potencia. Su forma redonda y balance bajo permiten una gran precisión en cada golpe, mientras que el carbono de alta calidad asegura resistencia y durabilidad. Con núcleo MultiEva y tecnología Air React Channel, es una pala ideal para jugadores que basan su juego en la inteligencia y la defensa, como Federico Chingotto.",
      },
    ],
  }
]

jugadores.forEach(datos => {
    let divJugador = document.createElement("div");
    divJugador.classList.add("seccion-jugador");

    divJugador.innerHTML = `
      <hr class="separador">
      <h2 class="titulo-jugador">Palas de ${datos.nombre}</h2>
    `;

    datos.palas.forEach(info => {
      let card = document.createElement("div");
      card.classList.add("card-pala");

      card.innerHTML = `
        <div class="contenido-pala">
          <img src="${info.imagen}" alt="${info.nombrePala}">
          <div class="info-pala">
            <h3>${info.nombrePala}</h3>
            <p class="descripcion">${info.descripcion}</p>
            <p class="precio">${info.precio}</p>
            <button class="btn-comprar">Comprar</button>
          </div>
        </div>
      `;

      divJugador.appendChild(card);
    });

    main.appendChild(divJugador);
  });

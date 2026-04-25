/* ============================================================
   DORIUM JOYERÍA — script.js
   ============================================================

   ÍNDICE:
   1. CONFIGURACIÓN GLOBAL (número WhatsApp)
   2. PRODUCTOS / CATÁLOGO  ← edita aquí para añadir manillas
   3. RENDERIZADO DE PRODUCTOS
   4. CALCULADORA DE PRECIO (diseñador)
   5. FORMULARIO DISEÑADOR
   6. NAVBAR scroll
   7. MENÚ MÓVIL
   8. AOS (animaciones on scroll)
   ============================================================ */


/* ════════════════════════════════════════
   1. CONFIGURACIÓN GLOBAL
   ════════════════════════════════════════
   Cambia WHATSAPP_NUMBER por tu número real.
   Formato: código de país + número (sin +, sin espacios)
   Ejemplo Colombia:  573001234567
   ════════════════════════════════════════ */
const WHATSAPP_NUMBER = '573000000000';   // ← CAMBIA AQUÍ TU NÚMERO


/* ════════════════════════════════════════
   2. CATÁLOGO DE PRODUCTOS
   ════════════════════════════════════════

   Para AGREGAR una nueva manilla:
   Copia uno de los objetos de abajo y añádelo al array.
   Campos:
     id        → número único (no repetir)
     nombre    → nombre de la manilla
     precio    → número (en COP, sin puntos)
     historia  → descripción corta o significado
     materiales→ texto de materiales
     imagen    → ruta a la imagen (o "" para placeholder)
     badge     → etiqueta opcional: "Nuevo", "Favorito", etc. (o "")

   ════════════════════════════════════════ */
const PRODUCTOS = [
  {
    id: 1,
    nombre: "Manilla Sol Negro",
    precio: 85000,
    historia: "Tejida con hilo negro profundo, sus balines de oro 18K evocan los rayos del sol que atraviesan la noche. Para quien lleva luz en la oscuridad.",
    materiales: "Hilo negro · Balines oro 18K · 3 unidades",
    imagen: "assets/images/manilla-negra.jpg",   // ← reemplaza con tu foto
    badge: "Favorito"
  },
  {
    id: 2,
    nombre: "Manilla Hilo Rojo",
    precio: 85000,
    historia: "El rojo es el color de la pasión y la energía vital. Sus balines dorados conectan el fuego interior con el universo exterior.",
    materiales: "Hilo rojo · Balines oro 18K · 3 unidades",
    imagen: "assets/images/manilla-roja.jpg",    // ← reemplaza con tu foto
    badge: "Nuevo"
  },
  {
    id: 3,
    nombre: "Manilla Verde Tierra",
    precio: 90000,
    historia: "El verde de la naturaleza, el arraigo y la abundancia. Con cinco balines de oro que representan los ciclos de crecimiento.",
    materiales: "Hilo verde · Balines oro 18K · 5 unidades",
    imagen: "",   // sin foto aún
    badge: ""
  },
  /* ── AGREGA MÁS MANILLAS AQUÍ ──
  {
    id: 4,
    nombre: "Nombre de tu manilla",
    precio: 95000,
    historia: "Historia o significado de esta pieza.",
    materiales: "Hilo [color] · Balines oro 18K · [N] unidades",
    imagen: "assets/images/nombre-foto.jpg",
    badge: "Nuevo"
  },
  ── FIN ── */
];


/* ════════════════════════════════════════
   3. RENDERIZADO DE PRODUCTOS
   ════════════════════════════════════════ */
function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTOS.map(p => {
    const precio = new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP',
      minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(p.precio);

    const imagenHTML = p.imagen
      ? `<img src="${p.imagen}" alt="${p.nombre}" loading="lazy" />`
      : `<div class="product-image-placeholder">
           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(201,148,13,0.4)" stroke-width="1.5">
             <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
           </svg>
           <span>${p.nombre}</span>
         </div>`;

    const badgeHTML = p.badge
      ? `<span class="product-badge">${p.badge}</span>`
      : '';

    const msg = encodeURIComponent(`Hola, me interesa la *${p.nombre}* (${precio}). ¿Está disponible?`);

    return `
      <article class="product-card">
        <div class="product-image-wrap">
          ${imagenHTML}
          ${badgeHTML}
        </div>
        <div class="product-body">
          <h3 class="product-name">${p.nombre}</h3>
          <p class="product-materials">${p.materiales}</p>
          <p class="product-story">"${p.historia}"</p>
          <div class="product-footer">
            <div>
              <p class="product-price">${precio}</p>
              <p class="product-price-sub">Precio aprox.</p>
            </div>
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${msg}"
               class="product-btn" target="_blank" rel="noopener">
              Pedir ✦
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}


/* ════════════════════════════════════════
   4. CALCULADORA DE PRECIO — DISEÑADOR
   ════════════════════════════════════════

   Precio base + costo por balín adicional
   Ajusta según tus costos reales.
   ════════════════════════════════════════ */
const PRECIO_BASE     = 60000;   // Precio mínimo (hilo + mano de obra)
const PRECIO_BALIN    = 8000;    // Precio por balín adicional

// Recargos por tipo de accesorio
const RECARGOS_ACCESORIO = {
  'Balín liso 3mm':          0,
  'Balín liso 4mm':          5000,
  'Balín liso 5mm':          10000,
  'Balín diamantado 3mm':    5000,
  'Balín diamantado 4mm':    12000,
  'Balín diamantado 5mm':    20000,
  'Placa redonda grabada':   30000,
};

let selectedColor = 'Negro';
let balinQty      = 3;

function calcularPrecio(qty, accesorio) {
  const recargo = RECARGOS_ACCESORIO[accesorio] || 0;
  return PRECIO_BASE + (qty * PRECIO_BALIN) + recargo;
}

function formatCOP(n) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP',
    minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(Math.round(n));
}

function updatePreview() {
  const accesorio = document.getElementById('accesorioSelect')?.value || '';
  const intencion = document.getElementById('intencionInput')?.value  || '—';

  const precio = calcularPrecio(balinQty, accesorio);

  const elColor    = document.getElementById('prev-color');
  const elQty      = document.getElementById('prev-qty');
  const elAcc      = document.getElementById('prev-acc');
  const elIntencion= document.getElementById('prev-intencion');
  const elPrice    = document.getElementById('prev-price');

  if (elColor)     elColor.textContent     = selectedColor;
  if (elQty)       elQty.textContent       = `${balinQty} balín${balinQty > 1 ? 'es' : ''}`;
  if (elAcc)       elAcc.textContent       = accesorio;
  if (elIntencion) elIntencion.textContent = intencion || '—';
  if (elPrice)     elPrice.textContent     = formatCOP(precio);
}

function selectColor(el) {
  document.querySelectorAll('.color-opt').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedColor = el.dataset.color || el.title;
  updatePreview();
}

function changeQty(delta) {
  balinQty = Math.max(1, Math.min(10, balinQty + delta));
  const display = document.getElementById('qtyDisplay');
  if (display) display.textContent = balinQty;
  updatePreview();
}

function enviarDiseño() {
  const accesorio   = document.getElementById('accesorioSelect')?.value  || '';
  const intencion   = document.getElementById('intencionInput')?.value   || '';
  const comentarios = document.getElementById('comentariosInput')?.value || '';
  const precio      = calcularPrecio(balinQty, accesorio);

  const msg = [
    `✨ Hola, quiero diseñar mi manilla DORIUM:`,
    ``,
    `🎨 Color del hilo: *${selectedColor}*`,
    `⚙️ Tipo de balín: *${accesorio}*`,
    `🔢 Cantidad de balines: *${balinQty}*`,
    intencion ? `💫 Intención: *${intencion}*` : '',
    comentarios ? `📝 Comentarios: ${comentarios}` : '',
    ``,
    `💰 Precio estimado: *${formatCOP(precio)}*`,
    ``,
    `¿Está disponible? ¡Gracias! 🌟`
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}


/* ════════════════════════════════════════
   5. NAVBAR SCROLL
   ════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}


/* ════════════════════════════════════════
   6. MENÚ MÓVIL
   ════════════════════════════════════════ */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose= document.getElementById('mobileClose');

  hamburger?.addEventListener('click',  () => mobileMenu?.classList.add('open'));
  mobileClose?.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
}


/* ════════════════════════════════════════
   7. AOS — ANIMACIONES AL SCROLL
   ════════════════════════════════════════ */
function initAOS() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}


/* ════════════════════════════════════════
   INIT
   ════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updatePreview();
  initNavbar();
  initMobileMenu();
  initAOS();
});

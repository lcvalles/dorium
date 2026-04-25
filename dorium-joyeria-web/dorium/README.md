# DORIUM Joyería — Guía completa del sitio web

## Estructura del proyecto
```
dorium/
├── index.html          ← Página principal de la tienda
├── calculadora.html    ← Calculadora para vendedores
├── styles.css          ← Todos los estilos visuales
├── script.js           ← Lógica: catálogo, diseñador, WhatsApp
├── assets/
│   └── images/
│       ├── logo-vertical.png      ← Logo DORIUM principal
│       ├── logo-certificado.png   ← Sello Oro 18K
│       ├── manilla-negra.jpg      ← (agregar tu foto)
│       ├── manilla-roja.jpg       ← (agregar tu foto)
│       └── manilla-hero.jpg       ← (agregar tu foto para el hero)
└── README.md
```

---

## 1. CAMBIAR EL NÚMERO DE WHATSAPP

Solo hay UN lugar para cambiarlo. En `script.js`, línea 20:
```js
const WHATSAPP_NUMBER = '573000000000';   // ← CAMBIA AQUÍ
```
Formato: código de país + número (sin +, sin espacios, sin guiones)
Ejemplo: Colombia 301 234 5678 → `573012345678`

---

## 2. AGREGAR O EDITAR PRODUCTOS

En `script.js`, busca el array `PRODUCTOS` (línea ~40).

Cada manilla tiene esta estructura:
```js
{
  id: 4,                                    // número único (no repetir)
  nombre: "Nombre de tu manilla",
  precio: 95000,                            // precio en COP, sin puntos
  historia: "Historia o significado.",
  materiales: "Hilo verde · Oro 18K · 5 unidades",
  imagen: "assets/images/mi-foto.jpg",      // ruta a tu imagen
  badge: "Nuevo"                            // o "" para no mostrar
}
```

**Para agregar una nueva manilla:** copia ese bloque, cambia el `id` y los datos, y pégalo en el array antes del comentario `/* ── FIN ── */`.

---

## 3. AGREGAR IMÁGENES DE PRODUCTOS

1. Toma o descarga la foto de la manilla (recomendado: cuadrada, mínimo 800x800px).
2. Guárdala en `assets/images/` con un nombre sin espacios (ej: `manilla-dorada.jpg`).
3. En el array `PRODUCTOS` del `script.js`, pon la ruta en el campo `imagen`:
   ```js
   imagen: "assets/images/manilla-dorada.jpg"
   ```

**Foto del Hero (principal):** Guarda una foto como `assets/images/manilla-hero.jpg` y en `index.html` reemplaza el bloque del placeholder con:
```html
<img src="assets/images/manilla-hero.jpg" alt="Manilla DORIUM" class="hero-image-main" />
```

---

## 4. CAMBIAR INSTAGRAM

En `index.html`, busca `@dorium.shop` (en el footer) y cámbialo por tu usuario real:
```html
<a href="https://instagram.com/TU_USUARIO" target="_blank">@tu_usuario</a>
```

---

## 5. CALCULADORA — cómo funciona la persistencia

La calculadora guarda los datos automáticamente en el navegador (localStorage).
- Los materiales y el historial se conservan al cerrar y reabrir.
- Para respaldo, usa el botón **"Exportar datos"** → genera un archivo `.json`.
- Para restaurar en otro dispositivo, usa **"Importar datos"** con ese archivo.
- El botón **"Limpiar todo"** borra todo y restaura los materiales por defecto.

---

## 6. SUBIR A GITHUB PAGES

### Paso 1: Crear repositorio en GitHub
1. Entra a [github.com](https://github.com) e inicia sesión.
2. Clic en **"New repository"**.
3. Nombre: `dorium-shop` (o cualquier nombre).
4. Marca como **Public** (necesario para GitHub Pages gratis).
5. Clic en **"Create repository"**.

### Paso 2: Subir los archivos
**Opción A — desde la web de GitHub (más fácil):**
1. En tu repositorio, clic en **"uploading an existing file"**.
2. Arrastra TODOS los archivos y carpetas del proyecto.
3. Clic en **"Commit changes"**.

**Opción B — desde Visual Studio Code:**
1. Instala [Git](https://git-scm.com/downloads) y [VS Code](https://code.visualstudio.com/).
2. Abre la carpeta `dorium` en VS Code.
3. Abre la terminal (`Ctrl+` ` `` `) y ejecuta:
```bash
git init
git add .
git commit -m "Primer commit DORIUM"
git remote add origin https://github.com/TU_USUARIO/dorium-shop.git
git push -u origin main
```

### Paso 3: Activar GitHub Pages
1. En tu repositorio, ve a **Settings → Pages**.
2. En "Source", selecciona **"Deploy from a branch"**.
3. Branch: **main** / Folder: **/ (root)**.
4. Clic en **Save**.
5. En ~2 minutos estará disponible en: `https://TU_USUARIO.github.io/dorium-shop/`

---

## 7. CONECTAR EL DOMINIO dorium.shop

### En tu proveedor de dominio (ej. GoDaddy, Namecheap, Porkbun):
Agrega estos registros DNS:

**Tipo A (para el dominio raíz `dorium.shop`):**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Tipo CNAME (para `www.dorium.shop`):**
```
TU_USUARIO.github.io
```

### En GitHub:
1. Ve a Settings → Pages.
2. En "Custom domain", escribe: `dorium.shop`.
3. Clic en **Save**.
4. Espera 24-48h para que los DNS propaguen.
5. Activa **"Enforce HTTPS"** cuando esté disponible.

---

## 8. RECOMENDACIONES PARA VENDER MÁS

1. **Fotos de calidad:** La diferencia más importante. Fotos en luz natural, fondo crema o blanco, a detalle de los balines. Vale la pena contratar un sesión de 1-2h con un fotógrafo local.

2. **WhatsApp Business:** Crea una cuenta Business con horario, catálogo y respuestas automáticas. El link del botón ya apunta a WhatsApp, solo confirma que el número sea el de tu cuenta Business.

3. **Stories de Instagram:** Muestra el proceso de elaboración, los materiales, el empaque. La autenticidad vende.

4. **Reseñas:** Pide a tus primeros clientes una foto usando la manilla y una pequeña reseña. Agrégalas a la sección de galería.

5. **SEO local:** El sitio ya incluye meta-tags optimizados para Medellín. Considera también un perfil de Google Business para búsquedas locales.

6. **Precio:** El formulario "Diseña tu manilla" genera una estimación. Eso reduce la fricción: el cliente llega al WhatsApp con expectativas alineadas.

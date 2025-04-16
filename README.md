# 🎯 Diana de Autoevaluación Circular

Una herramienta visual e interactiva para la autoevaluación personal y profesional, construida con HTML5, CSS, JavaScript, Bootstrap y Canvas API.

---

## 🧭 ¿Qué es?

La **Diana de Autoevaluación Circular** permite al usuario evaluarse en diferentes competencias o criterios a través de una visualización tipo diana o gráfico radial. Cada sector representa un criterio evaluado, mostrando el nivel alcanzado con un color y un valor definido.

---

## 🛠️ Funcionalidades

### 🔹 Interfaz interactiva
- Campo para ingresar el **nombre del usuario** (se muestra en la imagen final).
- Posibilidad de **agregar o eliminar criterios**.
- Selección del **número de niveles** (por defecto 4).
- Activar o desactivar el **color en los títulos** de los criterios.
- Nueva opción para **mostrar u ocultar los números de nivel en la diana**.

### 🔹 Visualización dinámica en Canvas
- Representación circular de los criterios.
- Cada sector varía en longitud según el nivel ingresado.
- Etiquetas de criterios posicionadas alrededor del círculo.

### 🔹 Validaciones y alertas
- Valores validados entre 0 y el número máximo de niveles.
- Mensajes de error con **Toastr.js** si se ingresan valores inválidos.
- Evita duplicados o vacíos en los nombres de criterios.

### 🔹 Exportación del resultado
- Botón para **descargar la diana en formato PNG**.
- Imagen generada automáticamente con nombre y configuración visual del usuario.

---

## 🎨 Diseño y Estilo

- Estilo limpio y moderno con **Bootstrap 5**.
- Compatible con dispositivos móviles (responsive).
- Estilos personalizados para inputs, botones y diana (`styles.css`).
- Colores predefinidos para facilitar la diferenciación visual.

---

## 📂 Estructura de Archivos

```plaintext
📁 diana-autoevaluacion/
├── index.html           # Página principal
├── css/
│   └── styles.css       # Estilos personalizados
├── js/
│   └── main.js          # Lógica de la diana y funcionalidad
└── img/              # (opcional) Recursos como imágenes, íconos
```
---

## 📦 Tecnologías Usadas

- **HTML5 / CSS3 / JavaScript**
- **Bootstrap 5**
- **Font Awesome**
- **Toastr.js**
- **jQuery**
- **Canvas API**

---

## 🧩 Usos sugeridos

- Autoevaluación personal (habilidades blandas, metas, emociones).
- Evaluación en contextos educativos (participación, esfuerzo, desempeño).
- Herramienta en procesos de coaching, mentoría o talleres de desarrollo personal.
- Dinámicas grupales y ejercicios de reflexión.

---

## 🖼️ Vista previa (mockup)

> Puedes ver un ejemplo visual del gráfico generado directamente en el navegador.

---

## 📥 Descarga

El botón **"Descargar imagen"** permite exportar el gráfico de la diana en formato `.png`, incluyendo el nombre del usuario y configuración visual actual.

---

## ✨ Autor

**WikiGods**

---

## Licencia

Este proyecto está bajo una licencia personalizada. Solo se permite su uso educativo. Queda prohibido el uso comercial sin autorización.  
Ver el archivo [LICENSE](./LICENSE) para más detalles.

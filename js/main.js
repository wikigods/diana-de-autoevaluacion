const canvas = document.getElementById('dianaCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const maxRadius = 300;

let criterios = [
    "Asumir riesgos", "Autoconocimiento", "Iniciativa",
    "Autonomía", "Confianza en sí mismo", "Optimismo",
    "Deseo de superación", "Creatividad"
];

let coloresPredefinidos = [
    "#e74c3c", "#2980b9", "#27ae60",
    "#f39c12", "#8e44ad", "#16a085",
    "#d35400", "#2c3e50"
];

let niveles = 4;
let valores = new Array(criterios.length).fill(2);
let colores = [...coloresPredefinidos];
let showColorInTitles = false;

function drawDiana() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const spacing = maxRadius / niveles;

    for (let i = 1; i <= niveles; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, spacing * i, 0, Math.PI * 2);
        ctx.strokeStyle = "#ccc";
        ctx.stroke();
    }

    const angleStep = (2 * Math.PI) / criterios.length;

    criterios.forEach((criterio, i) => {
        const angleStart = i * angleStep;
        const angleEnd = angleStart + angleStep;
        const value = valores[i];
        const radius = (value / niveles) * maxRadius;
        const color = colores[i] || "#999";

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angleStart, angleEnd);
        ctx.closePath();
        ctx.fillStyle = color + "cc";
        ctx.fill();

        const labelRadius = maxRadius + 25;
        const labelX = centerX + Math.cos(angleStart + angleStep / 2) * labelRadius;
        const labelY = centerY + Math.sin(angleStart + angleStep / 2) * labelRadius;

        ctx.fillStyle = showColorInTitles ? color : "#000";
        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(criterio, labelX, labelY);
    });

    const nombre = document.getElementById("userName").value.trim().toUpperCase();
    if (nombre) {
        ctx.fillStyle = "#000";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(nombre, centerX, centerY + maxRadius + 60);
    }
}

function addCriterion() {
    const newCrit = document.getElementById("newCriterion").value.trim();
    if (newCrit) {
        criterios.push(newCrit);
        valores.push(2);
        colores.push(generateRandomColor());
        updateInputs();
        updateChart();
        document.getElementById("newCriterion").value = "";
    }
}

function removeCriterion(index) {
    criterios.splice(index, 1);
    valores.splice(index, 1);
    colores.splice(index, 1);
    updateInputs();
    drawDiana();
}

function updateInputs() {
    const container = document.getElementById("valueInputs");
    container.innerHTML = "";
    criterios.forEach((crit, i) => {
        const div = document.createElement("div");
        div.className = "mb-2 d-flex align-items-center";

        const label = document.createElement("label");
        label.textContent = crit + ": ";
        label.className = "me-2";

        const inputValor = document.createElement("input");
        inputValor.type = "number";
        inputValor.min = 0;
        inputValor.max = niveles;
        inputValor.value = valores[i];
        inputValor.className = "form-control me-2 form-control-valor";
        inputValor.dataset.oldValue = valores[i];

        inputValor.oninput = () => {
            let val = parseFloat(inputValor.value);
            if (isNaN(val)) val = 0;

            if (val < 0) {
                toastr.error("El valor no puede ser negativo. Se ha corregido a 0.");
                val = 0;
                valores[i] = val;
                inputValor.value = val;
                inputValor.dataset.oldValue = val;
            } else if (val > niveles) {
                toastr.error(`El valor no puede ser mayor que el número de niveles (${niveles}). Se mantendrá el valor anterior.`);
                inputValor.value = inputValor.dataset.oldValue;
            } else {
                valores[i] = val;
                inputValor.dataset.oldValue = val;
            }

            drawDiana();
        };

        const inputColor = document.createElement("input");
        inputColor.type = "color";
        inputColor.value = colores[i];
        inputColor.className = "form-control me-2 form-control-color";
        inputColor.oninput = () => {
            colores[i] = inputColor.value;
            drawDiana();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn btn btn-danger btn-sm";
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => removeCriterion(i);

        div.appendChild(label);
        div.appendChild(inputValor);
        div.appendChild(inputColor);
        div.appendChild(deleteBtn);
        container.appendChild(div);
    });
}

function updateChart() {
    niveles = parseInt(document.getElementById("levels").value);

    // Validación de niveles
    if (niveles < 1) {
        toastr.error("El número de niveles no puede ser menor que 1.");
        niveles = 4;
        document.getElementById("levels").value = niveles;
    }

    updateInputs();
    drawDiana();
}

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.getElementById("showColorInTitles").addEventListener('change', function () {
    showColorInTitles = this.checked;
    drawDiana();
});

function downloadImage() {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tempCtx.fillStyle = "#fff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    const imageUrl = tempCanvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "grafico_diana.png";
    link.click();
}

updateInputs();
drawDiana();
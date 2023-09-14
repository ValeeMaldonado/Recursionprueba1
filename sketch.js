let size = 100; // Tamaño inicial de los cuadrados
let slider; // Deslizador para ajustar el tamaño
let xOffset = 0; // Offset de posición en el eje X
let yOffset = 0; // Offset de posición en el eje Y

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(1, 10, 2, 0.1); // Crea un deslizador con valores entre 1 y 10, valor inicial 2, incremento de 0.1
  slider.position(20, 20); // Posición del deslizador en la pantalla
  slider.input(updateOffsets); // Llama a la función updateOffsets cuando el deslizador cambie
  noLoop(); // Detiene el bucle de dibujo inicial
  background(220);
  drawSquares(width / 2, height / 2, size);
}

function updateOffsets() {
  xOffset = random(-slider.value() * 5, slider.value() * 5);
  yOffset = random(-slider.value() * 5, slider.value() * 5);
}

function drawSquares(x, y, s) {
  // Limita las coordenadas x e y dentro del rango del canvas
  x = constrain(x, 0, width - s);
  y = constrain(y, 0, height - s);

  rect(x + xOffset, y + yOffset, s, s);

  if (s > 10) { // Condición de parada para evitar recursión infinita
    for (let i = 0; i < 4; i++) {
      let newX = lerp(x, x + random(-s / 2, s / 2), 0.5);
      let newY = lerp(y, y + random(-s / 2, s / 2), 0.5);
      let newSize = lerp(s, s / slider.value(), 0.5);
      drawSquares(newX, newY, newSize);
    }
  }
}

function mousePressed() {
  clear(); // Limpia el lienzo al hacer clic
  background(220); // Vuelve a dibujar el fondo
  drawSquares(width / 2, height / 2, size); // Reinicia la recursión
}

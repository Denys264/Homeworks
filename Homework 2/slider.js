const slider = document.getElementById('imageSlider');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentImageIndex = 0;

const images = [
  'image1.png',
  'image2.png',
  'image3.png',
  'image4.png'
];

const imageElement = slider.querySelector('img');

function showImage(index) {
  imageElement.src = images[index];
}

function nextImage() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  showImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  showImage(currentImageIndex);
}

showImage(currentImageIndex);

prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// Automatically change images every 3 seconds
setInterval(nextImage, 3000);
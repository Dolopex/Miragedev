// Cargar navbar y footer dinámicamente
async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (el) {
        const res = await fetch(file);
        el.innerHTML = await res.text();
    }
}

// Cargar los componentes
loadComponent('navbar', 'components/navbar.html');
loadComponent('footer', 'components/footer.html');

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.float');
    parallax.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Portafolio modal animado
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("portfolioModal");
  const closeModal = document.getElementById("closeModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");

  const cards = document.querySelectorAll(".portfolio-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img").src;
      const title = card.querySelector("h3").textContent;
      const description = card.querySelector("p").textContent;

      modalImage.src = img;
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });
});

  function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.add('flex');
  }

  function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.getElementById(id).classList.remove('flex');
  }

// Mensajes que el bot "escribe"
const mensajes = [
  'const saludo = "Hola :D";',
  'console.log("Crea magia con código!");',
  'let sueño = "Desarrollemos tu idea!";',
  'function focus() { return "🔥 y café ☕"; }',
];

const botText = document.getElementById('bot-text');
let mensajeIndex = 0;
let charIndex = 0;
let escribiendo = true;

// efecto de escribir y borrar
function escribirTexto() {
  const texto = mensajes[mensajeIndex];
  if (escribiendo) {
    botText.textContent = texto.substring(0, charIndex++) + '|';
    if (charIndex > texto.length) {
      escribiendo = false;
      setTimeout(escribirTexto, 1200);
    } else {
      setTimeout(escribirTexto, 80);
    }
  } else {
    botText.textContent = texto.substring(0, charIndex--) + '|';
    if (charIndex < 0) {
      escribiendo = true;
      mensajeIndex = (mensajeIndex + 1) % mensajes.length;
      setTimeout(escribirTexto, 500);
    } else {
      setTimeout(escribirTexto, 40);
    }
  }
}
escribirTexto();

// efecto de flotar
botText.parentElement.animate(
  [
    { transform: "translateY(0px)" },
    { transform: "translateY(-6px)" },
    { transform: "translateY(0px)" },
  ],
  { duration: 3000, iterations: Infinity }
);

// opacidad según scroll
window.addEventListener('scroll', () => {
  const scrollMax = document.body.scrollHeight - window.innerHeight;
  const scrollY = window.scrollY;
  const factor = scrollY / scrollMax; // de 0 a 1
  const opacidad = Math.max(0.2, 1 - factor * 1.2); // se desvanece hasta 0.2
  document.getElementById('bot').style.opacity = opacidad;
});

gsap.registerPlugin(ScrollToPlugin);

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    // Efecto de scroll con rebote y easing suave
    gsap.to(window, {
      duration: 1.4,
      scrollTo: { y: target, offsetY: 60 },
      ease: "elastic.out(1, 0.4)"
    });
  });
});




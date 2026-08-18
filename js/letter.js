/*
========================================================
MEMORIES
Página principal
========================================================
*/


document.addEventListener(
  "DOMContentLoaded",
  () => {

    initializeTheme();

    initializeContent();

    initializeCounter();

    initializeGallery();

    initializeLetter();

    initializeMusic();

    initializeMap();

  }
);


// ======================================================
// TEMA
// ======================================================

function initializeTheme() {

  const theme =
    APP_CONFIG.theme || {};

  const root =
    document.documentElement;

  if (theme.primary) {

    root.style.setProperty(
      "--primary",
      theme.primary
    );

  }

  if (theme.secondary) {

    root.style.setProperty(
      "--secondary",
      theme.secondary
    );

  }

  if (theme.background) {

    root.style.setProperty(
      "--background",
      theme.background
    );

  }

  if (theme.surface) {

    root.style.setProperty(
      "--surface",
      theme.surface
    );

  }

  if (theme.text) {

    root.style.setProperty(
      "--text",
      theme.text
    );

  }

  if (theme.muted) {

    root.style.setProperty(
      "--muted",
      theme.muted
    );

  }

}


// ======================================================
// CONTEÚDO PRINCIPAL
// ======================================================

function initializeContent() {

  const home =
    APP_CONFIG.home;


  setText(
    "homeBadge",
    home.badge
  );


  setText(
    "homeTitle",
    home.title
  );


  setText(
    "homeSubtitle",
    home.subtitle
  );


  setText(
    "counterTitle",
    home.counterTitle
  );


  setText(
    "letterTitle",
    APP_CONFIG.letter.title
  );


  const firstButton =
    document.getElementById(
      "openMapButton"
    );


  if (firstButton) {

    firstButton.textContent =
      home.mapButtonText;

  }


  document.title =
    `${APP_CONFIG.couple.person1} & ${APP_CONFIG.couple.person2} ❤️`;

}


// ======================================================
// CONTADOR
// ======================================================

function initializeCounter() {

  const counter =
    document.getElementById(
      "loveCounter"
    );


  if (!counter) {

    return;

  }


  const start =
    new Date(
      APP_CONFIG.couple.startDate
    );


  if (
    Number.isNaN(
      start.getTime()
    )
  ) {

    counter.textContent =
      "Configure uma data válida em config.js.";

    return;

  }


  function updateCounter() {

    const now =
      new Date();


    if (now < start) {

      counter.textContent =
        "Essa história ainda vai começar. ❤️";

      return;

    }


    const difference =
      getDateDifference(
        start,
        now
      );


    counter.innerHTML = `

      ${createCounterItem(
        difference.years,
        "anos",
        "ano"
      )}

      ${createCounterItem(
        difference.months,
        "meses",
        "mês"
      )}

      ${createCounterItem(
        difference.days,
        "dias",
        "dia"
      )}

      ${createCounterItem(
        difference.hours,
        "horas",
        "hora"
      )}

      ${createCounterItem(
        difference.minutes,
        "minutos",
        "minuto"
      )}

      ${createCounterItem(
        difference.seconds,
        "segundos",
        "segundo"
      )}

    `;

  }


  updateCounter();


  setInterval(
    updateCounter,
    1000
  );

}


function getDateDifference(
  start,
  end
) {

  let years =
    end.getFullYear() -
    start.getFullYear();


  let cursor =
    new Date(start);


  cursor.setFullYear(
    cursor.getFullYear() +
    years
  );


  if (cursor > end) {

    years--;

    cursor =
      new Date(start);

    cursor.setFullYear(
      cursor.getFullYear() +
      years
    );

  }


  let months = 0;


  while (months < 11) {

    const next =
      new Date(cursor);


    next.setMonth(
      next.getMonth() + 1
    );


    if (next > end) {

      break;

    }


    cursor = next;

    months++;

  }


  let remaining =
    end - cursor;


  const dayMilliseconds =
    24 * 60 * 60 * 1000;


  const hourMilliseconds =
    60 * 60 * 1000;


  const minuteMilliseconds =
    60 * 1000;


  const secondMilliseconds =
    1000;


  const days =
    Math.floor(
      remaining /
      dayMilliseconds
    );


  remaining -=
    days *
    dayMilliseconds;


  const hours =
    Math.floor(
      remaining /
      hourMilliseconds
    );


  remaining -=
    hours *
    hourMilliseconds;


  const minutes =
    Math.floor(
      remaining /
      minuteMilliseconds
    );


  remaining -=
    minutes *
    minuteMilliseconds;


  const seconds =
    Math.floor(
      remaining /
      secondMilliseconds
    );


  return {

    years,

    months,

    days,

    hours,

    minutes,

    seconds

  };

}


function createCounterItem(
  value,
  plural,
  singular
) {

  const label =
    value === 1
      ? singular
      : plural;


  return `

    <div class="counter-item">

      <strong>
        ${String(value).padStart(2, "0")}
      </strong>

      <span>
        ${label}
      </span>

    </div>

  `;

}


// ======================================================
// GALERIA
// ======================================================

function initializeGallery() {

  const gallery =
    document.getElementById(
      "gallery"
    );


  const dotsContainer =
    document.getElementById(
      "galleryDots"
    );


  const previousButton =
    document.getElementById(
      "galleryPrevious"
    );


  const nextButton =
    document.getElementById(
      "galleryNext"
    );


  if (!gallery) {

    return;

  }


  const images =
    APP_CONFIG.gallery || [];


  if (!images.length) {

    gallery.innerHTML = `

      <div class="gallery-empty">

        Nenhuma foto cadastrada.

      </div>

    `;

    return;

  }


  let currentIndex = 0;


  images.forEach(
    (item, index) => {

      const slide =
        document.createElement(
          "figure"
        );


      slide.className =
        "gallery-slide";


      slide.dataset.index =
        index;


      const image =
        document.createElement(
          "img"
        );


      image.src =
        item.image;


      image.alt =
        item.caption ||
        `Memória ${index + 1}`;


      addImageFallback(
        image
      );


      const caption =
        document.createElement(
          "figcaption"
        );


      caption.textContent =
        item.caption || "";


      slide.appendChild(
        image
      );


      slide.appendChild(
        caption
      );


      gallery.appendChild(
        slide
      );


      const dot =
        document.createElement(
          "button"
        );


      dot.className =
        "gallery-dot";


      dot.setAttribute(
        "aria-label",
        `Abrir foto ${index + 1}`
      );


      dot.addEventListener(
        "click",
        () => {

          currentIndex =
            index;

          updateGallery();

        }
      );


      dotsContainer.appendChild(
        dot
      );

    }
  );


  const slides =
    Array.from(
      gallery.children
    );


  const dots =
    Array.from(
      dotsContainer.children
    );


  function updateGallery() {

    slides.forEach(
      (slide, index) => {

        slide.classList.toggle(
          "active",
          index === currentIndex
        );

      }
    );


    dots.forEach(
      (dot, index) => {

        dot.classList.toggle(
          "active",
          index === currentIndex
        );

      }
    );

  }


  previousButton?.addEventListener(
    "click",
    () => {

      currentIndex =
        (
          currentIndex -
          1 +
          images.length
        ) %
        images.length;


      updateGallery();

    }
  );


  nextButton?.addEventListener(
    "click",
    () => {

      currentIndex =
        (
          currentIndex +
          1
        ) %
        images.length;


      updateGallery();

    }
  );


  updateGallery();

}


// ======================================================
// CARTA COM EFEITO DE DIGITAÇÃO
// ======================================================

function initializeLetter() {

  const output =
    document.getElementById(
      "letterText"
    );


  const cursor =
    document.getElementById(
      "typewriterCursor"
    );


  if (!output) {

    return;

  }


  const text =
    APP_CONFIG.letter.text || "";


  const speed =
    APP_CONFIG.letter
      .typewriterSpeed || 30;


  let index = 0;


  function typeNextCharacter() {

    if (
      index >=
      text.length
    ) {

      if (cursor) {

        cursor.classList.add(
          "finished"
        );

      }

      return;

    }


    output.textContent +=
      text.charAt(index);


    index++;


    let delay =
      speed;


    const previousCharacter =
      text.charAt(index - 1);


    if (
      previousCharacter === "." ||
      previousCharacter === "!" ||
      previousCharacter === "?"
    ) {

      delay =
        speed * 5;

    }


    if (
      previousCharacter === ","
    ) {

      delay =
        speed * 2;

    }


    setTimeout(
      typeNextCharacter,
      delay
    );

  }


  /*
    Começa quando a carta entra na tela.
  */

  const observer =
    new IntersectionObserver(
      entries => {

        if (
          entries[0]
            .isIntersecting
        ) {

          observer.disconnect();

          typeNextCharacter();

        }

      },

      {
        threshold: 0.25
      }
    );


  observer.observe(
    output
  );

}


// ======================================================
// MÚSICA
// ======================================================

function initializeMusic() {

  const config =
    APP_CONFIG.music;


  const audio =
    document.getElementById(
      "backgroundMusic"
    );


  const button =
    document.getElementById(
      "musicButton"
    );


  if (
    !config?.enabled ||
    !audio ||
    !button
  ) {

    return;

  }


  audio.src =
    config.file;


  audio.volume =
    Math.min(
      1,
      Math.max(
        0,
        config.volume ?? 0.3
      )
    );


  button.hidden =
    false;


  let playing =
    false;


  button.addEventListener(
    "click",
    async () => {

      try {

        if (playing) {

          audio.pause();

          button.textContent =
            "♫ Tocar música";

          playing =
            false;

        }

        else {

          await audio.play();

          button.textContent =
            "❚❚ Pausar música";

          playing =
            true;

        }

      }

      catch (error) {

        console.error(
          "Não foi possível reproduzir a música:",
          error
        );

      }

    }
  );


  audio.addEventListener(
    "ended",
    () => {

      playing =
        false;

      button.textContent =
        "♫ Tocar música";

    }
  );

}


// ======================================================
// MAPA
// ======================================================

function initializeMap() {

  const overlay =
    document.getElementById(
      "mapOverlay"
    );


  const frame =
    document.getElementById(
      "mapFrame"
    );


  const closeButton =
    document.getElementById(
      "closeMapButton"
    );


  const openButtons = [

    document.getElementById(
      "openMapButton"
    ),

    document.getElementById(
      "openMapButtonBottom"
    )

  ].filter(Boolean);


  if (
    !overlay ||
    !frame
  ) {

    return;

  }


  function openMap() {

    if (!frame.src) {

      frame.src =
        frame.dataset.src;

    }


    overlay.classList.add(
      "active"
    );


    overlay.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "no-scroll"
    );

  }


  function closeMap() {

    overlay.classList.remove(
      "active"
    );


    overlay.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "no-scroll"
    );

  }


  openButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        openMap
      );

    }
  );


  closeButton?.addEventListener(
    "click",
    closeMap
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        overlay.classList.contains(
          "active"
        )
      ) {

        closeMap();

      }

    }
  );

}


// ======================================================
// UTILITÁRIOS
// ======================================================

function setText(
  id,
  value
) {

  const element =
    document.getElementById(id);


  if (element) {

    element.textContent =
      value || "";

  }

}


function addImageFallback(
  image
) {

  image.addEventListener(
    "error",
    () => {

      image.onerror = null;

      image.src =
        DEFAULT_IMAGE;

    }
  );

}
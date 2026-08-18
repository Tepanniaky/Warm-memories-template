/*
========================================================
MEMORIES
Mapa interativo
========================================================
*/


document.addEventListener(
  "DOMContentLoaded",
  () => {

    initializeTheme();

    initializeMemoryMap();

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


  Object.entries({

    "--primary":
      theme.primary,

    "--secondary":
      theme.secondary,

    "--background":
      theme.background,

    "--surface":
      theme.surface,

    "--text":
      theme.text,

    "--muted":
      theme.muted

  }).forEach(
    ([property, value]) => {

      if (value) {

        root.style.setProperty(
          property,
          value
        );

      }

    }
  );

}


// ======================================================
// MAPA
// ======================================================

function initializeMemoryMap() {

  const rawMemories =
    APP_CONFIG.memories || [];


  /*
    Filtra itens que possuem coordenadas válidas.
  */

  const memories =
    rawMemories.filter(
      memory => {

        return (
          Number.isFinite(
            Number(
              memory.latitude
            )
          ) &&

          Number.isFinite(
            Number(
              memory.longitude
            )
          )
        );

      }
    );


  /*
    Organiza cronologicamente.

    Memórias sem data, como "Próximo capítulo",
    ficam no final.
  */

  memories.sort(
    (a, b) => {

      if (!a.date) {

        return 1;

      }


      if (!b.date) {

        return -1;

      }


      return (
        new Date(a.date) -
        new Date(b.date)
      );

    }
  );


  // ----------------------------------------------------
  // CRIA MAPA
  // ----------------------------------------------------

  const map =
    L.map(
      "map",
      {
        zoomControl:
          true
      }
    )
    .setView(
      [0, 0],
      2
    );


  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

      maxZoom:
        19,

      attribution:
        "&copy; OpenStreetMap contributors"

    }

  ).addTo(map);


  // ----------------------------------------------------
  // CLUSTER
  // ----------------------------------------------------

  const markerLayer =
    typeof L.markerClusterGroup ===
    "function"

      ? L.markerClusterGroup({

          showCoverageOnHover:
            false,

          maxClusterRadius:
            45

        })

      : L.layerGroup();


  map.addLayer(
    markerLayer
  );


  // ----------------------------------------------------
  // CASO NÃO TENHA MEMÓRIAS
  // ----------------------------------------------------

  if (!memories.length) {

    console.warn(
      "Nenhuma memória válida cadastrada em config.js."
    );


    return;

  }


  const bounds = [];


  // ----------------------------------------------------
  // CRIA MARCADORES
  // ----------------------------------------------------

  memories.forEach(
    (memory, index) => {

      const latitude =
        Number(
          memory.latitude
        );


      const longitude =
        Number(
          memory.longitude
        );


      const icon =
        createHeartIcon(
          index + 1,
          Boolean(
            memory.future
          )
        );


      const marker =
        L.marker(
          [
            latitude,
            longitude
          ],

          {
            icon
          }
        );


      marker.on(
        "click",
        () => {

          openStory(
            index
          );

        }
      );


      markerLayer.addLayer(
        marker
      );


      bounds.push(
        [
          latitude,
          longitude
        ]
      );

    }
  );


  // ----------------------------------------------------
  // ENQUADRAMENTO AUTOMÁTICO
  // ----------------------------------------------------

  if (
    bounds.length === 1
  ) {

    map.setView(
      bounds[0],
      15
    );

  }

  else {

    map.fitBounds(
      bounds,
      {
        padding: [
          70,
          70
        ]
      }
    );

  }


  // ====================================================
  // STORY
  // ====================================================

  const storyOverlay =
    document.getElementById(
      "storyOverlay"
    );


  const storyImage =
    document.getElementById(
      "storyImage"
    );


  const storyNumber =
    document.getElementById(
      "storyNumber"
    );


  const storyDate =
    document.getElementById(
      "storyDate"
    );


  const storyTitle =
    document.getElementById(
      "storyTitle"
    );


  const storyDescription =
    document.getElementById(
      "storyDescription"
    );


  const previousButton =
    document.getElementById(
      "storyPrevious"
    );


  const nextButton =
    document.getElementById(
      "storyNext"
    );


  const closeButton =
    document.getElementById(
      "storyClose"
    );


  let currentIndex = 0;


  function openStory(index) {

    currentIndex =
      index;


    renderStory();


    storyOverlay.classList.add(
      "active"
    );

  }


  function closeStory() {

    storyOverlay.classList.remove(
      "active"
    );

  }


  function renderStory() {

    const memory =
      memories[currentIndex];


    storyImage.src =
      memory.image ||
      DEFAULT_IMAGE;


    storyImage.alt =
      memory.title ||
      "Memória";


    addImageFallback(
      storyImage
    );


    storyNumber.textContent =
      memory.future
        ? "∞"
        : String(
            currentIndex + 1
          );


    if (memory.future) {

      storyDate.textContent =
        "Em breve...";

    }

    else {

      storyDate.textContent =
        formatDate(
          memory.date
        );

    }


    storyTitle.textContent =
      memory.title ||
      "Nossa memória";


    storyDescription.textContent =
      memory.description ||
      "";


    previousButton.style.visibility =
      currentIndex === 0
        ? "hidden"
        : "visible";

  }


  previousButton.addEventListener(
    "click",
    () => {

      if (
        currentIndex > 0
      ) {

        currentIndex--;

        renderStory();

      }

    }
  );


  nextButton.addEventListener(
    "click",
    () => {

      if (
        currentIndex <
        memories.length - 1
      ) {

        currentIndex++;

        renderStory();

      }

      else {

        closeStory();

        showFinal();

      }

    }
  );


  closeButton.addEventListener(
    "click",
    closeStory
  );


  // ====================================================
  // FINAL
  // ====================================================

  const finalOverlay =
    document.getElementById(
      "finalOverlay"
    );


  const finalImage =
    document.getElementById(
      "finalImage"
    );


  const finalTitle =
    document.getElementById(
      "finalTitle"
    );


  const finalMessage =
    document.getElementById(
      "finalMessage"
    );


  const restartButton =
    document.getElementById(
      "restartStories"
    );


  const closeFinalButton =
    document.getElementById(
      "closeFinal"
    );


  function showFinal() {

    const final =
      APP_CONFIG.final;


    finalImage.src =
      final.image ||
      DEFAULT_IMAGE;


    addImageFallback(
      finalImage
    );


    finalTitle.textContent =
      final.title ||
      "";


    finalMessage.textContent =
      final.message ||
      "";


    finalOverlay.classList.add(
      "active"
    );

  }


  function closeFinal() {

    finalOverlay.classList.remove(
      "active"
    );

  }


  restartButton.addEventListener(
    "click",
    () => {

      closeFinal();

      openStory(0);

    }
  );


  closeFinalButton.addEventListener(
    "click",
    closeFinal
  );


  // ====================================================
  // TECLADO
  // ====================================================

  document.addEventListener(
    "keydown",
    event => {

      if (
        finalOverlay.classList.contains(
          "active"
        )
      ) {

        if (
          event.key === "Escape"
        ) {

          closeFinal();

        }


        return;

      }


      if (
        !storyOverlay.classList.contains(
          "active"
        )
      ) {

        return;

      }


      if (
        event.key ===
        "ArrowRight"
      ) {

        nextButton.click();

      }


      if (
        event.key ===
        "ArrowLeft"
      ) {

        previousButton.click();

      }


      if (
        event.key ===
        "Escape"
      ) {

        closeStory();

      }

    }
  );

}


// ======================================================
// MARCADOR DE CORAÇÃO
// ======================================================

function createHeartIcon(
  number,
  future
) {

  const content =
    future
      ? "∞"
      : number;


  return L.divIcon({

    className:
      "custom-heart-marker",

    html: `

      <div
        class="
          heart-marker
          ${future ? "future" : ""}
        "
      >

        <span class="heart-symbol">
          ♥
        </span>

        <strong>
          ${content}
        </strong>

      </div>

    `,

    iconSize:
      [52, 52],

    iconAnchor:
      [26, 45]

  });

}


// ======================================================
// DATA
// ======================================================

function formatDate(date) {

  if (!date) {

    return "";

  }


  const parsed =
    new Date(
      `${date}T12:00:00`
    );


  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {

    return date;

  }


  return parsed
    .toLocaleDateString(
      "pt-BR",
      {

        day:
          "2-digit",

        month:
          "long",

        year:
          "numeric"

      }
    );

}


// ======================================================
// FALLBACK DE IMAGEM
// ======================================================

function addImageFallback(
  image
) {

  image.onerror =
    function () {

      this.onerror =
        null;


      this.src =
        DEFAULT_IMAGE;

    };

}
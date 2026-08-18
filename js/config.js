/*
========================================================
❤️ MEMORIES - CONFIGURAÇÃO
========================================================

Este é o principal arquivo que você precisa editar para
criar sua própria versão.

Você NÃO precisa alterar letter.js ou map.js.

PASSOS:

1. Coloque suas fotos na pasta:
   assets/photos/

2. Opcionalmente coloque sua música em:
   assets/audio/

3. Altere os dados abaixo.

4. Adicione quantas memórias quiser.

Formato recomendado de data:
AAAA-MM-DD

Exemplo:
2026-08-17

========================================================
*/


// ------------------------------------------------------
// IMAGEM DE SEGURANÇA
// ------------------------------------------------------
// Aparece caso alguma foto não exista.

window.DEFAULT_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg"
         width="1000"
         height="700"
         viewBox="0 0 1000 700">

      <rect width="100%" height="100%" fill="#151218"/>

      <text
        x="50%"
        y="46%"
        text-anchor="middle"
        fill="#e63961"
        font-family="Arial"
        font-size="80">
        ♥
      </text>

      <text
        x="50%"
        y="58%"
        text-anchor="middle"
        fill="#ffffff"
        font-family="Arial"
        font-size="28">
        Coloque sua foto aqui
      </text>

    </svg>
  `);


// ------------------------------------------------------
// CONFIGURAÇÕES DO SITE
// ------------------------------------------------------

window.APP_CONFIG = {

  // ====================================================
  // ❤️ CASAL
  // ====================================================

  couple: {

    person1: "Alex",

    person2: "Sam",

    /*
      Data em que a história começou.

      Você também pode utilizar horário:

      2024-02-14T20:30:00
    */

    startDate: "2024-02-14T00:00:00"
  },


  // ====================================================
  // 🏠 PÁGINA PRINCIPAL
  // ====================================================

  home: {

    badge: "Nossa história",

    title: "Dois corações, uma história.",

    subtitle:
      "Uma pequena coleção de momentos que fizeram tudo valer a pena.",

    mapButtonText:
      "Explorar nossas memórias",

    counterTitle:
      "Nossa história começou há"
  },


  // ====================================================
  // 💌 CARTA
  // ====================================================

  letter: {

    title: "Uma carta para você",

    typewriterSpeed: 28,

    text: `
Existem pessoas que fazem os momentos mais simples se tornarem inesquecíveis.

Essa página é uma pequena forma de guardar algumas dessas lembranças e celebrar tudo que construímos juntos.

Cada foto, cada lugar e cada história representa um pedacinho da nossa caminhada.

E talvez a melhor parte seja saber que ainda existem muitos momentos esperando para acontecer. ❤️
    `.trim()
  },


  // ====================================================
  // 📸 GALERIA PRINCIPAL
  // ====================================================

  /*
    Coloque suas imagens dentro da pasta "assets/photos".

    Depois escreva o nome do arquivo abaixo.

    Você pode adicionar ou remover quantas quiser.
  */

  gallery: [

    {
      image: "assets/photos/demo-01.svg",
      caption: "Um momento especial"
    },

    {
      image: "assets/photos/demo-02.svg",
      caption: "Uma memória inesquecível"
    },

    {
      image: "assets/photos/demo-03.svg",
      caption: "Mais um capítulo da nossa história"
    },

    {
      image: "assets/photos/demo-04.svg",
      caption: "E muitos outros ainda virão"
    }

  ],


  // ====================================================
  // 🎵 MÚSICA
  // ====================================================

  music: {

    /*
      false = música desativada
      true  = música disponível
    */

    enabled: false,

    /*
      Coloque sua música dentro de:

      assets/audio/

      Exemplo:

      assets/assets/audio/nossa-musica.mp3
    */

    file: "assets/audio/music.mp3",

    /*
      Volume entre 0 e 1.
    */

    volume: 0.25
  },


  // ====================================================
  // 🗺️ MEMÓRIAS
  // ====================================================

  /*
    Para descobrir latitude e longitude:

    1. Abra o Google Maps.
    2. Clique com o botão direito no lugar.
    3. Clique nas coordenadas.
    4. Cole os números aqui.

    Não utilize suas coordenadas pessoais caso publique
    o projeto no GitHub.
  */

  memories: [

    {
      title: "Onde tudo começou",

      date: "2024-02-14",

      latitude: -23.5505,

      longitude: -46.6333,

      description:
        "Conte aqui como esse momento aconteceu e por que ele foi importante para vocês.",

      image: "assets/photos/demo-01.svg"
    },


    {
      title: "Nosso primeiro passeio",

      date: "2024-03-20",

      latitude: -23.5614,

      longitude: -46.6559,

      description:
        "Um daqueles dias que parecem simples, mas acabam se transformando em uma ótima lembrança.",

      image: "assets/photos/demo-02.svg"
    },


    {
      title: "Uma memória especial",

      date: "2024-06-12",

      latitude: -23.5489,

      longitude: -46.6388,

      description:
        "Você pode adicionar quantas memórias quiser seguindo exatamente este mesmo formato.",

      image: "assets/photos/demo-03.svg"
    },


    {
      title: "Próximo capítulo...",

      date: null,

      latitude: -23.5558,

      longitude: -46.6396,

      description:
        "Essa história ainda está sendo escrita. ❤️",

      image: "assets/photos/demo-04.svg",

      future: true
    }

  ],


  // ====================================================
  // ❤️ FINAL DA EXPERIÊNCIA
  // ====================================================

  final: {

    title:
      "E ainda é só o começo... ❤️",

    message: `
Obrigado por cada momento.

Por cada risada, cada aventura e cada memória.

Algumas histórias são especiais justamente porque continuam sendo escritas.

Que ainda existam muitos capítulos pela frente.
    `.trim(),

    image:
      "assets/photos/demo-final.svg"
  },


  // ====================================================
  // 🎨 TEMA
  // ====================================================

  theme: {

    primary:
      "#e63961",

    secondary:
      "#ff758f",

    background:
      "#09080b",

    surface:
      "#151218",

    text:
      "#f8f5f6",

    muted:
      "#aaa2a6"
  }

};
# ❤️ Memories

Uma experiência web interativa para transformar momentos especiais em uma história navegável, com contador, carta animada, galeria, música opcional e um mapa de memórias.

O projeto nasceu originalmente como uma homenagem pessoal e depois foi refatorado para se tornar um **template reutilizável**, mantendo a lógica separada dos dados pessoais.

## Todas as funcionalidades

- ⏱️ contador em tempo real desde uma data escolhida;
- 💌 carta com efeito de digitação;
- 📸 galeria de fotos com navegação;
- 🎵 música de fundo opcional;
- 🗺️ mapa interativo com Leaflet e OpenStreetMap;
- ❤️ marcadores em formato de coração;
- 📖 navegação entre memórias em formato de story;
- ✨ mensagem final personalizável;
- 📱 layout responsivo;
- 🎨 cores configuráveis.

## 🚀 Criando sua própria versão

### 1. Faça um Fork ou clone o projeto

```bash
git clone URL_DO_SEU_FORK
```

### 2. Abra o arquivo principal de configuração

```text
js/config.js
```

É nele que você pode alterar praticamente todo o conteúdo da página sem mexer na lógica do projeto.

### 3. Personalize

No `config.js`, você pode modificar:

- nomes;
- data inicial;
- título e subtítulo;
- carta;
- fotos;
- música;
- memórias;
- coordenadas do mapa;
- mensagem final;
- cores do tema.

Exemplo de memória:

```js
{
  title: "Nosso primeiro encontro",
  date: "2025-06-12",
  latitude: -23.5505,
  longitude: -46.6333,
  description: "Conte aqui o que tornou esse momento especial.",
  image: "assets/photos/encontro.jpg"
}
```

### 4. Adicione suas fotos

Coloque as imagens em:

```text
assets/photos/
```

Depois informe o caminho delas em `js/config.js`.

### 5. Música opcional

Coloque seu arquivo em:

```text
assets/audio/
```

E ative a opção em `js/config.js`:

```js
music: {
  enabled: true,
  file: "assets/audio/music.mp3",
  volume: 0.25
}
```

> Não publique músicas protegidas por direitos autorais sem autorização.

## 🗺️ Como adicionar um lugar

1. Abra o Google Maps.
2. Escolha o local desejado.
3. Copie a latitude e a longitude.
4. Adicione os valores à memória correspondente em `js/config.js`.

Se sua versão for pública, evite usar coordenadas de residências ou outros locais privados.

## ▶️ Executando

Como o projeto utiliza apenas HTML, CSS e JavaScript, não é necessário instalar Node.js, npm ou banco de dados.

Você pode abrir `index.html` diretamente no navegador. Para desenvolvimento, também pode usar uma extensão como **Live Server** no VS Code.

## 🌐 Publicando com GitHub Pages

No seu repositório:

1. abra **Settings**;
2. acesse **Pages**;
3. em **Build and deployment**, selecione **Deploy from a branch**;
4. escolha a branch `main` e a pasta `/ (root)`;
5. salve.

O GitHub fornecerá uma URL pública para sua página.

## 📁 Estrutura

```text
memories/
├── index.html
├── map.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── letter.js
│   └── map.js
└── assets/
    ├── photos/
    └── audio/
```

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript
- Leaflet
- OpenStreetMap
- Leaflet MarkerCluster

## 🔒 Privacidade

A versão pública utiliza apenas conteúdo demonstrativo. Ao criar sua própria versão, revise o projeto antes de publicá-lo e evite incluir informações pessoais, coordenadas privadas, credenciais ou arquivos que você não deseja tornar públicos.

---

Feito para transformar memórias em uma experiência interativa. ❤️

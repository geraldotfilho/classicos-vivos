/* Service worker dos Clássicos Vivos — GERADO por tools/build-sw.mjs. Não editar sw.js à mão:
   edite tools/sw.template.js e rode `npm run build:sw`.
   Estratégia:
   - Na instalação, baixa só o núcleo leve (HTMLs, estilos, fontes, scripts) e reaproveita por hash
     tudo o que não mudou do cache anterior (sem baixar ~24 MB de imagens a cada atualização).
   - As ilustrações não presentes em cache são aquecidas em segundo plano em lotes pequenos após ativar.
   - Páginas HTML e vozes.js: rede primeiro com limite de 2,5 s (se a rede estiver lenta, abre do cache na hora).
   - Narração gravada (*.mp3 e *.json): rede primeiro com limite de 2,5 s, cache próprio (cv-narracao).
   - Demais arquivos: cache primeiro (abre instantâneo no tablet). */
const CACHE = 'classicos-vivos-8830d8c0d8ba';
const CACHE_AUDIO = 'cv-narracao';
const CACHE_META = 'cv-meta';
const FILES = [
    [
        "./assets/icones/icone-192.png",
        "bb91b0bf"
    ],
    [
        "./assets/css/desafios.css",
        "86bb8b96"
    ],
    [
        "./assets/css/fonts.css",
        "d7f38959"
    ],
    [
        "./assets/css/icons.css",
        "9e8de732"
    ],
    [
        "./assets/css/livro.css",
        "adc4c404"
    ],
    [
        "./assets/css/tailwind.css",
        "3cc2f2b2"
    ],
    [
        "./assets/fonts/fredoka-latin-400-normal.woff2",
        "1f8879f4"
    ],
    [
        "./assets/fonts/fredoka-latin-500-normal.woff2",
        "191b1640"
    ],
    [
        "./assets/fonts/fredoka-latin-600-normal.woff2",
        "22fb9018"
    ],
    [
        "./assets/fonts/fredoka-latin-700-normal.woff2",
        "de9b5e7f"
    ],
    [
        "./assets/fonts/nunito-latin-400-normal.woff2",
        "923963e0"
    ],
    [
        "./assets/fonts/nunito-latin-600-normal.woff2",
        "72f4dad9"
    ],
    [
        "./assets/fonts/nunito-latin-700-normal.woff2",
        "391d904f"
    ],
    [
        "./assets/fonts/nunito-latin-800-normal.woff2",
        "5b6eb685"
    ],
    [
        "./assets/fonts/nunito-latin-900-normal.woff2",
        "0cba5356"
    ],
    [
        "./assets/icones/bandeiras/br.svg",
        "98fb53db"
    ],
    [
        "./assets/icones/bandeiras/es.svg",
        "9dfeedd4"
    ],
    [
        "./assets/icones/bandeiras/fr.svg",
        "4f0040f0"
    ],
    [
        "./assets/icones/bandeiras/gb.svg",
        "e33cb4ca"
    ],
    [
        "./assets/js/acervo.js",
        "ef36c0bc"
    ],
    [
        "./assets/js/colaboracao.js",
        "7a6f62d9"
    ],
    [
        "./assets/js/contador.js",
        "a38fb806"
    ],
    [
        "./assets/js/desafios.js",
        "04bfa50c"
    ],
    [
        "./assets/js/i18n-site.js",
        "be2d2608"
    ],
    [
        "./assets/js/livro.js",
        "9a4bfcf9"
    ],
    [
        "./assets/js/offline-manager.js",
        "031041b9"
    ],
    [
        "./assets/js/texto.js",
        "22c51c30"
    ],
    [
        "./dom-quixote/desafios/parte-1.js",
        "9b5d7fba"
    ],
    [
        "./dom-quixote/desafios/parte-2.js",
        "4b79e06d"
    ],
    [
        "./dom-quixote/desafios/parte-3.js",
        "89220547"
    ],
    [
        "./dom-quixote/desafios/parte-4.js",
        "ad76ef8c"
    ],
    [
        "./dom-quixote/desafios/parte-5.js",
        "231df85d"
    ],
    [
        "./dom-quixote/desafios/parte-6.js",
        "b0084908"
    ],
    [
        "./dom-quixote/desafios/parte-7.js",
        "42b1cfee"
    ],
    [
        "./dom-quixote/desafios/parte-8.js",
        "f5e21c7e"
    ],
    [
        "./dom-quixote/imagens/camadas/p4-estalajadeiro-acenando.webp",
        "628b96b4"
    ],
    [
        "./dom-quixote/imagens/camadas/p4-estalajadeiro-sopa.webp",
        "da0aa5ff"
    ],
    [
        "./dom-quixote/imagens/camadas/p4-notas-musicais.webp",
        "ad7dcef1"
    ],
    [
        "./dom-quixote/imagens/camadas/p4-pastor-parado.webp",
        "a512c710"
    ],
    [
        "./dom-quixote/imagens/camadas/p4-pastor-tocando.webp",
        "d8842f8d"
    ],
    [
        "./dom-quixote/imagens/camadas/p4-porquinhos.webp",
        "6ebcb4d2"
    ],
    [
        "./dom-quixote/imagens/camadas/p6-nuvem-ilha.webp",
        "b4e0df26"
    ],
    [
        "./dom-quixote/imagens/camadas/p7-pas-moinho.webp",
        "bcabd938"
    ],
    [
        "./dom-quixote/imagens/objetos/armadura-peitoral.svg",
        "e8a86c17"
    ],
    [
        "./dom-quixote/imagens/objetos/bacia-elmo.svg",
        "fd88e9fc"
    ],
    [
        "./dom-quixote/imagens/objetos/cenoura.svg",
        "366b1965"
    ],
    [
        "./dom-quixote/imagens/objetos/escova.svg",
        "7fc4af11"
    ],
    [
        "./dom-quixote/imagens/objetos/escudo-panelao.svg",
        "27a539ef"
    ],
    [
        "./dom-quixote/imagens/objetos/lanca-bandeirola.svg",
        "9a0536ea"
    ],
    [
        "./dom-quixote/imagens/objetos/livro-castelos.svg",
        "3ad5be96"
    ],
    [
        "./dom-quixote/imagens/objetos/livro-cavaleiros.svg",
        "81656112"
    ],
    [
        "./dom-quixote/imagens/objetos/livro-dragoes.svg",
        "e3b154af"
    ],
    [
        "./dom-quixote/imagens/objetos/maca.svg",
        "1d4387bd"
    ],
    [
        "./dom-quixote/imagens/objetos/sopa-banquete.svg",
        "b4fbaad2"
    ],
    [
        "./dom-quixote/imagens/objetos/trombeta-flauta.svg",
        "2b4048be"
    ],
    [
        "./dom-quixote/imagens/objetos/vento-sopro.svg",
        "d0b4e11a"
    ],
    [
        "./dom-quixote/imagens/p0-imag.webp",
        "cc119d57"
    ],
    [
        "./dom-quixote/imagens/p0-real.webp",
        "bb36015d"
    ],
    [
        "./dom-quixote/imagens/p1-imag.webp",
        "102d643f"
    ],
    [
        "./dom-quixote/imagens/p1-real-livro-castelos.webp",
        "2dbdd3ac"
    ],
    [
        "./dom-quixote/imagens/p1-real-livro-cavaleiros.webp",
        "5b6dd117"
    ],
    [
        "./dom-quixote/imagens/p1-real-livro-dragoes.webp",
        "4f7548bc"
    ],
    [
        "./dom-quixote/imagens/p1-real.webp",
        "9e20aae9"
    ],
    [
        "./dom-quixote/imagens/p2-imag.webp",
        "f5620c4f"
    ],
    [
        "./dom-quixote/imagens/p2-real-stage-0.webp",
        "49d029b7"
    ],
    [
        "./dom-quixote/imagens/p2-real-stage-1.webp",
        "b0ac0900"
    ],
    [
        "./dom-quixote/imagens/p2-real-stage-2.webp",
        "a2f5fc55"
    ],
    [
        "./dom-quixote/imagens/p2-real-stage-3.webp",
        "c5a819a7"
    ],
    [
        "./dom-quixote/imagens/p2-real-stage-4.webp",
        "355573f6"
    ],
    [
        "./dom-quixote/imagens/p3-imag.webp",
        "6597b1bb"
    ],
    [
        "./dom-quixote/imagens/p3-real-stage-1.webp",
        "67d83e6f"
    ],
    [
        "./dom-quixote/imagens/p3-real-stage-2.webp",
        "ccaa9cae"
    ],
    [
        "./dom-quixote/imagens/p3-real-stage-3.webp",
        "b9ff1c9e"
    ],
    [
        "./dom-quixote/imagens/p3-real.webp",
        "ab3dc097"
    ],
    [
        "./dom-quixote/imagens/p4-imag.webp",
        "c351983a"
    ],
    [
        "./dom-quixote/imagens/p4-real-fundo.webp",
        "52d27a70"
    ],
    [
        "./dom-quixote/imagens/p5-imag.webp",
        "2b8ae1fe"
    ],
    [
        "./dom-quixote/imagens/p5-real.webp",
        "d7f306fd"
    ],
    [
        "./dom-quixote/imagens/p6-imag.webp",
        "efeb2bbc"
    ],
    [
        "./dom-quixote/imagens/p6-real.webp",
        "1568934c"
    ],
    [
        "./dom-quixote/imagens/p7-imag.webp",
        "44bea9bc"
    ],
    [
        "./dom-quixote/imagens/p7-real-sem-pas.webp",
        "80187600"
    ],
    [
        "./dom-quixote/imagens/parte-2/camadas/p3-bolotas.webp",
        "6a84eb18"
    ],
    [
        "./dom-quixote/imagens/parte-2/camadas/p3-leite.webp",
        "08f89712"
    ],
    [
        "./dom-quixote/imagens/parte-2/camadas/p3-queijo.webp",
        "96f0eb4b"
    ],
    [
        "./dom-quixote/imagens/parte-2/camadas/p4-poeira-direita.webp",
        "a18bff19"
    ],
    [
        "./dom-quixote/imagens/parte-2/camadas/p4-poeira-esquerda.webp",
        "1fa731ae"
    ],
    [
        "./dom-quixote/imagens/parte-2/camadas/p6-balao-historia.webp",
        "5897a783"
    ],
    [
        "./dom-quixote/imagens/parte-2/camadas/p6-cabra.webp",
        "ccccb179"
    ],
    [
        "./dom-quixote/imagens/parte-2/camadas/p7-martelos.webp",
        "d788a6ea"
    ],
    [
        "./dom-quixote/imagens/parte-2/p0-imag.webp",
        "4d2f0ace"
    ],
    [
        "./dom-quixote/imagens/parte-2/p0-real.webp",
        "ed8e42cf"
    ],
    [
        "./dom-quixote/imagens/parte-2/p1-imag.webp",
        "3fac8cff"
    ],
    [
        "./dom-quixote/imagens/parte-2/p1-real.webp",
        "79ee6064"
    ],
    [
        "./dom-quixote/imagens/parte-2/p2-imag.webp",
        "3ec60cef"
    ],
    [
        "./dom-quixote/imagens/parte-2/p2-real.webp",
        "5e10cf5d"
    ],
    [
        "./dom-quixote/imagens/parte-2/p3-imag.webp",
        "613e124c"
    ],
    [
        "./dom-quixote/imagens/parte-2/p3-real.webp",
        "23cd7d89"
    ],
    [
        "./dom-quixote/imagens/parte-2/p4-imag.webp",
        "990eb0f6"
    ],
    [
        "./dom-quixote/imagens/parte-2/p4-real.webp",
        "ce883048"
    ],
    [
        "./dom-quixote/imagens/parte-2/p5-imag.webp",
        "529d48b3"
    ],
    [
        "./dom-quixote/imagens/parte-2/p5-real.webp",
        "b566a828"
    ],
    [
        "./dom-quixote/imagens/parte-2/p6-imag.webp",
        "4cbb5d3a"
    ],
    [
        "./dom-quixote/imagens/parte-2/p6-real.webp",
        "b8377846"
    ],
    [
        "./dom-quixote/imagens/parte-2/p7-imag.webp",
        "ca466d3e"
    ],
    [
        "./dom-quixote/imagens/parte-2/p7-real.webp",
        "a355c3ca"
    ],
    [
        "./dom-quixote/imagens/parte-2/p8-imag.webp",
        "7bdcc322"
    ],
    [
        "./dom-quixote/imagens/parte-2/p8-real.webp",
        "aa9fd09e"
    ],
    [
        "./dom-quixote/imagens/parte-3/camadas/p1-caderno.webp",
        "03012d6f"
    ],
    [
        "./dom-quixote/imagens/parte-3/camadas/p1-moedas.webp",
        "164e0b2f"
    ],
    [
        "./dom-quixote/imagens/parte-3/camadas/p2-quixote-camisolao.webp",
        "d55371a7"
    ],
    [
        "./dom-quixote/imagens/parte-3/camadas/p6-odre.webp",
        "b361cf93"
    ],
    [
        "./dom-quixote/imagens/parte-3/camadas/p6-respingo.webp",
        "89e814d7"
    ],
    [
        "./dom-quixote/imagens/parte-3/p0-imag.webp",
        "51d98e14"
    ],
    [
        "./dom-quixote/imagens/parte-3/p0-real.webp",
        "3e9663ad"
    ],
    [
        "./dom-quixote/imagens/parte-3/p1-imag.webp",
        "d0b3eb0a"
    ],
    [
        "./dom-quixote/imagens/parte-3/p1-real.webp",
        "c4e71e14"
    ],
    [
        "./dom-quixote/imagens/parte-3/p2-imag.webp",
        "2b8df6d4"
    ],
    [
        "./dom-quixote/imagens/parte-3/p2-real.webp",
        "396c8814"
    ],
    [
        "./dom-quixote/imagens/parte-3/p3-imag.webp",
        "0d56b413"
    ],
    [
        "./dom-quixote/imagens/parte-3/p3-real-lembrou.webp",
        "a88b4257"
    ],
    [
        "./dom-quixote/imagens/parte-3/p3-real.webp",
        "b60085cb"
    ],
    [
        "./dom-quixote/imagens/parte-3/p4-imag.webp",
        "ef552b6c"
    ],
    [
        "./dom-quixote/imagens/parte-3/p4-real.webp",
        "dd0ff122"
    ],
    [
        "./dom-quixote/imagens/parte-3/p5-imag.webp",
        "b4f7e3b3"
    ],
    [
        "./dom-quixote/imagens/parte-3/p5-real.webp",
        "fcc1a638"
    ],
    [
        "./dom-quixote/imagens/parte-3/p6-imag.webp",
        "e1bd3f7a"
    ],
    [
        "./dom-quixote/imagens/parte-3/p6-real.webp",
        "3987c2a0"
    ],
    [
        "./dom-quixote/imagens/parte-3/p7-imag.webp",
        "8d4c0211"
    ],
    [
        "./dom-quixote/imagens/parte-3/p7-real.webp",
        "884830a6"
    ],
    [
        "./dom-quixote/imagens/parte-4/camadas/p5-agua.webp",
        "ca325ec6"
    ],
    [
        "./dom-quixote/imagens/parte-4/camadas/p5-pao.webp",
        "fd97afe2"
    ],
    [
        "./dom-quixote/imagens/parte-4/camadas/p5-queijo.webp",
        "49c2daed"
    ],
    [
        "./dom-quixote/imagens/parte-4/p0-imag.webp",
        "724579e1"
    ],
    [
        "./dom-quixote/imagens/parte-4/p0-real.webp",
        "2fb4cf4e"
    ],
    [
        "./dom-quixote/imagens/parte-4/p1-imag.webp",
        "91b1e62f"
    ],
    [
        "./dom-quixote/imagens/parte-4/p1-real.webp",
        "dddbb20a"
    ],
    [
        "./dom-quixote/imagens/parte-4/p10-imag.webp",
        "b16fc798"
    ],
    [
        "./dom-quixote/imagens/parte-4/p10-real.webp",
        "eb447ffe"
    ],
    [
        "./dom-quixote/imagens/parte-4/p11-imag.webp",
        "a0ed0fb6"
    ],
    [
        "./dom-quixote/imagens/parte-4/p11-real.webp",
        "0e879747"
    ],
    [
        "./dom-quixote/imagens/parte-4/p2-imag.webp",
        "055b1dc7"
    ],
    [
        "./dom-quixote/imagens/parte-4/p2-real.webp",
        "b9fce1e2"
    ],
    [
        "./dom-quixote/imagens/parte-4/p3-imag.webp",
        "74c41a65"
    ],
    [
        "./dom-quixote/imagens/parte-4/p3-real.webp",
        "e9db7f2b"
    ],
    [
        "./dom-quixote/imagens/parte-4/p4-imag.webp",
        "3f2dba28"
    ],
    [
        "./dom-quixote/imagens/parte-4/p4-real.webp",
        "4edfa73a"
    ],
    [
        "./dom-quixote/imagens/parte-4/p5-imag.webp",
        "345eb34e"
    ],
    [
        "./dom-quixote/imagens/parte-4/p5-real.webp",
        "3c3d1897"
    ],
    [
        "./dom-quixote/imagens/parte-4/p6-real.webp",
        "4f7aa95d"
    ],
    [
        "./dom-quixote/imagens/parte-4/p7-real.webp",
        "85287828"
    ],
    [
        "./dom-quixote/imagens/parte-4/p8-imag.webp",
        "ee258dee"
    ],
    [
        "./dom-quixote/imagens/parte-4/p8-real.webp",
        "7aa7beb8"
    ],
    [
        "./dom-quixote/imagens/parte-4/p9-real.webp",
        "79b40e61"
    ],
    [
        "./dom-quixote/imagens/parte-5/camadas/p6-elmo.webp",
        "08e03f59"
    ],
    [
        "./dom-quixote/imagens/parte-5/camadas/p6-narigao.webp",
        "11832151"
    ],
    [
        "./dom-quixote/imagens/parte-5/p0-imag.webp",
        "81bccfaf"
    ],
    [
        "./dom-quixote/imagens/parte-5/p0-real.webp",
        "4b28b360"
    ],
    [
        "./dom-quixote/imagens/parte-5/p1-real.webp",
        "f67595f7"
    ],
    [
        "./dom-quixote/imagens/parte-5/p2-imag.webp",
        "27b2c433"
    ],
    [
        "./dom-quixote/imagens/parte-5/p2-real.webp",
        "e7e467a8"
    ],
    [
        "./dom-quixote/imagens/parte-5/p3-real.webp",
        "783943f0"
    ],
    [
        "./dom-quixote/imagens/parte-5/p4-real.webp",
        "0cf1a9cd"
    ],
    [
        "./dom-quixote/imagens/parte-5/p5-imag.webp",
        "935ebe86"
    ],
    [
        "./dom-quixote/imagens/parte-5/p5-real.webp",
        "49d1e665"
    ],
    [
        "./dom-quixote/imagens/parte-5/p6-imag.webp",
        "da00f4a6"
    ],
    [
        "./dom-quixote/imagens/parte-5/p6-real.webp",
        "e9ae6c2e"
    ],
    [
        "./dom-quixote/imagens/parte-5/p7-real.webp",
        "5702fb60"
    ],
    [
        "./dom-quixote/imagens/parte-5/p8-imag.webp",
        "86adbb9a"
    ],
    [
        "./dom-quixote/imagens/parte-5/p8-real.webp",
        "413e1eee"
    ],
    [
        "./dom-quixote/imagens/parte-5/p9-imag.webp",
        "07bcb956"
    ],
    [
        "./dom-quixote/imagens/parte-5/p9-real-stage-1.webp",
        "a85c54fa"
    ],
    [
        "./dom-quixote/imagens/parte-5/p9-real-stage-2.webp",
        "4ce4f9cc"
    ],
    [
        "./dom-quixote/imagens/parte-5/p9-real-stage-3.webp",
        "f2c3cb6a"
    ],
    [
        "./dom-quixote/imagens/parte-5/p9-real-stage-4.webp",
        "b2268241"
    ],
    [
        "./dom-quixote/imagens/parte-5/p9-real.webp",
        "ddd139d8"
    ],
    [
        "./dom-quixote/imagens/parte-6/camadas/p5-cavalo.webp",
        "0322750e"
    ],
    [
        "./dom-quixote/imagens/parte-6/camadas/p5-rei.webp",
        "62eae0c0"
    ],
    [
        "./dom-quixote/imagens/parte-6/camadas/p5-torre.webp",
        "789ac965"
    ],
    [
        "./dom-quixote/imagens/parte-6/camadas/p9-calor-tocha.webp",
        "9f4b6226"
    ],
    [
        "./dom-quixote/imagens/parte-6/camadas/p9-clavilenho.webp",
        "310b4a74"
    ],
    [
        "./dom-quixote/imagens/parte-6/camadas/p9-vento-fole.webp",
        "ea9d9258"
    ],
    [
        "./dom-quixote/imagens/parte-6/p0-imag.webp",
        "c847df08"
    ],
    [
        "./dom-quixote/imagens/parte-6/p0-real.webp",
        "76a4b1ac"
    ],
    [
        "./dom-quixote/imagens/parte-6/p1-real.webp",
        "0b70116b"
    ],
    [
        "./dom-quixote/imagens/parte-6/p2-real.webp",
        "1f2b3f52"
    ],
    [
        "./dom-quixote/imagens/parte-6/p3-imag.webp",
        "129a7d56"
    ],
    [
        "./dom-quixote/imagens/parte-6/p3-real.webp",
        "f136c5f0"
    ],
    [
        "./dom-quixote/imagens/parte-6/p4-real.webp",
        "fb729315"
    ],
    [
        "./dom-quixote/imagens/parte-6/p5-imag.webp",
        "0bef9c53"
    ],
    [
        "./dom-quixote/imagens/parte-6/p5-real.webp",
        "0e5d982f"
    ],
    [
        "./dom-quixote/imagens/parte-6/p6-imag.webp",
        "86c4ed5e"
    ],
    [
        "./dom-quixote/imagens/parte-6/p6-real.webp",
        "40317d48"
    ],
    [
        "./dom-quixote/imagens/parte-6/p7-imag.webp",
        "5009282e"
    ],
    [
        "./dom-quixote/imagens/parte-6/p7-real.webp",
        "40cd3581"
    ],
    [
        "./dom-quixote/imagens/parte-6/p8-imag.webp",
        "7fd6aded"
    ],
    [
        "./dom-quixote/imagens/parte-6/p8-real.webp",
        "43ecc533"
    ],
    [
        "./dom-quixote/imagens/parte-6/p9-imag.webp",
        "4319a3c3"
    ],
    [
        "./dom-quixote/imagens/parte-6/p9-real.webp",
        "a8f62b3e"
    ],
    [
        "./dom-quixote/imagens/parte-7/camadas/p2-chapeuzinho.webp",
        "5bf35219"
    ],
    [
        "./dom-quixote/imagens/parte-7/camadas/p4-bengala-quebrada.webp",
        "e20e234d"
    ],
    [
        "./dom-quixote/imagens/parte-7/p0-imag.webp",
        "a8ce9958"
    ],
    [
        "./dom-quixote/imagens/parte-7/p0-real.webp",
        "74bb531d"
    ],
    [
        "./dom-quixote/imagens/parte-7/p1-imag.webp",
        "208ff500"
    ],
    [
        "./dom-quixote/imagens/parte-7/p1-real.webp",
        "4a17a1d5"
    ],
    [
        "./dom-quixote/imagens/parte-7/p10-imag.webp",
        "2e15e97e"
    ],
    [
        "./dom-quixote/imagens/parte-7/p10-real-chaves.webp",
        "82ca99bd"
    ],
    [
        "./dom-quixote/imagens/parte-7/p10-real-palacio.webp",
        "284138d5"
    ],
    [
        "./dom-quixote/imagens/parte-7/p10-real-portao.webp",
        "6d692773"
    ],
    [
        "./dom-quixote/imagens/parte-7/p10-real.webp",
        "b2b56676"
    ],
    [
        "./dom-quixote/imagens/parte-7/p2-imag.webp",
        "51989d0e"
    ],
    [
        "./dom-quixote/imagens/parte-7/p2-real.webp",
        "16fc0f19"
    ],
    [
        "./dom-quixote/imagens/parte-7/p3-real.webp",
        "58b42155"
    ],
    [
        "./dom-quixote/imagens/parte-7/p4-imag.webp",
        "223db3ff"
    ],
    [
        "./dom-quixote/imagens/parte-7/p4-real-fim.webp",
        "e748cce3"
    ],
    [
        "./dom-quixote/imagens/parte-7/p4-real.webp",
        "e5cad59b"
    ],
    [
        "./dom-quixote/imagens/parte-7/p5-real.webp",
        "aee27b06"
    ],
    [
        "./dom-quixote/imagens/parte-7/p6-real.webp",
        "9bc9b177"
    ],
    [
        "./dom-quixote/imagens/parte-7/p7-imag.webp",
        "2b07de43"
    ],
    [
        "./dom-quixote/imagens/parte-7/p7-real.webp",
        "f291846b"
    ],
    [
        "./dom-quixote/imagens/parte-7/p8-real.webp",
        "bf4a201a"
    ],
    [
        "./dom-quixote/imagens/parte-7/p9-real.webp",
        "87d4097d"
    ],
    [
        "./dom-quixote/imagens/parte-8/p0-imag.webp",
        "71f966ad"
    ],
    [
        "./dom-quixote/imagens/parte-8/p0-real.webp",
        "d8710228"
    ],
    [
        "./dom-quixote/imagens/parte-8/p1-imag.webp",
        "e73c2a39"
    ],
    [
        "./dom-quixote/imagens/parte-8/p1-real.webp",
        "cc7a9a08"
    ],
    [
        "./dom-quixote/imagens/parte-8/p10-imag.webp",
        "491b37cd"
    ],
    [
        "./dom-quixote/imagens/parte-8/p10-real.webp",
        "b143f864"
    ],
    [
        "./dom-quixote/imagens/parte-8/p2-imag.webp",
        "ed9e682c"
    ],
    [
        "./dom-quixote/imagens/parte-8/p2-real.webp",
        "7df01367"
    ],
    [
        "./dom-quixote/imagens/parte-8/p3-real.webp",
        "eb09e03b"
    ],
    [
        "./dom-quixote/imagens/parte-8/p4-imag.webp",
        "aea95c1c"
    ],
    [
        "./dom-quixote/imagens/parte-8/p4-real.webp",
        "50e1aa54"
    ],
    [
        "./dom-quixote/imagens/parte-8/p5-imag.webp",
        "268af3c8"
    ],
    [
        "./dom-quixote/imagens/parte-8/p5-real.webp",
        "2966d425"
    ],
    [
        "./dom-quixote/imagens/parte-8/p6-imag.webp",
        "55318d12"
    ],
    [
        "./dom-quixote/imagens/parte-8/p6-real.webp",
        "00232347"
    ],
    [
        "./dom-quixote/imagens/parte-8/p7-imag.webp",
        "4fa19681"
    ],
    [
        "./dom-quixote/imagens/parte-8/p7-real.webp",
        "ae56d80a"
    ],
    [
        "./dom-quixote/imagens/parte-8/p8-imag.webp",
        "10019337"
    ],
    [
        "./dom-quixote/imagens/parte-8/p8-real.webp",
        "49a9c642"
    ],
    [
        "./dom-quixote/imagens/parte-8/p9-real.webp",
        "9d021897"
    ],
    [
        "./dom-quixote/parte-1.html",
        "c02bd04c"
    ],
    [
        "./dom-quixote/parte-2.html",
        "fc9a6002"
    ],
    [
        "./dom-quixote/parte-3.html",
        "f8b85101"
    ],
    [
        "./dom-quixote/parte-4.html",
        "22e74092"
    ],
    [
        "./dom-quixote/parte-5.html",
        "49dfed17"
    ],
    [
        "./dom-quixote/parte-6.html",
        "137e36d8"
    ],
    [
        "./dom-quixote/parte-7.html",
        "f2f04be8"
    ],
    [
        "./dom-quixote/parte-8.html",
        "4228154b"
    ],
    [
        "./dom-quixote/traducoes/parte-1.en.js",
        "bd530027"
    ],
    [
        "./dom-quixote/traducoes/parte-1.es.js",
        "dd9be3cb"
    ],
    [
        "./dom-quixote/traducoes/parte-1.fr.js",
        "4a89cf98"
    ],
    [
        "./dom-quixote/traducoes/parte-2.en.js",
        "8a2af6e8"
    ],
    [
        "./dom-quixote/traducoes/parte-2.es.js",
        "4923bc17"
    ],
    [
        "./dom-quixote/traducoes/parte-2.fr.js",
        "6146171c"
    ],
    [
        "./dom-quixote/traducoes/parte-3.en.js",
        "3d75cebd"
    ],
    [
        "./dom-quixote/traducoes/parte-3.es.js",
        "328db54f"
    ],
    [
        "./dom-quixote/traducoes/parte-3.fr.js",
        "1318bf15"
    ],
    [
        "./dom-quixote/traducoes/parte-4.en.js",
        "af08ca9e"
    ],
    [
        "./dom-quixote/traducoes/parte-4.es.js",
        "d548edc7"
    ],
    [
        "./dom-quixote/traducoes/parte-4.fr.js",
        "d545812a"
    ],
    [
        "./dom-quixote/traducoes/parte-5.en.js",
        "ccfb523f"
    ],
    [
        "./dom-quixote/traducoes/parte-5.es.js",
        "925a78ed"
    ],
    [
        "./dom-quixote/traducoes/parte-5.fr.js",
        "f3e05660"
    ],
    [
        "./dom-quixote/traducoes/parte-6.en.js",
        "6044571a"
    ],
    [
        "./dom-quixote/traducoes/parte-6.es.js",
        "8e638a96"
    ],
    [
        "./dom-quixote/traducoes/parte-6.fr.js",
        "4b498ce6"
    ],
    [
        "./dom-quixote/traducoes/parte-7.en.js",
        "8a39a80f"
    ],
    [
        "./dom-quixote/traducoes/parte-7.es.js",
        "22dedee5"
    ],
    [
        "./dom-quixote/traducoes/parte-7.fr.js",
        "0727a83b"
    ],
    [
        "./dom-quixote/traducoes/parte-8.en.js",
        "3eeb03c5"
    ],
    [
        "./dom-quixote/traducoes/parte-8.es.js",
        "c9a868bb"
    ],
    [
        "./dom-quixote/traducoes/parte-8.fr.js",
        "0da75080"
    ],
    [
        "./index.html",
        "ef6ab893"
    ],
    [
        "./manifest.webmanifest",
        "0a3da84b"
    ],
    [
        "./robin-hood/imagens/parte-1/camadas/p0-passarinhos.webp",
        "41c33a3e"
    ],
    [
        "./robin-hood/imagens/parte-1/camadas/p1-pergaminho.webp",
        "b0299186"
    ],
    [
        "./robin-hood/imagens/parte-1/camadas/p11-fumaca-pao.webp",
        "409295c6"
    ],
    [
        "./robin-hood/imagens/parte-1/camadas/p11-lanterna.webp",
        "39ae302d"
    ],
    [
        "./robin-hood/imagens/parte-1/camadas/p2-roda.webp",
        "2ed60a47"
    ],
    [
        "./robin-hood/imagens/parte-1/camadas/p5-libelula.webp",
        "1dbc9702"
    ],
    [
        "./robin-hood/imagens/parte-1/camadas/p5-samambaia.webp",
        "78691a05"
    ],
    [
        "./robin-hood/imagens/parte-1/camadas/p8-borboleta.webp",
        "34771d91"
    ],
    [
        "./robin-hood/imagens/parte-1/p0-real.webp",
        "86b8f903"
    ],
    [
        "./robin-hood/imagens/parte-1/p1-real.webp",
        "53ea5194"
    ],
    [
        "./robin-hood/imagens/parte-1/p10-real.webp",
        "a939c42f"
    ],
    [
        "./robin-hood/imagens/parte-1/p11-real.webp",
        "36e76db7"
    ],
    [
        "./robin-hood/imagens/parte-1/p2-real.webp",
        "af3ec36b"
    ],
    [
        "./robin-hood/imagens/parte-1/p3-real.webp",
        "4b660514"
    ],
    [
        "./robin-hood/imagens/parte-1/p4-real.webp",
        "282eb247"
    ],
    [
        "./robin-hood/imagens/parte-1/p4-stage-1.webp",
        "e8d254dc"
    ],
    [
        "./robin-hood/imagens/parte-1/p4-stage-2.webp",
        "53360f70"
    ],
    [
        "./robin-hood/imagens/parte-1/p4-stage-3.webp",
        "a564af5f"
    ],
    [
        "./robin-hood/imagens/parte-1/p5-real.webp",
        "0bc6aedc"
    ],
    [
        "./robin-hood/imagens/parte-1/p6-real.webp",
        "db982ca2"
    ],
    [
        "./robin-hood/imagens/parte-1/p6-stage-1.webp",
        "c6cb42d9"
    ],
    [
        "./robin-hood/imagens/parte-1/p6-stage-2.webp",
        "83c9d2bd"
    ],
    [
        "./robin-hood/imagens/parte-1/p6-stage-3.webp",
        "77783cb2"
    ],
    [
        "./robin-hood/imagens/parte-1/p6-stage-4.webp",
        "97432e2f"
    ],
    [
        "./robin-hood/imagens/parte-1/p7-real.webp",
        "4c69b189"
    ],
    [
        "./robin-hood/imagens/parte-1/p8-real.webp",
        "4a4d5ea4"
    ],
    [
        "./robin-hood/imagens/parte-1/p9-real.webp",
        "b079f9da"
    ],
    [
        "./robin-hood/imagens/parte-1/p9-stage-1.webp",
        "43a17a6c"
    ],
    [
        "./robin-hood/imagens/parte-1/p9-stage-2.webp",
        "ae3dafe9"
    ],
    [
        "./robin-hood/imagens/parte-1/p9-stage-3.webp",
        "e230503c"
    ],
    [
        "./robin-hood/imagens/parte-2/camadas/p10-lenco.webp",
        "31307d11"
    ],
    [
        "./robin-hood/imagens/parte-2/camadas/p4-flamula.webp",
        "9c726a68"
    ],
    [
        "./robin-hood/imagens/parte-2/p0-real.webp",
        "472d943c"
    ],
    [
        "./robin-hood/imagens/parte-2/p1-real.webp",
        "f866529a"
    ],
    [
        "./robin-hood/imagens/parte-2/p10-real.webp",
        "e6a53f59"
    ],
    [
        "./robin-hood/imagens/parte-2/p11-real.webp",
        "bec2056d"
    ],
    [
        "./robin-hood/imagens/parte-2/p11-stage-1.webp",
        "d2856059"
    ],
    [
        "./robin-hood/imagens/parte-2/p11-stage-2.webp",
        "84491e64"
    ],
    [
        "./robin-hood/imagens/parte-2/p11-stage-3.webp",
        "06104207"
    ],
    [
        "./robin-hood/imagens/parte-2/p12-real.webp",
        "8f42ee87"
    ],
    [
        "./robin-hood/imagens/parte-2/p13-real.webp",
        "e033c0c7"
    ],
    [
        "./robin-hood/imagens/parte-2/p2-real.webp",
        "c290dc2e"
    ],
    [
        "./robin-hood/imagens/parte-2/p3-real.webp",
        "aec5c0fd"
    ],
    [
        "./robin-hood/imagens/parte-2/p3-stage-1.webp",
        "67360ed2"
    ],
    [
        "./robin-hood/imagens/parte-2/p3-stage-2.webp",
        "77e3deac"
    ],
    [
        "./robin-hood/imagens/parte-2/p3-stage-3.webp",
        "30bcfefa"
    ],
    [
        "./robin-hood/imagens/parte-2/p4-real.webp",
        "24cae2e0"
    ],
    [
        "./robin-hood/imagens/parte-2/p5-real.webp",
        "fa875623"
    ],
    [
        "./robin-hood/imagens/parte-2/p6-real.webp",
        "e02564ed"
    ],
    [
        "./robin-hood/imagens/parte-2/p7-real.webp",
        "5dc8945b"
    ],
    [
        "./robin-hood/imagens/parte-2/p8-real.webp",
        "983495d5"
    ],
    [
        "./robin-hood/imagens/parte-2/p9-real.webp",
        "649588e6"
    ],
    [
        "./robin-hood/imagens/parte-2/p9-stage-1.webp",
        "c33b8797"
    ],
    [
        "./robin-hood/imagens/parte-2/p9-stage-2.webp",
        "a0949bb0"
    ],
    [
        "./robin-hood/imagens/parte-2/p9-stage-3.webp",
        "05ec28ce"
    ],
    [
        "./robin-hood/parte-1.html",
        "629b1175"
    ],
    [
        "./robin-hood/parte-2.html",
        "2f11e6e7"
    ],
    [
        "./sobre.html",
        "275a85b5"
    ]
];

const ehImagemLivro = (url) => /\/imagens\//.test(url);

async function lerHashesAntigos() {
    try {
        const meta = await caches.open(CACHE_META);
        const res = await meta.match('hashes');
        return res ? await res.json() : {};
    } catch { return {}; }
}

async function salvarHashesAtuais() {
    try {
        const meta = await caches.open(CACHE_META);
        const mapa = {};
        for (const [url, h] of FILES) mapa[url] = h;
        await meta.put('hashes', new Response(JSON.stringify(mapa), {
            headers: { 'Content-Type': 'application/json' }
        }));
    } catch {}
}

async function abrirCachesAntigos() {
    const keys = await caches.keys();
    const antigos = keys.filter(k => k.startsWith('classicos-vivos-') && k !== CACHE);
    return Promise.all(antigos.map(k => caches.open(k)));
}

async function buscarEmCaches(cachesLista, url) {
    for (const c of cachesLista) {
        const hit = await c.match(url, { ignoreSearch: true });
        if (hit) return hit;
    }
    return null;
}

async function executarEmLotes(itens, concorrencia, fn) {
    let idx = 0;
    const workers = Array.from({ length: Math.min(concorrencia, itens.length) }, async () => {
        while (idx < itens.length) {
            const item = itens[idx++];
            await fn(item);
        }
    });
    await Promise.all(workers);
}

async function instalarNucleo() {
    const [newCache, oldHashes, oldCaches] = await Promise.all([
        caches.open(CACHE),
        lerHashesAntigos(),
        abrirCachesAntigos()
    ]);

    const core = [];
    const imagens = [];
    for (const entry of FILES) {
        if (ehImagemLivro(entry[0])) imagens.push(entry);
        else core.push(entry);
    }

    // 1. Copia imagens inalteradas direto do cache antigo (0 rede, ~ms)
    if (oldCaches.length) {
        await executarEmLotes(imagens, 16, async ([url, hash]) => {
            if (oldHashes[url] !== hash) return;
            const hit = await buscarEmCaches(oldCaches, url);
            if (hit) await newCache.put(url, hit.clone());
        });
    }

    // 2. Instala o núcleo (HTML, CSS, JS, fontes): reaproveita por hash e baixa só o que mudou (4 por vez)
    await executarEmLotes(core, 4, async ([url, hash]) => {
        if (oldHashes[url] === hash && oldCaches.length) {
            const hit = await buscarEmCaches(oldCaches, url);
            if (hit) { await newCache.put(url, hit.clone()); return; }
        }
        const res = await fetch(new Request(url, { cache: 'reload' }));
        if (res.ok && res.status === 200) await newCache.put(url, res);
    });
}

async function aquecerImagensFaltantes(oldHashes) {
    try {
        const cache = await caches.open(CACHE);
        const faltantes = [];
        for (const [url, hash] of FILES) {
            if (!ehImagemLivro(url)) continue;
            const jaTem = await cache.match(url, { ignoreSearch: true });
            if (!jaTem) faltantes.push([url, hash]);
        }
        if (!faltantes.length) return;
        await executarEmLotes(faltantes, 2, async ([url, hash]) => {
            try {
                const mudou = oldHashes[url] && oldHashes[url] !== hash;
                const req = mudou ? new Request(url, { cache: 'reload' }) : new Request(url);
                const res = await fetch(req);
                if (res.ok && res.status === 200) await cache.put(url, res);
            } catch {}
            await new Promise(r => setTimeout(r, 80));
        });
    } catch {}
}

/* Rede primeiro com limite de espera quando já existe cópia em cache (evita travar o livro em Wi-Fi lento) */
async function redeComReservaCache(event, cacheName, req, { buscarEmTodos = false, timeoutMs = 2500 } = {}) {
    const cache = await caches.open(cacheName);
    let cached = await cache.match(req, { ignoreSearch: true });
    if (!cached && buscarEmTodos) {
        cached = await caches.match(req, { ignoreSearch: true });
    }

    const netPromise = fetch(req).then(res => {
        if (res.ok && res.status === 200) cache.put(req, res.clone());
        return res;
    });

    if (!cached) return netPromise;

    let timer;
    const timeout = new Promise(resolve => { timer = setTimeout(() => resolve(null), timeoutMs); });
    const netRes = await Promise.race([netPromise.catch(() => null), timeout]);
    clearTimeout(timer);
    if (netRes && netRes.ok) return netRes;

    event.waitUntil(netPromise.catch(() => {}));
    return cached;
}

self.addEventListener('install', (event) => {
    event.waitUntil(instalarNucleo().then(() => self.skipWaiting()));
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const oldHashes = await lerHashesAntigos();
        const keys = await caches.keys();
        await Promise.all(
            keys.filter(k => k.startsWith('classicos-vivos-') && k !== CACHE).map(k => caches.delete(k))
        );
        await salvarHashesAtuais();
        await self.clients.claim();
        // Aquece imagens faltantes em segundo plano (2 por vez) sem bloquear a navegação
        aquecerImagensFaltantes(oldHashes);
    })());
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

    // Páginas HTML e a lista de narrações gravadas (vozes.js): rede primeiro (máx. 2,5 s se já houver cache)
    const isPage = req.mode === 'navigate' || req.destination === 'document' || /\/audio\/vozes\.js$/.test(new URL(req.url).pathname);
    if (isPage) {
        event.respondWith(redeComReservaCache(event, CACHE, req, { buscarEmTodos: true, timeoutMs: 2500 }));
        return;
    }

    // Narração: o <audio> pede trechos (Range → 206), que não dá para guardar. Pedimos o arquivo
    // inteiro (200), que o navegador aceita como resposta e que fica guardado para tocar offline.
    if (/\/audio\/.+\.(mp3|json)$/.test(new URL(req.url).pathname)) {
        event.respondWith(redeComReservaCache(event, CACHE_AUDIO, new Request(req.url), { buscarEmTodos: false, timeoutMs: 2500 }));
        return;
    }

    // Demais arquivos: cache DESTA versão primeiro; o que não foi pré-baixado vem da rede e fica guardado.
    // Nunca procurar primeiro em todos os caches (caches.match): os volumes baixados pelo botão "Baixar"
    // (cv-volume-quixote-N) guardam o livro.js e o livro.css da época do download e, por serem mais antigos,
    // ganhavam da versão nova: o tablet que baixou partes ficava preso no motor velho (bug de 2026-11-14).
    // Eles só servem de reserva sem internet.
    event.respondWith(
        caches.open(CACHE).then(c => c.match(req, { ignoreSearch: true })).then(hit => hit || fetch(req).then(res => {
            if (res.ok && res.status === 200) {
                const copy = res.clone();
                caches.open(CACHE).then(c => c.put(req, copy));
            }
            return res;
        }).catch(() => caches.match(req, { ignoreSearch: true }).then(velho => velho || Response.error())))
    );
});

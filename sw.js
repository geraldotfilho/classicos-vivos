/* Service worker dos Clássicos Vivos — GERADO por tools/build-sw.mjs. Não editar sw.js à mão:
   edite tools/sw.template.js e rode `npm run build:sw`.
   Estratégia:
   - Na instalação, baixa só o núcleo leve (HTMLs, estilos, fontes, scripts) e reaproveita por hash
     tudo o que não mudou do cache anterior (sem baixar ~24 MB de imagens a cada atualização).
   - As ilustrações não presentes em cache são aquecidas em segundo plano em lotes pequenos após ativar.
   - Páginas HTML e vozes.js: rede primeiro com limite de 2,5 s (se a rede estiver lenta, abre do cache na hora).
   - Narração gravada (*.mp3 e *.json): rede primeiro com limite de 2,5 s, cache próprio (cv-narracao).
   - Demais arquivos: cache primeiro (abre instantâneo no tablet). */
const CACHE = 'classicos-vivos-e1c46001bd97';
const CACHE_AUDIO = 'cv-narracao';
const CACHE_META = 'cv-meta';
const FILES = [
    [
        "./assets/css/desafios.css",
        "1148a983"
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
        "f41f4b8d"
    ],
    [
        "./assets/css/tailwind.css",
        "6d086969"
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
        "e3994333"
    ],
    [
        "./assets/icones/bandeiras/es.svg",
        "38e60176"
    ],
    [
        "./assets/icones/bandeiras/fr.svg",
        "3823b101"
    ],
    [
        "./assets/icones/bandeiras/gb.svg",
        "b3a36204"
    ],
    [
        "./assets/icones/icone-192.png",
        "bb91b0bf"
    ],
    [
        "./assets/js/acervo.js",
        "817be808"
    ],
    [
        "./assets/js/colaboracao.js",
        "b0786a18"
    ],
    [
        "./assets/js/contador.js",
        "b5ab47d3"
    ],
    [
        "./assets/js/desafios.js",
        "e0f5e080"
    ],
    [
        "./assets/js/i18n-site.js",
        "7372a527"
    ],
    [
        "./assets/js/livro.js",
        "0a192996"
    ],
    [
        "./assets/js/offline-manager.js",
        "251ade1e"
    ],
    [
        "./assets/js/texto.js",
        "829b8a1f"
    ],
    [
        "./dom-quixote/desafios/parte-1.js",
        "daacebed"
    ],
    [
        "./dom-quixote/desafios/parte-2.js",
        "c1af6bc2"
    ],
    [
        "./dom-quixote/desafios/parte-3.js",
        "0cd62d5a"
    ],
    [
        "./dom-quixote/desafios/parte-4.js",
        "113ee8fd"
    ],
    [
        "./dom-quixote/desafios/parte-5.js",
        "864209f3"
    ],
    [
        "./dom-quixote/desafios/parte-6.js",
        "8e11adbd"
    ],
    [
        "./dom-quixote/desafios/parte-7.js",
        "c85f1f07"
    ],
    [
        "./dom-quixote/desafios/parte-8.js",
        "bb1d334d"
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
        "774598e7"
    ],
    [
        "./dom-quixote/imagens/objetos/bacia-elmo.svg",
        "7802ef22"
    ],
    [
        "./dom-quixote/imagens/objetos/cenoura.svg",
        "30cdcce0"
    ],
    [
        "./dom-quixote/imagens/objetos/escova.svg",
        "4111052e"
    ],
    [
        "./dom-quixote/imagens/objetos/escudo-panelao.svg",
        "7b4f91d4"
    ],
    [
        "./dom-quixote/imagens/objetos/lanca-bandeirola.svg",
        "20795593"
    ],
    [
        "./dom-quixote/imagens/objetos/livro-castelos.svg",
        "f7f451ae"
    ],
    [
        "./dom-quixote/imagens/objetos/livro-cavaleiros.svg",
        "0af820c9"
    ],
    [
        "./dom-quixote/imagens/objetos/livro-dragoes.svg",
        "e69f36d2"
    ],
    [
        "./dom-quixote/imagens/objetos/maca.svg",
        "cf3d670b"
    ],
    [
        "./dom-quixote/imagens/objetos/sopa-banquete.svg",
        "ae09842a"
    ],
    [
        "./dom-quixote/imagens/objetos/trombeta-flauta.svg",
        "355584bb"
    ],
    [
        "./dom-quixote/imagens/objetos/vento-sopro.svg",
        "8a662082"
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
        "cea80a60"
    ],
    [
        "./dom-quixote/parte-2.html",
        "da43e69b"
    ],
    [
        "./dom-quixote/parte-3.html",
        "a47dbf87"
    ],
    [
        "./dom-quixote/parte-4.html",
        "b79aa9d0"
    ],
    [
        "./dom-quixote/parte-5.html",
        "4bfa3498"
    ],
    [
        "./dom-quixote/parte-6.html",
        "04f64d44"
    ],
    [
        "./dom-quixote/parte-7.html",
        "b8edfa5f"
    ],
    [
        "./dom-quixote/parte-8.html",
        "1f9fd5ac"
    ],
    [
        "./dom-quixote/traducoes/parte-1.en.js",
        "0389eecf"
    ],
    [
        "./dom-quixote/traducoes/parte-1.es.js",
        "66a206ed"
    ],
    [
        "./dom-quixote/traducoes/parte-1.fr.js",
        "c00e77e8"
    ],
    [
        "./dom-quixote/traducoes/parte-2.en.js",
        "aa0d2392"
    ],
    [
        "./dom-quixote/traducoes/parte-2.es.js",
        "509adbad"
    ],
    [
        "./dom-quixote/traducoes/parte-2.fr.js",
        "57d808a9"
    ],
    [
        "./dom-quixote/traducoes/parte-3.en.js",
        "128b7c8e"
    ],
    [
        "./dom-quixote/traducoes/parte-3.es.js",
        "00e40a48"
    ],
    [
        "./dom-quixote/traducoes/parte-3.fr.js",
        "464b44fa"
    ],
    [
        "./dom-quixote/traducoes/parte-4.en.js",
        "ac10f310"
    ],
    [
        "./dom-quixote/traducoes/parte-4.es.js",
        "47f386c2"
    ],
    [
        "./dom-quixote/traducoes/parte-4.fr.js",
        "3caf9bbd"
    ],
    [
        "./dom-quixote/traducoes/parte-5.en.js",
        "dfc83b20"
    ],
    [
        "./dom-quixote/traducoes/parte-5.es.js",
        "4cbc1e4b"
    ],
    [
        "./dom-quixote/traducoes/parte-6.en.js",
        "5a5133e3"
    ],
    [
        "./dom-quixote/traducoes/parte-6.es.js",
        "a7a5aff6"
    ],
    [
        "./index.html",
        "91662e16"
    ],
    [
        "./manifest.webmanifest",
        "638d778e"
    ],
    [
        "./sobre.html",
        "cd10daa6"
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

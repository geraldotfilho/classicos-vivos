/* Contador de visitas anônimo (GoatCounter: sem cookies e sem dados pessoais; pedido do humano, 2026-10-27).
   Painel: https://classicosvivos.goatcounter.com. Só conta no site oficial (GitHub Pages): testes em
   localhost, file:// e cópias do projeto não entram. Offline, o script não carrega e o livro segue normal.
   Os livros carregam este arquivo pelo motor (livro.js), exceto os rascunhos. */
(function () {
    if (location.hostname !== 'geraldotfilho.github.io') return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', 'https://classicosvivos.goatcounter.com/count');
    document.head.appendChild(s);
})();

// =====================================================
// 🏠 BARRA DE NAVEGAÇÃO — Abre/fecha menu
// =====================================================
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const primaryNav = document.querySelector('.primary-nav');
const siteHeader = document.querySelector('.site-header');

if (navToggle && primaryNav) {
  navToggle.onclick = function () {
    primaryNav.classList.add('open');
  };
}
if (navClose && primaryNav && navToggle) {
  navClose.onclick = function () {
    primaryNav.classList.remove('open');
    fecharTodos();
  };
}

// 🖱️ COMPUTADOR: passa o mouse → abre submenu
document.addEventListener('mouseover', function (e) {
  if (window.innerWidth > 1100) {
    var item = e.target.closest('.has-dropdown');
    if (item) {
      fecharTodos();
      item.classList.add('open');
    }
  }
});
document.addEventListener('mouseout', function (e) {
  if (window.innerWidth > 1100) {
    var item = e.target.closest('.has-dropdown');
    if (item) {
      item.classList.remove('open');
    }
  }
});

// 📱 CELULAR: clica → abre submenu
document.addEventListener('click', function (e) {
  if (window.innerWidth <= 1100) {
    var trigger = e.target.closest('.dropdown-trigger');
    if (trigger) {
      e.preventDefault();
      var item = trigger.closest('.has-dropdown');
      if (!item) return;
      if (item.classList.contains('open')) {
        item.classList.remove('open');
      } else {
        fecharTodos();
        item.classList.add('open');
      }
    }
  }
});

// =====================================================
// ✨ BARRA DE NAVEGAÇÃO — muda estilo ao descer
// =====================================================
window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    siteHeader.classList.add('rolando');
  } else {
    siteHeader.classList.remove('rolando');
  }
});

// =====================================================
// ⚡ ELEMENTOS APARECENDO — MUITO MAIS RÁPIDO
// =====================================================
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('apareceu');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('section, .card, .priest-card, .founder-card, .grid').forEach(el => {
  el.classList.add('escondido-antes');
  observador.observe(el);
});

// =====================================================
// 📅 Ano no rodapé
// =====================================================
var ano = new Date().getFullYear();
var anoEl = document.querySelector('.js-year');
if (anoEl) anoEl.textContent = ano;

// =====================================================
// 👤 BOTÃO DE CONTA NO MENU
// - Não logado: o botão "Área do Irmão" fica OCULTO no menu.
//   Só aparece a tela de login quando a pessoa clica em
//   "Formação Permanente" (ver formacao-permanente.html).
// - Logado: no lugar aparece "Sair da Conta".
// (login "falso" sem banco de dados — ver area-do-irmao.html)
// =====================================================
(function () {
  var logado = sessionStorage.getItem('salvistas_logado') === '1'
            || localStorage.getItem('salvistas_logado') === '1';

  var iconLogout =
    '<svg viewBox="0 0 24 24"><path d="M10.5 3a1 1 0 0 1 0 2H6v14h4.5a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5.5zm4.29 3.29a1 1 0 0 1 1.42 0l4 4a1 1 0 0 1 0 1.42l-4 4a1 1 0 0 1-1.42-1.42L17.09 11H9a1 1 0 0 1 0-2h8.09l-2.3-2.29a1 1 0 0 1 0-1.42z"/></svg>';

  document.querySelectorAll('a.nav-account').forEach(function (link) {
    var item = link.closest('li');

    if (logado) {
      var iconSpan = link.querySelector('.nav-account-icon');
      if (iconSpan) iconSpan.innerHTML = iconLogout;
      link.setAttribute('href', '#');
      link.childNodes.forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = ' Sair da Conta';
      });
      link.addEventListener('click', function (e) {
        e.preventDefault();
        sessionStorage.removeItem('salvistas_logado');
        sessionStorage.removeItem('salvistas_usuario');
        localStorage.removeItem('salvistas_logado');
        window.location.href = 'area-do-irmao.html';
      });
    } else {
      // não logado: o botão some do menu — a tela de login só
      // aparece quando a pessoa clica em "Formação Permanente"
      if (item) item.style.display = 'none';
    }
  });
})();

function fecharTodos() {
  document.querySelectorAll('.has-dropdown').forEach(item => {
    item.classList.remove('open');
  });
}
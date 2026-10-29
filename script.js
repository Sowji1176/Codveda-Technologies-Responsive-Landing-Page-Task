/* Basic JavaScript interactions for the Nexora landing page. */

document.documentElement.classList.add('js-enabled');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const navigationLinks = navigation ? navigation.querySelectorAll('a') : [];

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  navigation.classList.remove('is-open');
}

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
    navigation.classList.toggle('is-open', !isExpanded);
  });

  navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    const clickedInsideNavigation = navigation.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);
    if (!clickedInsideNavigation && !clickedToggle) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

// Display the current year automatically in the footer.
const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();

// Reveal content as it enters the viewport. The content remains visible if this API is unavailable.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

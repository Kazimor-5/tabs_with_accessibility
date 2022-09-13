const tabs = [...document.querySelectorAll('.tab')];
const tabsContent = [...document.querySelectorAll('.tab-content')];

// * Navigation dans les onglets avec la souris
const tabsAnimation = (e) => {
  // * On trouve l'index de la tab de la classe active
  const indexToRemove = tabs.findIndex((tab) =>
    tab.classList.contains('active-tab')
  );

  // * On retire la classe active de la tab ainsi que du contenu
  tabs[indexToRemove].setAttribute('aria-selected', 'false');
  tabs[indexToRemove].setAttribute('tabindex', -1);
  tabs[indexToRemove].classList.remove('active-tab');
  tabsContent[indexToRemove].classList.remove('active-tab-content');

  // * On trouve l'index de ce qu'il faut montrer
  const indexToShow = tabs.indexOf(e.target);

  // * On ajoute la classe active à la tab et au contenu qu'on veut montrer
  tabs[indexToShow].setAttribute('tabindex', 0);
  tabs[indexToShow].setAttribute('aria-selected', 'true');
  tabs[indexToShow].classList.add('active-tab');
  tabsContent[indexToShow].classList.add('active-tab-content');
};

tabs.forEach((tab) => tab.addEventListener('click', tabsAnimation));

// * Naviagation dans les onglets avec le clavier
let tabFocus = 0;

const arrowNavigation = (e) => {
  // * Si le code de la touche est égal au code de la touche directionnelle gauche ou droite
  if (e.keyCode === 39 || e.keyCode === 37) {
    tabs[tabFocus].setAttribute('tabindex', -1);

    // * On vérifie si la touche est celle de droite
    if (e.keyCode === 39) {
      tabFocus++;

      // * Si je suis déjà à la fin de mon tableau d'onglet je repars au début
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
      // * Sinon si j'ai pressé la touche de gauche
    } else if (e.keyCode === 37) {
      tabFocus--;

      // * Si je suis déjà au début de mon tableau d'onglets, je repars à la fin
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
    tabs[tabFocus].setAttribute('tabindex', 0);
    tabs[tabFocus].focus();
  }
};

tabs.forEach((tab) => tab.addEventListener('keydown', arrowNavigation));

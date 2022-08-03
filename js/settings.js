const settings = document.querySelector('.test .modal');
const settingsTrigger = document.querySelector('.settings');
const closeTab = document.querySelector('.test .close-button');

function toggleModal() {
  settings.classList.toggle('show-modal');
}

function windowOnClick(event) {
  if (event.target === settings) {
    toggleModal();
  }
}

settingsTrigger.addEventListener('click', toggleModal);
closeTab.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

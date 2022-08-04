const settings = document.querySelector('#settings-modal');
const settingsTrigger = document.querySelector('#settings-button');
const closeTab = document.querySelectorAll('.close-button')[1];

function toggleModal()
{
  settings.classList.toggle('show-modal');
}

function windowOnClick(event)
{
  if (event.target === settings)
  {
    toggleModal();
  }
}

settingsTrigger.addEventListener('click', toggleModal);
closeTab.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

settingsTrigger.addEventListener('click', function ()
{
  settingsTrigger.classList.toggle('clicked-button');
});



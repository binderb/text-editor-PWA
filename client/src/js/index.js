import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

const hideButtonIfInstalled = async () => {
  const relatedApps = await navigator.getInstalledRelatedApps();
  console.log("related apps: ",relatedApps);
  if (relatedApps && relatedApps.length > 0) {
    const installButton = document.querySelector('#buttonInstall');
    installButton.setAttribute('style','display:none;');
  }
}

hideButtonIfInstalled();


// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('./service-worker.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

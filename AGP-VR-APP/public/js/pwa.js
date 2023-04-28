document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if ('serviceWorker' in navigator) {

        window.addEventListener('load', async function() {
            console.log("Entra en service worker")
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            if (registration.waiting && registration.active) {
                // The page has been loaded when there's already a waiting and active SW.
                // This would happen if skipWaiting() isn't being called, and there are
                // still old tabs open.
                console.log('Please close all tabs to get updates.');
            } else {
                // updatefound is also fired for the very first install. ¯\_(ツ)_/¯
                registration.addEventListener('updatefound', () => {
                    registration.installing.addEventListener('statechange', () => {
                        if (event.target.state === 'installed') {
                            if (registration.active) {
                                // If there's already an active SW, and skipWaiting() is not
                                // called in the SW, then the user needs to close all their
                                // tabs before they'll get updates.
                                console.log('Please close all tabs to get updates.');
                            } else {
                                // Otherwise, this newly installed SW will soon become the
                                // active SW. Rather than explicitly wait for that to happen,
                                // just show the initial "content is cached" message.
                                console.log('Content is cached for the first time!');
                            }
                        }
                    });
                });
            }
        });
    }
    /* if ('serviceWorker' in navigator) {
         navigator.serviceWorker.register('/service-worker.js')
             .then((reg) => {
                 console.log('Service worker registered -->', reg);
                 var newWorker = reg.installing;

                 // statechange fires every time the ServiceWorker.state changes
                 newWorker.onstatechange = function() {
                     // show the message on activation
                     if (newWorker.state == 'activated' && !navigator.serviceWorker.controller) {
                         console.log("Status:offline")
                     }
                 };

             }, (err) => {
                 console.error('Service worker not registered -->', err);
             });
     }*/
}
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen

    $('#addHome').modal('show');
    addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});
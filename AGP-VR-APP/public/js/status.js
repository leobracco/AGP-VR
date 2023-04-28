document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if (!navigator.onLine) {

        console.log('offline')
    } else
        console.log('OnLine')

}
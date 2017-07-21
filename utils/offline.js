if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(reg) {
      console.log('Service worker registered');
    })
    .catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
}

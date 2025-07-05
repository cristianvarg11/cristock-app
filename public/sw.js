// public/sw.js
// This file will be loaded by your Next.js PWA setup.

// Make sure to import Serwist's default service worker if you need caching strategies
// This part is typically handled by next-pwa, but good to know
// import { precacheAndRoute } from 'workbox-precaching'; // Or @serwist/precaching

// Example: Handling push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('Push received:', data);

  const title = data.title || 'Stock Alert!';
  const options = {
    body: data.body || 'A stock price has changed.',
    icon: '/icons/maskable_icon_x192.png', // Path to your notification icon
    badge: '/icons/maskable_icon_x48.png', // Path to your badge icon (Android)
    data: {
      url: data.url || '/', // URL to open when notification is clicked
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
      return null;
    }),
  );
});

// Important: Next-PWA will automatically inject precaching and routing logic here.
// You usually don't need to manually precacheAndRoute unless you have specific needs beyond what next-pwa provides.
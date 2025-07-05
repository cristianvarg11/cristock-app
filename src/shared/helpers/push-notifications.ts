/* eslint-disable @typescript-eslint/no-unused-vars */
// src/shared/helpers/push-notifications.ts

// Function to convert VAPID public key to Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Function to register service worker and subscribe for push notifications
export const subscribeToPushNotifications = async (): Promise<PushSubscription | null> => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications are not supported in this browser.');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicVapidKey) {
        console.error('VAPID public key is not set in environment variables.');
        return null;
      }
      const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey);

      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
      console.log('Push subscribed:', subscription);
      // In a real app, you would send this subscription object to your backend
      // to store it and send notifications from there.
      localStorage.setItem('pushSubscription', JSON.stringify(subscription));
    } else {
      console.log('Already subscribed:', subscription);
    }
    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    return null;
  }
};

// Function to unsubscribe from push notifications (optional)
export const unsubscribeFromPushNotifications = async () => {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      console.log('Push unsubscribed');
      localStorage.removeItem('pushSubscription');
      // In a real app, you would also notify your backend to remove this subscription
    }
  } catch (error) {
    console.error('Failed to unsubscribe from push notifications:', error);
  }
};


// Function to send a push notification (client-side simulation)
// In a production environment, this should be done from your backend server.
export const sendPushNotification = async (title: string, body: string, url: string = '/') => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications not supported or service worker not ready.');
    return;
  }

  // Retrieve the subscription from localStorage (or from your backend)
  const storedSubscription = localStorage.getItem('pushSubscription');
  if (!storedSubscription) {
    console.warn('No push subscription found.');
    return;
  }

  const subscription = JSON.parse(storedSubscription);

  // If you were sending from a backend, you would send this data to your backend
  // which would then use `web-push` to send the notification.
  // For client-side simulation, we'll try to trigger directly (not always reliable or best practice)
  // A better client-side simulation would be to post to a dummy endpoint
  // that then uses web-push on the server.
  // For direct client-side notification display (without actual push service), you'd use
  // navigator.serviceWorker.ready.then(registration => registration.showNotification(title, { body, data: { url } }));

  // **For actual web push notification delivery, you need a server-side component.**
  // This client-side `web-push` usage for sending is primarily for testing
  // and would require exposing your private key, which is a security risk.

  // Instead of direct web-push.send from client, we'll use a postMessage to service worker
  // or show local notification if possible.
  // For a real push, you'd send `subscription` and `payload` to your backend.

  const payload = JSON.stringify({
    title,
    body,
    url,
  });

  // Since we're demonstrating client-side, let's simulate by dispatching a custom event
  // that your service worker could listen to, or ideally, directly show a notification
  // using the Notification API.
  // However, for a *push* notification, it needs to come from the server.
  // Let's assume for now that `subscribeToPushNotifications` has done its job
  // and the browser is capable of receiving.

  // Best way to test "push" without a backend is to trigger it via DevTools.
  // For this scenario, we'll rely on the `notificationclick` in the service worker.

  // To truly trigger a "push" event, you need a backend.
  // If you *must* do it client-side for a demo, you'd make a fetch request to a dummy endpoint
  // that then triggers a push using your private key.
  // For simplicity here, we'll just show a local notification if push isn't fully set up.
  if ('Notification' in window && Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        body,
        icon: '/icons/maskable_icon_x192.png',
        badge: '/icons/maskable_icon_x48.png',
        data: { url },
      });
    });
  } else {
    console.log('Notifications not granted or service worker not ready for direct showNotification.');
  }
};
self.addEventListener('push', event => {
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'path/to/icon.png',
    // Add additional options as needed
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  // Add your custom logic here
  clients.openWindow('https://example.com');
});

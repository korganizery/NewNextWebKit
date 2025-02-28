// self.addEventListener('push', async function (event) {
//   if (event.data) {
//       const data = await event.data.json();
//       const { title, body, primaryKey, badge, url } = data;
//       const options = {
//           title,
//           body: body,
//           icon: data.icon || '/icon-192x192.png',
//           badge: badge || '/badge.png',
//           vibrate: [100, 50, 100],
//           data: {
//               dateOfArrival: Date.now(),
//               primaryKey,
//               url,
//           },
//       };

//       // 定义你的异步操作
//       function someOtherAsyncOperation() {
//           return new Promise((resolve, reject) => {
//               setTimeout(() => {
//                   resolve('Operation completed');
//               }, 1000);
//           });
//       }

//       event.waitUntil(
//           Promise.all([
//               self.registration.showNotification(data.title, options),
//               someOtherAsyncOperation()
//           ])
//       );
//   }
// })

// self.addEventListener('notificationclick', function (event) {
//   const data = event.notification.data;
//   const { url } = data;
//   event.notification.close();

//   if (url) {
//       event.waitUntil(clients.openWindow(url));
//   }
// });

self.addEventListener('push', function (event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
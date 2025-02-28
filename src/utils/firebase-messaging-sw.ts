import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

// 初始化 Firebase 应用
initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
});

// 获取 Firebase Messaging 实例
const messaging = getMessaging();

// 处理后台消息
onBackgroundMessage(messaging, (payload) => {
  console.log('Received background message:', payload);
  self.registration.showNotification(payload.notification?.title || 'Title', {
    body: payload.notification?.body || 'Body',
    icon: '/icon.png', // 图标地址
  });
});

export async function useSubscribeToPush() {
    if (!('serviceWorker' in navigator)) {
      console.error('浏览器不支持 Service Worker');
      return;
    }
  
    try {
      // 注册 Service Worker
      const registration = await navigator.serviceWorker.register('/service-worker.js');
  
      // 订阅推送服务
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      });
  
      console.log('订阅对象:', subscription);
  
      // 将订阅对象发送到服务器
      await fetch('/api/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
          message: 'Hello, this is a test notification!',
        }),
      });
    } catch (error) {
      console.error('订阅推送服务失败:', error);
    }
  }
  
  export function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
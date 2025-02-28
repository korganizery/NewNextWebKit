import { useEffect, useState } from 'react';

/*
确保 Safari 版本和设备支持
确保您的设备运行的是 iOS 16.4 或更高版本。Web Push 功能在较低版本的 iOS 中不可用。

确保使用的是 Safari 浏览器，因为其他浏览器在 iOS 上的支持有限。

可以通过以下代码检查浏览器对 Service Worker 和 Push API 的支持：


确保 HTTPS 环境
Safari 的 Web Push 功能仅适用于 HTTPS 环境。确保您的网站使用 HTTPS，并且正确配置 SSL 证书。如果您在本地开发，可以使用类似 mkcert 工具生成本地 HTTPS 证书。
 */
type PushSupportStatus = {
  isSupported: boolean;
  message: string;
};

const useWebPushSupport = (): PushSupportStatus => {
  const [status, setStatus] = useState<PushSupportStatus>({
    isSupported: false,
    message: '',
  });

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      console.error('当前浏览器不支持 Service Worker');
      setStatus({ isSupported: false, message: '当前浏览器不支持 Service Worker' });
    } else if (!('PushManager' in window)) {
      console.error('当前浏览器不支持 Push API');
      setStatus({ isSupported: false, message: '当前浏览器不支持 Push API' });
    } else {
      console.log('设备支持 Web Push 功能');
      setStatus({ isSupported: true, message: '设备支持 Web Push 功能' });
    }
  }, []); // 只需要在组件挂载时检测一次

  return status;
};

export default useWebPushSupport;

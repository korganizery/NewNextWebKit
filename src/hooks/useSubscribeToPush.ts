import { useState } from 'react';

export const useSubscribeToPush = () => {
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);

    const subscribe = async () => {
        if (!('serviceWorker' in navigator)) {
            console.error('Browser does not support Service Worker');
            return;
        }

        try {
            // Register Service Worker
            const registration = await navigator.serviceWorker.register('/service-worker.js');

            // Subscribe to Push Service
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
            });

            console.log('Subscription object:', subscription);
            setSubscription(subscription);

            // Send subscription object to the server
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
            console.error('Failed to subscribe to push service:', error);
        }
    };

    return { subscription, subscribe };
};

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

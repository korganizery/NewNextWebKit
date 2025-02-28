import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';

// 配置 VAPID 密钥
webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // 从请求体中获取订阅对象和消息
    const { subscription, message } = await req.json();

    const obj = {
      endpoint: 'https://fcm.googleapis.com/fcm/send/dvFJaIjLzng:APA91bFC6iBkqzJ4S8mRgllyAk6NMH6_CRVVhh6n1JiDX8oA8n1DaTEMNvexUBpLalzcedYTqBgvMw-F9RKyzBSYywMh_hetGj4WJVj34szHxpdHosgHH8eE5B4wfZP3FROitWVyEH3A',
      expirationTime: null,
      keys: {
        p256dh: 'BNpMc2BsTxuyTXKI0Rw4WAwoVwlj_7euX_yOFUONGj2LiYkAvCLfsQFLTMqMihb6E7os8tA4ZdH12CAIUAtbsY0',
        auth: 'BarhE6Z4fBXQP20D9gFOeA'
      }
    }
    const subscriptionJson = !subscription ? obj : subscription;

    if (!subscriptionJson || !message) {
      return NextResponse.json({ error: '订阅对象或消息缺失' }, { status: 400 });
    }

    // 使用 web-push 发送通知
    await webpush.sendNotification(subscriptionJson, JSON.stringify({
      title: '通知标题',
      body: message,
      icon: '/icon-192x192.png',
    }));
    console.log("oldJson", obj);
    console.log("subscription", subscriptionJson);
    console.log("message", message);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('推送通知失败:', error);
    return NextResponse.json({ error: '推送通知失败' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getUser, updateUserFrameAdded, updateUserNotificationsEnabled, updateUserNotificationToken } from '@/db/queries';
import { eq } from 'drizzle-orm';
import { BASE_URL } from '@/lib/utils';
import { sendFrameNotification } from '@/lib/warpcast';

function decodeBase64Json(base64String: string) {
  try {
    const jsonString = Buffer.from(base64String, 'base64').toString('utf-8');
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

export async function POST(c: NextRequest) {
  try {
    const baseUrl = c.url.replace(c.nextUrl.pathname, "");
    const body = await c.json();
    const header = decodeBase64Json(body.header);
    const payload = decodeBase64Json(body.payload);

    const fid = header?.fid;
    const event = payload?.event;

    console.log("[warpcast-frame-webhook]", header, payload);

    if (!fid) {
      return NextResponse.json({ error: "Missing FID" }, { status: 400 });
    }

    try {
      const user = await getUser(fid);

      if (event === "frame_added") {
        await updateUserFrameAdded(user.id, true);
      }

      if (event === "notifications_enabled") {
        const notificationToken = payload?.notificationDetails?.token;
        
        await updateUserNotificationsEnabled(user.id, true);
        
        if (notificationToken) {
          await updateUserNotificationToken(user.id, notificationToken);
        }
      }

      if (event === "frame_added" || event === "notifications_enabled") {
        const notificationToken = payload?.notificationDetails?.token;
        
        if (notificationToken) {
          const res = await sendFrameNotification({
            title: "Welcome to FarHack",
            body: "Let's get to hacking!",
            targetUrl: BASE_URL,
            tokens: [notificationToken],
          });
          
          console.log("[warpcast-frame-webhook]", res);
        }
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 
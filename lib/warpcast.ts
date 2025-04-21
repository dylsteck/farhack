import { FarcasterNotificationPayload } from "./types";

export async function sendFrameNotification(payload: FarcasterNotificationPayload): Promise<any> {
  try {
    const notificationId = crypto.randomUUID();
    const response = await fetch("https://api.warpcast.com/v1/frame-notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notificationId,
        ...payload,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send notification: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error sending frame notification:", error);
    throw error;
  }
} 
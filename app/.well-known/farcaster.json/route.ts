import { BASE_URL, ICON_IMG } from "../../../lib/utils";

export async function GET() {
  const config = {
    "accountAssociation": {
        "header": "eyJmaWQiOjYxNiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDVFNzlGNjkwY2NENDIwMDdENUEwYUQ2NzhDRDQ3NDc0MzM5NDAwRTMifQ",
        "payload": "eyJkb21haW4iOiJmYXJoYWNrLnh5eiJ9",
        "signature": "MHg0MTAyYjQ1M2M2ZTM3MDg1OWIzYmRhZjIwYjBhY2NiZjU2OTlkZTBmZDhkYjY5NzlmOTQzNjJlYjJjYTEzNDljMzMwOWYyZDYyNDcxNjU2ZWQxMmJjYjVhOGQxYjc4MWE3YWViYjE5Y2E5NzllNjk2MDhlYjdkZmZkMzAyMDE0MTFi"
    },
    frame: {
      version: "next",
      name: "FarHack",
      iconUrl: ICON_IMG,
      splashImageUrl: ICON_IMG,
      splashBackgroundColor: "#000000",
      homeUrl: BASE_URL,
    },
  };

  return Response.json(config);
}
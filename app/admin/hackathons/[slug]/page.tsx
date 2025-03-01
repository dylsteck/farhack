import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { auth } from "@/auth"
import { farhackSDK } from "@/app/lib/api"
import { Hackathon, User } from "@/app/lib/types"
import { Button } from "@/components/ui/button"

export default async function AdminHackathonPage(props: { params: Promise<any> }) {
  const params = await props.params
  const { slug } = params

  const session = await auth()

  if (!session?.user) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40 justify-center items-center">
        <h1 className="text-2xl font-bold">Please log in to view your dashboard</h1>
      </div>
    )
  }

  const user = session.user as unknown as User
  const hackathon = await farhackSDK.getHackathon(slug) as Hackathon

  return (
    <div className="min-w-full mx-auto py-10">
      <Card className="min-w-full shadow-lg border border-muted-foreground/20 rounded-xl">
        <CardHeader className="px-6 py-4 border-b">
          <CardTitle className="text-3xl font-bold text-white">Hackathon Details</CardTitle>
          <CardDescription className="text-gray-400">Overview of the hackathon</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {hackathon ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Name</label>
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-md border border-gray-700">{hackathon.name}</div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Slug</label>
                  <div className="bg-gray-900 text-blue-400 px-3 py-2 rounded-md border border-gray-700">{hackathon.slug}</div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-500">Description</label>
                <div className="bg-gray-900 text-white px-3 py-2 rounded-md border border-gray-700">{hackathon.description}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Start Date</label>
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-md border border-gray-700">
                    {hackathon.start_date ? new Date(hackathon.start_date).toLocaleDateString() : "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">End Date</label>
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-md border border-gray-700">
                    {hackathon.end_date ? new Date(hackathon.end_date).toLocaleDateString() : "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Created At</label>
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-md border border-gray-700">
                    {new Date(hackathon.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {hackathon.tracks && hackathon.tracks.length > 0 && (
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Tracks</label>
                  <div className="bg-gray-900 px-3 py-2 rounded-md border border-gray-700 space-y-2">
                    {hackathon.tracks.map((track) => (
                      <div key={track.id} className="text-white">
                        <p className="font-medium">{track.name}</p>
                        <p className="text-sm text-gray-400">{track.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {hackathon.bounties && hackathon.bounties.length > 0 && (
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Bounties</label>
                  <div className="bg-gray-900 px-3 py-2 rounded-md border border-gray-700 space-y-2">
                    {hackathon.bounties.map((bounty) => (
                      <div key={bounty.id} className="text-white">
                        <p className="font-medium">{bounty.name}</p>
                        <p className="text-sm text-gray-400">{bounty.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {hackathon.schedule && hackathon.schedule.length > 0 && (
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Schedule</label>
                  <div className="bg-gray-900 px-3 py-2 rounded-md border border-gray-700 space-y-2">
                    {hackathon.schedule.map((event) => (
                      <div key={event.id} className="text-white">
                        <p className="font-medium">{event.name}</p>
                        <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
                        <a href={event.url} className="text-blue-500 text-sm" target="_blank" rel="noopener noreferrer">
                          Event Link
                        </a>
                        <p className="text-sm text-gray-400">{(event as any).description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <Button asChild className="px-6 py-2 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-lg">
                  <a href={`/admin/hackathons/${hackathon.slug}`} className="btn">
                    Edit
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No hackathon details available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
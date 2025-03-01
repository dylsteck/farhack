import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { auth } from "@/auth"
import { farhackSDK } from "@/app/lib/api"
import { Hackathon, User } from "@/app/lib/types"
import { Button } from "@/components/ui/button"

export default async function HackathonsPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40 justify-center items-center">
        <h1 className="text-2xl font-bold">Please log in to view your dashboard</h1>
      </div>
    );
  }

  const user = session.user as unknown as User;
  const hackathons = await farhackSDK.getHackathons() as Hackathon[];

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 grid-cols-1">
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Hackathons</CardTitle>
          <CardDescription>List of all hackathons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hackathons
                  .filter((hackathon) => {
                    if (user?.admin_hackathons === 'all') return true;

                    const adminHackathonIds = user?.admin_hackathons?.split(',').map(Number);

                    if (!Array.isArray(adminHackathonIds)) {
                      console.error(`Invalid admin_hackathons: ${user?.admin_hackathons}`);
                      return false;
                    }

                    console.error(`Checking hackathon ID ${hackathon.id} against admin IDs:`, adminHackathonIds);
                    return adminHackathonIds.includes(hackathon.id);
                  })
                  .map(hackathon => (
                    <TableRow key={hackathon.id}>
                      <TableCell>{hackathon.name}</TableCell>
                      <TableCell>{hackathon.description}</TableCell>
                      {hackathon.start_date ? 
                        <TableCell>{new Date(hackathon.start_date).toLocaleDateString()}</TableCell>
                      : null }
                      {hackathon.end_date ? 
                        <TableCell>{new Date(hackathon.end_date).toLocaleDateString()}</TableCell>
                      : null }
                      <TableCell>{new Date(hackathon.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{hackathon.slug}</TableCell>
                      <TableCell>
                        <Button asChild>
                          <a href={`/admin/hackathons/${hackathon.slug}`} className="btn">
                            Edit
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
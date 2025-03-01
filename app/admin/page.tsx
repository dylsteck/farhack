import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { auth } from "@/auth"

type Ticket = {
  id: number
  user_id: number
  user_address: string
  hackathon_id: number
  txn_hash: string
  ticket_type: string
  amount: number
  created_at: Date
  name: string
  image: string
  is_admin: boolean
  admin_hackathons: string
  hackathon_name: string
}

const getStartOfWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const date = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -7 : 1);
  return new Date(now.setDate(date));
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

export default async function AdminHomePage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40 justify-center items-center">
        <h1 className="text-2xl font-bold">Please log in to view your dashboard</h1>
      </div>
    );
  }
  // const recentTickets = await getRecentTickets();

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 grid-cols-1">
        <Card className="bg-transparent border-none space-y-0 p-0">
          <CardHeader className="bg-transparent space-y-0 p-0 pt-2 pb-2">
            <CardTitle className="text-2xl">Welcome, {session.user.name}!</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Sales</CardDescription>
            <CardTitle className="text-4xl">{formatCurrency(300)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">All time</div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Recent ticket purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">Username</TableHead>
                      <TableHead className="hidden sm:table-cell">Type</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden md:table-cell">Hackathon</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Txn Hash</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* {recentTickets.map(ticket => (
                      <TableRow key={ticket.id}>
                        <TableCell className="hidden sm:table-cell">
                          <a className="underline" href={`https://warpcast.com/${ticket.name}`} target="_blank" rel="noopener noreferrer">@{ticket.name}</a>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {ticket.ticket_type.charAt(0).toUpperCase() + ticket.ticket_type.slice(1)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {ticket.hackathon_name}
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(ticket.amount)}</TableCell>
                        <TableCell className="text-right">
                          <a className="underline" href={`https://basescan.org/tx/${ticket.txn_hash}`} target="_blank" rel="noopener noreferrer">
                            {ticket.txn_hash.slice(0, 6) + '...' + ticket.txn_hash.slice(ticket.txn_hash.length - 6, ticket.txn_hash.length)}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
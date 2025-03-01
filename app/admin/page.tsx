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
import { getAllTimeSales, getRecentTickets } from "@/db/queries"

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

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 grid-cols-1">
        <Card className="bg-transparent border-none space-y-0 p-0">
          <CardHeader className="bg-transparent space-y-0 p-0">
            <CardTitle className="text-2xl">Welcome, {session.user.name}!</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
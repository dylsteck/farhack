/* eslint-disable @next/next/no-img-element */
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
import { farhackSDK } from "@/app/lib/api"
import { getUsers } from "@/db/queries"

type User = {
  id: number
  created_at: string
  name: string
  image: string
  is_admin: boolean
  admin_hackathons: string
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 grid-cols-1">
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Users</CardTitle>
          <CardDescription>List of all users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Is Admin</TableHead>
                  <TableHead>Admin Hackathons</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <img src={user.image ?? ''} alt={user.name ?? ''} className="h-10 w-10 rounded-full" />
                    </TableCell>
                    <TableCell>{user.is_admin ? "Yes" : "No"}</TableCell>
                    <TableCell>{user.admin_hackathons}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <div className="text-sm text-muted-foreground text-center py-2">
          Showing {users.length} users (limit: 100)
        </div>
      </Card>
    </div>
  )
}
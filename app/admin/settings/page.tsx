import * as React from "react"
import AdminTable from "@/app/components/admin-table"
import { User } from "@/app/lib/types"
import { getAdmins } from "@/db/queries"

export default async function SettingsPage() {
  const users = await getAdmins() as User[];

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <AdminTable users={users} />
    </div>
  )
}
import { DatabaseConnectionUrl } from "./partials/database-connection-url"
import { ListDatabaseUsers } from "./partials/list-database-users"
import { ListDatabases } from "./partials/list-databases"
import { ManageDatabasePassword } from "./partials/manage-database-password"

export const metadata = {
  title: "Database",
}

export default function Page() {
  return (
    <>
      <DatabaseConnectionUrl />
      <ListDatabases />
      <ListDatabaseUsers />
      <ManageDatabasePassword />
    </>
  )
}

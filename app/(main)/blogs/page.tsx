// app/users/page.tsx
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "@/actions/user-actions";
import { Role } from "@prisma/client";
import UsersTable from "../_components/user-table";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      {/* Create User Form */}
      <div className="mb-8 p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
        <form action={createUser} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="clerkUserId"
                className="block text-sm font-medium mb-1"
              >
                Clerk User ID
              </label>
              <input
                id="clerkUserId"
                name="clerkUserId"
                type="text"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full p-2 border rounded"
                defaultValue="USER"
              >
                <option value="USER">User</option>
                <option value="COMPANY_ADMIN">Company Admin</option>
                <option value="PLATFORM_ADMIN">Platform Admin</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium mb-1"
              >
                Image URL (optional)
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create User
          </button>
        </form>
      </div>

      {/* Users Table - Client Component */}
      <UsersTable users={users} />
    </div>
  );
}

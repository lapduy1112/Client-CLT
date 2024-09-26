import React from "react";
import Link from "next/link";
const SideNav = () => {
  return (
    <aside className="w-1/6 bg-purple-900 text-white p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <h1 className="text-xl font-bold">Admin Email</h1>
      </div>
      <nav className="flex flex-col space-y-4">
        {/* <Link href="/admin/dashboard" className="text-white">
          Dashboard
        </Link> */}
        <Link href="/admin/usermanage">User Management</Link>
        <Link href="/admin/portmanage">Port Management</Link>
        <Link href="/admin/routemanage">Route Management</Link>
        <Link href="/admin/permission">Permission</Link>
        <Link href="/admin/settings">Settings</Link>
      </nav>
      <button className="mt-auto bg-purple-700 py-2 px-4 rounded-lg">
        Logout
      </button>
    </aside>
  );
};

export default SideNav;

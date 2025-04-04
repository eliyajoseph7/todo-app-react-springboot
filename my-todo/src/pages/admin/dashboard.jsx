import AppLayout from "./layouts/app";
import Sidebar from "./layouts/sidebar";

export default function Dashboard() {
  return (
    <Sidebar>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">Welcome to the admin dashboard!</p>
      </div>
    </Sidebar>
  );
}

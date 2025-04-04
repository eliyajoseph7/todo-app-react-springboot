import Sidebar from "../layouts/sidebar";

export default function TodosList() {
  return (
    <Sidebar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-md shadow-md p-6 w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4">Todos List</h1>
          <p className="text-gray-700 mb-4">Here is the list of your todos.</p>
          {/* Add your todos list here */}
        </div>
      </div>
    </Sidebar>
  );
}

import Sidebar from "./sidebar";

export default function AppLayout({ children }) {
    return (
      <div className="bg-gray-50">
        <div className="bg-white rounded-md shadow-md p-0 w-full max-w-sm">
            <Sidebar />
          {children}
        </div>
      </div>
    );
  }
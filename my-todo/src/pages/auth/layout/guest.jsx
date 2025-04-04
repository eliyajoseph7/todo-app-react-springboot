export default function GuestLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white rounded-md shadow-md p-0 w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}
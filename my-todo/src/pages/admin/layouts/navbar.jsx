export default function Navbar() {
    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
  return (
    <nav className="bg-white border-gray-200 dark-remove:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className=""></div>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark-remove:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark-remove:bg-gray-700 dark-remove:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark-remove:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm  text-gray-500 truncate dark-remove:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark-remove:hover:bg-gray-600 dark-remove:text-gray-200 dark-remove:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#" onClick={() => handleLogout()}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark-remove:hover:bg-gray-600 dark-remove:text-gray-200 dark-remove:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark-remove:text-gray-400 dark-remove:hover:bg-gray-700 dark-remove:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

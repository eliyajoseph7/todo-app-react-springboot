import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faFolder,
  faCalendar,
  faFileLines,
  faChartBar,
  faChevronLeft,
  faMoon,
  faSun,
  faHouse,
  faList,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faCheckCircleAlt } from "@fortawesome/free-regular-svg-icons";
import Navbar from "./navbar";

const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [activeSubItem, setActiveSubItem] = useState(null);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navItems = [
    { name: "Dashboard", icon: faHouse, count: null, url: "/dashboard" },
    { name: "Todos", icon: faList, count: null, url: "/todos/list" },
    {
      name: "Completed",
      icon: faCheckCircleAlt,
      count: 12,
      url: "/todos/completed",
    },
    { name: "Reports", icon: faChartBar, count: null, url: null },
  ];

  var currentUrl = window.location.pathname;
  var currentPath = currentUrl.split("/").pop();
  var currentItem = navItems.find((item) => item.url === currentUrl);
  // console.log("currentItem", currentItem);
  // console.log("currentPath", currentPath);
  // console.log("currentUrl", currentUrl);

  //   if (currentItem) {
  //     setActiveItem(currentItem.name);
  //   } else {
  //     const foundItem = navItems.find((item) => item.url === currentPath);
  //     if (foundItem) {
  //       setActiveItem(foundItem.name);
  //     }
  //   }

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } border-r ${
          darkMode ? "border-gray-700" : "border-gray-200"
        } p-4 flex flex-col`}
      >
        {/* Collapse button */}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-full cursor-pointer ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } mb-6 flex items-center justify-between`}
        >
          <div className="font-bold text-purple-700">
            {collapsed ? "MT" : "My Todo"}
          </div>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={`h-5 w-5 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full hidden ${
            darkMode
              ? "bg-gray-700 text-yellow-300"
              : "bg-gray-100 text-gray-700"
          } mb-6 self-${collapsed ? "center" : "start"}`}
        >
          <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            className="h-5 w-5"
          />
        </button>

        <h1
          className={`text-xl font-bold mb-6 hidden ${
            collapsed ? "text-center" : ""
          }`}
        >
          {collapsed ? "D" : "Dashboard"}
        </h1>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <a
              href={`${item.url}`}
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`flex items-center ${
                collapsed ? "justify-center px-2" : "justify-between px-3"
              } py-2 rounded-md hover:text-purple-700 ${
                currentUrl === item.url
                  ? darkMode
                    ? "bg-gray-700 text-purple-700"
                    : "bg-gray-100 text-purple-700"
                  : darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </div>
              {!collapsed && item.count && (
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    darkMode
                      ? "bg-gray-600 text-gray-200"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.count}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* User profile */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div
            className={`flex items-center ${collapsed ? "justify-center" : ""}`}
          >
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User profile"
            />
            {!collapsed && (
              <span className="ml-3 text-sm font-medium">Tom Cook</span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <Navbar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        {/* Main content area */}
        <div className="flex-1 p-8">
          
          {/* Main content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

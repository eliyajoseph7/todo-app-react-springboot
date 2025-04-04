module.exports = {
    darkMode: false,
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // ← Required
      ],
      plugins: [
        require("flowbite/plugin"), // ← Required
      ],
  }
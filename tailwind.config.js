module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',  // Make sure this includes your files
      ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',     // Very small phones
        'iphone-se': '375px',  // iPhone SE, iPhone 12/13 mini
        'iphone': '390px',     // iPhone 12/13/14 Pro
        'iphone-plus': '414px', // iPhone Plus models
        'sm': '640px',         // Keep default small
        'md': '768px',         // Keep default medium
        'lg': '1024px',        // Keep default large
        'xl': '1280px',        // Keep default extra large
        '2xl': '1536px',       // Keep default 2x large
      }
    }
  }
}

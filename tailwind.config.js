/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [require('daisyui')],
  safelist: [
    {
      pattern:
        /(bg|to|via|from|text|ring|fill|caret|stroke|border|divide|accent|shadow|outline|decoration|placeholder|ring-offset)-(primary|secondary|accent|neutral|base|info|success|warning|error).*?/
    }
  ]
}

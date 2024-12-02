/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        background: "hsl(var(--color-background) / <alpha-value>)",
        muted: "hsl(var(--color-muted) / <alpha-value>)",
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        foreground: "hsl(var(--color-foreground) / <alpha-value>)",
        card: "hsl(var(--color-card) / <alpha-value>)",
        "card-dark": "hsl(var(--color-card-dark) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",
        "border-dark": "hsl(var(--color-border-dark) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}

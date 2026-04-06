import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      zIndex: {
        100: '100',
        999: '999',
      },
      colors: {
        bg: '#f8f9fa',
        surface: '#ffffff',
        surface2: '#f6f8fb',
        border: '#d0d7de',
        accent: '#0969da',
        accent2: '#1a7f0e',
        accent3: '#d15417',
        accent4: '#6f42c1',
        text: '#24292f',
        muted: '#57606a',
        finance: '#0969da',
        health: '#1a7f0e',
        math: '#bd3e0f',
        tools: '#0969da',
        lifestyle: '#6f42c1',
      },
      fontFamily: {
        'space-mono': ['Space Mono', 'monospace'],
        sora: ['Sora', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config

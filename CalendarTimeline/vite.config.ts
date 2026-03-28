import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CalendarTimeline/',
  define: {
    // react-calendar-timeline uses `global` from Node — polyfill for browser
    global: {},
  },
})

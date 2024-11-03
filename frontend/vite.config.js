import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [{ find: '@', replacement: '/src' }]
	},
	server: {
		port: 8447,
		proxy: {
			'/api': {
				target: 'http://localhost:3028'
			}
		}
	}
});

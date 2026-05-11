import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 배포 시 /<repo>/ 하위 경로에서 정적 자산을 올바르게 로드하도록 base를 고정합니다.
export default defineConfig({
  base: '/Test/',
  plugins: [react()],
});

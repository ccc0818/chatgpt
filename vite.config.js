import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import postcssPresetEnv from "postcss-preset-env"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    http: true,
    ssr: false,
    cors: true,
    proxy: {
      "/api": {
        //目标代理到线上服务器
        target: "http://localhost:8080/",
        changeOrigin: true, //开启代理
        //别名替换
        rewrite: (path) => path.replace(/^\/api/, ""),
        // ws: true, //socket协议开启
      },
    }
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnv()]
    }
  }
})

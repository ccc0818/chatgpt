import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import postcssPresetEnv from "postcss-preset-env";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { autoComplete, Plugin as importToCDN } from "vite-plugin-cdn-import";
import externalGlobals from "rollup-plugin-external-globals";

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        externalGlobals({
          vue: "Vue",
          "vue-demi": "VueDemi",
          "vue-router": "VueRouter",
          axios: "axios",
          pinia: "Pinia",
          vant: "vant",
          "weixin-js-sdk": "wx",
        }),
      ],
      terserOptions: {
        //打包后移除console和注释
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      output: {
        manualChunks: (filepath) => {
          if (filepath.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // viteCompression({ deleteOriginFile: true}),
    importToCDN({
      prodUrl: "https://unpkg.com/{name}@{version}/{path}",
      modules: [
        autoComplete("axios"),
        autoComplete("vue"),
        autoComplete("@vueuse/shared"),
        {
          name: "vant",
          var: "vant",
          version: "4.0.7",
          path: "lib/vant.min.js",
          css: "lib/index.css",
        },
        {
          name: "vue-router",
          var: "VueRouter",
          version: "4.1.6",
          path: "dist/vue-router.global.js",
        },
        {
          name: "pinia",
          var: "Pinia",
          version: "2.0.28",
          path: "dist/pinia.iife.js",
        },
        {
          name: "weixin-js-sdk",
          var: "wx",
          path: "https://res2.wx.qq.com/open/js/jweixin-1.6.0.js",
        },
      ],
    }),
    visualizer({
      emitFile: false,
      // filename: "report.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 8080,
    open: false,
    http: true,
    ssr: false,
    cors: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnv()],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variable.scss";`,
      },
    },
  },
});

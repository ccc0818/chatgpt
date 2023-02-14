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
          "vue-router": "VueRouter",
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
        autoComplete("vue"),
        {
          name: "vue-router",
          var: "VueRouter",
          version: "4.1.6",
          path: "dist/vue-router.global.js",
        },
      ],
    }),
    // visualizer({
    //   emitFile: false,
    //   // filename: "report.html",
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
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
    extensions: ['.js', '.vue', '.json'],
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

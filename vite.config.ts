import { defineConfig,loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; //这个path用到了上面安装的@types/node
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver';

import viteCompression from 'vite-plugin-compression'


// https://vitejs.dev/config/
export default ({mode})=> {
  console.log('mode', loadEnv(mode, process.cwd()).VITE_BASE_URL); 
  return defineConfig({
    base: "./",
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      {
        ...viteCompression(),
        apply: 'build',
      },
    ],
    //这里进行配置别名
    resolve: {
      alias: {
        "@": path.resolve("./src"), // @代替src
        "#": path.resolve("./types"), // #代替types
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/index.scss";',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8080, 
      open: true,
      https: false,
      proxy: {
        '/apis': {
          // 配置跨域地址
          target: 'localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            elementIcons: ['@element-plus/icons-vue'],
          },
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",

        },
      },
    },
  

  });
}

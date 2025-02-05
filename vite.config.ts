import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
  plugins: [
     remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "components/CreateBlogPost.tsx", {index:true});
          route("/blog/list", "components/ListBlogPost.tsx");
          route("/blog/edit/:objectId", "components/EditBlogPost.tsx")
        });
      },
    }),
    tsconfigPaths(),
  ],
});

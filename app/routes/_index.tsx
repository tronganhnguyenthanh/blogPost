import type { MetaFunction } from "@remix-run/node";
import {Route, Routes} from "react-router-dom";
import CreateBlogPost from "~/components/CreateBlogPost";
import GetListBlogPost from "~/components/ListBlogPost";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <Routes>
        <Route path="/" element={<CreateBlogPost/>}/>
        <Route path="/blog/list" element={<GetListBlogPost/>}/>
      </Routes>
    </div>
  );
}

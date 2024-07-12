import axios from "axios"
import {headers} from "~/headers/headers"
export const loader = async () => {
  try{
   let blogPost = await axios.get("https://crud.b4a.io/classes/blog", {headers:headers})
   return blogPost?.data?.results
  }catch(error){
    console.error("Error fetching blog data:", error);
    throw error
  }
}
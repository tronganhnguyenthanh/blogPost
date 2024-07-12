import axios from "axios"
export const loader = async () => {
  try{
   let headers = {
    "X-Parse-Application-Id":"PpK3SDzdouwf41zij4aWWg01cC4Dir1ihwhDgPwI",
    "X-Parse-REST-API-Key":"BoxlFY1i2LuosBo0jEMtht1AgqfKKoEjZMlH22GS",
    "Content-Type":"application/json" 
   }
   let blogPost = await axios.get("https://crud.b4a.io/classes/blog", {headers:headers})
   return blogPost?.data?.results
  }catch(error){
    console.error("Error fetching blog data:", error);
    throw error
  }
}
import axios from "axios"
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {loader} from "~/fetchBlogPost/fetchBlogPost"
import Blog from "~/types/Blog.type"
import loading from "../../public/assets/loading.gif"
function GetListBlogPost() {
  const [blogPost, setBlogPost] = useState<(Blog | null)[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
   getBlogPost()
  },[])
  const getBlogPost = async () => {
    let blogPostList = await loader()
    if(isLoading){
     setIsLoading(!isLoading)
    }
    setBlogPost(blogPostList)
    console.log(isLoading)
  }
  const goBack = () => {
    navigate("/")
  }
  const redirectToEditBlogPost = (objectId:any) => {
    navigate(`/blog/edit/${objectId}`)
  }
  const handleDelete = async (objectId:any) => {
    let headers = {
     "X-Parse-Application-Id":"PpK3SDzdouwf41zij4aWWg01cC4Dir1ihwhDgPwI",
     "X-Parse-REST-API-Key":"BoxlFY1i2LuosBo0jEMtht1AgqfKKoEjZMlH22GS",
     "Content-Type":"application/json" 
    }
    await axios.delete(`https://crud.b4a.io/classes/blog/${objectId}`, {headers:headers})
    toast?.success("Blog post deleted successfully", {position:"top-center"})
  }
  return (
    <div className="container mx-auto">
      <ToastContainer/>
      <h2 className="text-2xl text-center text-green-400">Blog list</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 p-2">
        {isLoading 
         ? 
         <div className="flex justify-center">
           <img src={loading} alt=""/>
         </div>
         : 
         blogPost?.length > 0 && blogPost?.map((i, index) => {
          return (
            <div className="border border-gray-300 p-2 hover:border-red-800" key={index}>
              <h2 className="text-2xl text-center text-blue-400 cursor-pointer hover:text-purple-400">{i?.title}</h2>
              <p className="text-center text-gray-500 cursor-pointer hover:text-orange-500 truncate overflow-hidden" title={i?.description}>{i?.description}</p>
              <div className="flex justify-center">
                <button
                  className="px-4 py-1 m-2 text-sm text-blue-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  type="button"
                  onClick={() => redirectToEditBlogPost(i?.objectId)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-1 m-2 text-sm text-red-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  type="button"
                  onClick={() => handleDelete(i?.objectId)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })
        }
      </div>
      <div className="flex justify-end p-2">
        <button
          className="px-4 py-1 m-2 text-sm text-gray-600 font-semibold hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          type="button"
          onClick={goBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
export default GetListBlogPost
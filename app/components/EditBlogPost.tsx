import {useNavigate, useParams} from "react-router-dom"
import blogLogo from "../../public/assets/blog.png"
import {useEffect, useState} from "react"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import Blog from "~/types/Blog.type"
import {headers} from "~/headers/headers"
function EditBlogPost(){
  const {objectId} = useParams()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [blogPostId, setBlogPostId] = useState<(Blog | null)>(null)
  const navigate = useNavigate()
  useEffect(() => {
   getBlogPostById(objectId)
  },[objectId])
  const getBlogPostById = async (objectId:any) => {
   let editBlog = await axios.get(`https://crud.b4a.io/classes/blog/${objectId}`, {
     headers:headers
   })
   const data = editBlog?.data
   setBlogPostId(data)
   setTitle(data?.title)
   setDescription(data?.description)
  }
  const editBlogPost = async () => {
   if(title === ""){
    toast?.error("Please enter your title", {position:"top-center"})
    return false
   }
   if(description === ""){
    toast?.error("Please enter your description", {position:"top-center"})
    return false
   }else{
     let blog = {
      title:title,
      description:description
     }
     await axios.put(`https://crud.b4a.io/classes/blog/${objectId}`, blog, {
      headers:headers
     })
     toast?.success("Blog post edited successfully", {position:"top-center"})
     setTitle("")
     setDescription("")
     navigate("/blog/list")
   }
  }
  return(
   <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
     <ToastContainer/>
     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <img className="mx-auto h-10 w-auto" src={blogLogo} alt="My blog"/>
       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue-950 cursor-pointer hover:text-orange-500">Edit blog</h2>
     </div>
     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
          <div className="mt-2">
            <input 
              name="title" 
              type="text" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-2 sm:text-sm sm:leading-6 cursor-pointer"
              value={title}
              onChange={(e) => setTitle(e?.target?.value)}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
          </div>
          <div className="mt-2">
            <textarea 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-2 sm:text-sm sm:leading-6 cursor-pointer"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e?.target?.value)}
            />
          </div>
        </div>
        <div>
          <button 
            type="button" 
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={editBlogPost}
           >
            Edit
          </button>
        </div>
      </form>
    </div>
   </div>
  )
}
export default EditBlogPost
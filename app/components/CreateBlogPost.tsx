import {useState} from "react"
import blogLogo from "../../public/assets/blog.png"
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {useNavigate} from "react-router-dom"
export default function CreateBlogPost(){
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()
  const createBlogPost = async () => {
    if(title === ""){
     toast?.error("Please enter your title", {position:"top-center"})
     return false
    }
    if(description === ""){
     toast?.error("Please enter your description", {position:"top-center"})
     return false
    }else{
      let headers = {
       "X-Parse-Application-Id":"PpK3SDzdouwf41zij4aWWg01cC4Dir1ihwhDgPwI",
       "X-Parse-REST-API-Key":"BoxlFY1i2LuosBo0jEMtht1AgqfKKoEjZMlH22GS",
       "Content-Type":"application/json"
      }
      let blog = {
       title:title,
       description:description
      }
      await axios.post("https://crud.b4a.io/classes/blog", blog, {
        headers:headers
      })
      toast?.success("Blog post added successfully", {position:"top-center"})
      setTitle("")
      setDescription("")
      setTimeout(() => {
       navigate("/blog/list")
      },1000)
      return true
    }
  }
  return(
  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <ToastContainer/>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src={blogLogo} alt="My blog"/>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue-900 cursor-pointer hover:text-orange-500">Create a blog</h2>
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
              value={description}
              onChange={(e) => setDescription(e?.target?.value)} 
              rows={5}
            />
          </div>
        </div>
        <div>
          <button 
            type="button" 
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={createBlogPost}
           >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}
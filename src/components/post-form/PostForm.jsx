import React,{useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from "../index"
import appwriteService from "../../appwrite/config"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

function PostForm({post}) {

    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title:post?title:"",
             content:post?content:"",
             slug:post?slug:"",
             status:post?status:"active",
        },
    })

    const navigate=useNavigate()
    const userData=useSelector((state)=>state.auth.userData)
    const submit=async(data)=>{
        if(post){
           const file = data.image[0]? appwriteService.uploadFile(data.iamge[0]) :null
           if(file)
           {
                appwriteService.deleteFile(post.featuredImage)
           }
           const dbPost=await appwriteService.updatePost (post.$id,{
                ...data,
                featuredImage:file?file.$id:undefined,
           })
           if(dbPost)
            {
                navigate(`/post/${dbPost.$id}`)
            }
            else
            {
                const file=await appwriteService.uploadFile(data.image[0])
                if(file)
                {
                    const fileId=file.$id
                    data.featuredImage=fileId
                    const dbPost=await appwriteService.createPost({
                        ...data
                        userId:userData.$id
                    })
                    if(dbPost)
                    {
                        navigate(`/post/${dbPost.$id}`)
                    }

                }
            }
                    
        }
    }

    const slugTransform=useCallback((value)=>{
        if(value &&typeof value==="string")
        {
            return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^\w\s]/g, "")
                    .replace(/\s+/g, "-");
        }
    })
  return (
    <div>PostForm</div>
  )
}

export default PostForm
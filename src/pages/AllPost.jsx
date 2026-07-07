import React,{useState,useEffect}from 'react'
import service from '../appwrite/config'
import { Container,PostCard } from '../components'
function AllPost() {

    const [post,setPosts]=useState([])
    useEffect(()=>{},[])
    service.getPosts([]).then((posts)=>setPosts(posts))
        if(posts)
        {
            setPosts(posts.documents)
        }
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {post.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost
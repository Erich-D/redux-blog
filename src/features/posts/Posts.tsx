import { useGetPostsQuery } from "./postsApi";
import Post from "../../components/post/Post";
import LoadErrors from "../../components/loaderrors/LoadErrors";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import PaginationControl from "../../components/pagination/PaginationControl";

export interface PostsProps{
    content?: string | number 
}

export default function Posts({content='feed'}:PostsProps) {
    const [url, setUrl] = useState("")
    const [param, setParam] = useState(0)
    const { data, isFetching, isError, error, refetch} = useGetPostsQuery(!url ? skipToken : param===0 ? {uri:url}:{uri:url,offset:param})

    useEffect(()=>{
        const uri = typeof content === 'number' ? `/users/${content}/posts`: content === 'explore' ? '/posts':'/feed'
        setUrl(uri)
    },[content,param])

    const loadNextPage = (pg:number) => {
        setParam((pg-1)*data!.pagination.limit)
        //console.log(pg)
        refetch()
      };
    
    const loaderror = !data || isFetching || isError

    return (
      <>
        {
            loaderror ? <LoadErrors isNotData={!data} isFetching={isFetching} isError={isError} error={error}/>
            :
            data!.data!.length === 0 ? <p>There are no blog posts. </p>
            :
            data!.data!.map(post => <Post key={post.id} {...post}/>)

        }
        {data?.pagination && <PaginationControl pagination={data!.pagination} loadPage={loadNextPage} />}
      </>
    );
  }
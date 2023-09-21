import { Pagin } from '../../features/posts/PostTypes';
import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from 'react';

interface MoreProps{
    pagination:Pagin
    loadPage:any
}

export default function PaginationControl({ pagination, loadPage }:MoreProps) {
  const {offset, count, total, limit}:Pagin = pagination ? pagination:{offset:0, count:0, total:0, limit:0}
  const [pageArray, setPageArray] = useState([[0,0],]);
  useEffect(()=>{
    const wholepages = (total && limit) ? Math.trunc(total/limit):0;
    const pages = !(total && limit) ? 0:total%limit>0 ? wholepages+1:wholepages
    const page = !(limit) ? 0:offset===0 ? 1:Math.trunc(offset/limit)+1 
    const array = []
    array.push([page,pages]);
    if(pages<=9){
      for(let i=1;i<=pages;i++){
        array.push([i,i])
      }
    }else{
      if(page <= 5){
        array.push.apply(array,[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[-1,pages-7>=5 ? 5+5:pages-7>=4 ? 5+4:5+3],[pages,pages]])
      }else if(pages-page <= 4){
        array.push.apply(array,[[1,1],[-1,page>=5 ? page-5:page>=4 ? page-4:page-3],[pages-6,pages-6],[pages-5,pages-5],[pages-4,pages-4],[pages-3,pages-3],[pages-2,pages-2],[pages-1,pages-1],[pages,pages]])
      }else{
        array.push.apply(array,[[1,1],[-1,page>=5 ? page-5:page>=4 ? page-4:page-3],[page-2,page-2],[page-1,page-1],[page,page],[page+1,page+1],[page+2,page+2],[-1,pages-7>=5 ? 5+5:pages-7>=4 ? 5+4:5+3],[pages,pages]])
      }
    }
    setPageArray(array)
  },[offset, count, total, limit])
  // set size in <Pagination> tag to 'sm' or 'lg' for bigger or smaller items
  return (
    <Pagination>
      {offset<1 ? <Pagination.First disabled/>:<Pagination.First onClick={()=>{loadPage(1)}}/>}
      {pageArray[0][0]<2 ? <Pagination.Prev disabled={true}/>:<Pagination.Prev onClick={()=>{loadPage(pageArray[0][0]-1)}}/>}
      {pageArray.map((el,i,arr) => i === 0 ? <></>:el[0]<0 ? <Pagination.Ellipsis key={i+el[1]} onClick={()=>{loadPage(el[1])}} />:<Pagination.Item key={i+el[1]} active={arr[0][0]===el[0]} onClick={()=>{loadPage(el[1])}}>{el[0]}</Pagination.Item>)}
      {pageArray[0][0]>pageArray[0][1]-2 ? <Pagination.Next disabled />:<Pagination.Next onClick={()=>{loadPage(pageArray[0][0]+1)}}/>}
      {pageArray[0][0]===pageArray[0][1] ? <Pagination.Last disabled/>:<Pagination.Last onClick={()=>{loadPage(pageArray[0][1]-1)}}/>}
    </Pagination>
  );
}
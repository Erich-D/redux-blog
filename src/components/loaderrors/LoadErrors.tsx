import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { Spinner } from "react-bootstrap";

export interface LoadErrorsType{
    isNotData?:boolean 
    error?: FetchBaseQueryError | SerializedError | undefined
    isUninitialized?: boolean 
    isLoading?: boolean
    isFetching?: boolean 
    isError?: boolean
}

export default function LoadErrors({isNotData=false,isUninitialized=false,isLoading=false,isFetching=false,isError=false,error=undefined}:LoadErrorsType){

    function getError(error:any){
        if (error) {
            if ('status' in error) {
              // you can access all properties of `FetchBaseQueryError` here
              const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
        
              return (
                <div>
                  <div>An error has occurred:</div>
                  <div>{errMsg}</div>
                </div>
              )
            }
            else {
                // you can access all properties of `SerializedError` here
                return <div>{error.message}</div>
            }
        }
    }

    return <>
        {isNotData ? <p>No data available</p>
        :
        isUninitialized ? <p>Component initializing</p>
        :
        isLoading ? <p>Component loading</p>
        :
        isFetching ? <Spinner animation="border" />
        :
        isError ? <><p>An error has occured </p>{getError(error)}</>
        :
        <></>}
    </>
}
import { Stack,Image, Spinner } from "react-bootstrap"
import TimeAgo from "../../components/timeago/TimeAgo"
import { useGetUserQuery } from "./userApi"
import LoadErrors from "../../components/loaderrors/LoadErrors"
import Posts from "../posts/Posts"


interface UserType{
    name:string
}

export default function User({name}:UserType){

    const { data, isFetching, isError, error} = useGetUserQuery(name)
    const loaderror = !data || isFetching || isError

    return<>
        {
            loaderror ? <LoadErrors isNotData={!data} isFetching={isFetching} isError={isError} error={error}/>
            :
            <>
            <Stack direction="horizontal" gap={4}>
              <Image src={data.avatar_url + '&s=128'} roundedCircle />
              <div>
                <h1>{data.username}</h1>
                {data.about_me && <h5>{data.about_me}</h5>}
                <p>
                  Member since: <TimeAgo isoDate={data.first_seen} />
                  <br />
                  Last seen: <TimeAgo isoDate={data.last_seen} />
                </p>
              </div>
            </Stack>
            <Posts content={data.id}/>
            </>
        }
    </>
}
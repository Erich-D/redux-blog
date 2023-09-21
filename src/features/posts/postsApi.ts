import {blogApi} from '../../store/blogApi'
import { FeedArray, PostDef } from './PostTypes'

interface PostsApiType{
    uri: string 
    offset?: number
}

export const postApi = blogApi.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<FeedArray,PostsApiType>({
            query: arg => {
                console.log(arg)
                let query = new URLSearchParams({'offset':`${arg.offset}`} || {}).toString();
                const args = arg.offset ? `${arg.uri}?${query}`:`${arg.uri}`
                return args
            },
            // Example of capturing response and atering data befere returning it
            transformResponse: (response:FeedArray, meta, args) => {
                const posts:PostDef[] = response.data.map<PostDef>(val => {return{...val, author:{...val.author, avatar_url:val.author.avatar_url.replace("identicon","robohash")}}})
                return{...response, data:posts}
            },
            providesTags: (result, error, page) =>
                result
                ? [
                    // Provides a tag for each post in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.data.map(({ id }) => ({ type: 'Posts' as const, id })),
                    { type: 'Posts', id: 'PARTIAL-LIST' },
                    ]
                : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
            // configuration for an individual endpoint, overriding the api setting for seconds cache kept after last subscription default global = 60
            keepUnusedDataFor: 60, 
        }),
    })
})

export const { useGetPostsQuery } = postApi

export type TypePosts = typeof useGetPostsQuery

export type PostsTypes = TypePosts 

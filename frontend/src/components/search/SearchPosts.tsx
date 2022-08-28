import { UseCurrentUser } from "../../contexts/userCtx"
import Post from "../post/Post"
import './SearchPeople.css'

export default function SearchPosts({ props }: { props: any }) {
    return (
        <div className="search_post__container">
            {props == undefined ? (
                ""
            ) : (
                props.search.posts.map((post: any) => (
                    <div className="search__posts">
                        <Post props={post} />
                    </div>
                ))
            )}
        </div>
    )
}
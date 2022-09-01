import { useMutation, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/header/Header"
import SearchHeader from "../../components/search/SearchHeader"
import SearchPeople from "../../components/search/SearchPeople"
import SearchPosts from "../../components/search/SearchPosts"
import { UseCurrentTheme } from "../../contexts/themeCtx"
import { SEARCH_QUERY } from "../../query-queries"

export default function SearchFilter() {
    const { getTheme } = UseCurrentTheme()
    const { type, keyword, page } = useParams()
    const { data, loading, error } = useQuery(SEARCH_QUERY, {
        variables: {
            keyword: keyword,
            limit: 10,
            offset: 0
        }
    })

    if (data)
        console.log(data);


    return (
        <div className="app" style={{ ...getTheme() }}>
            <>
                <Header />
                <SearchHeader />
                <div className="search__body">
                    {data ? (
                        type == "all" ? (
                            <div className="search__all">
                                <h2>Posts</h2>
                                <SearchPosts props={data} />
                                <h2>People</h2>
                                <SearchPeople props={data} />
                            </div>
                        ) : type == "posts" ? (
                            <SearchPosts props={data} />
                        ) : (
                            <SearchPeople props={data} />
                        )
                    ) : ""}
                    
                </div>
            </>
        </div>
    )
}
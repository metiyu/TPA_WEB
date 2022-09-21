import { useNavigate, useParams } from 'react-router-dom'
import './SearchHeader.css'

export default function SearchHeader() {
    const navigate = useNavigate()
    const { keyword, page } = useParams()

    return (
        <div className="header__search">
            <div className='button_filter'>
                <button onClick={() => navigate(`/search/all/keyword=${keyword}/page=${page}`)}>All</button>
                <button onClick={() => navigate(`/search/posts/keyword=${keyword}/page=${page}`)}>Posts</button>
                <button onClick={() => navigate(`/search/people/keyword=${keyword}/page=${page}`)}>People</button>
            </div>
        </div>
    )
}
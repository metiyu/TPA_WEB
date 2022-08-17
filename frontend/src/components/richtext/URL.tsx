import { useNavigate } from "react-router-dom"
import './URL.css'

export default function URL(text: any, url: any){
    const navigate = useNavigate()
    
    return(
        <span className="url" onClick={() => navigate('/' + {url})}>
            {text}
        </span>
    )
}
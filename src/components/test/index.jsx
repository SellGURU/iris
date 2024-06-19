import {useParams} from "react-router-dom";
export const Test = () => {
    const {username} = useParams();
    return (
       <>
       <h1>{username}</h1>
       </>
    )
}

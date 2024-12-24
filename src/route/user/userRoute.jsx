import MyPlaylist from "../../components/MYPlayList"
import Dashboard from "../../pages/Dashboard"

export const userRoute=()=>{
    return [
        {
            element:<Dashboard />,
            path:"/dashboard"
        },
        {
            element:<MyPlaylist />,
            path:"/myplaylist"
        }

    ]
}
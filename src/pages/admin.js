import React, {useState} from "react"
import LoginForm from "../components/admin/login-form";
import myPhoto from "../images/konrad_drozd.jpg"
import myPhotoSmile from "../images/konrad_drozd_smile.jpg"
import ProgressBar from "../components/admin/progress-bar";
import RickRoll from "../components/admin/rick-roll";

const AdminPage = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [rickRolled, setRickRolled] = useState(false)

    const onLoginSuccess = () => {
        setLoggedIn(true)
        typeof window.gtag !== "undefined" && window.gtag('event', 'admin_login_success', {})
    }

    const onProgressBarFinished = () => {
        setRickRolled(true)
        typeof window.gtag !== "undefined" && window.gtag('event', 'rick_rolled', {})
    }

    return (

        <div className="h-full flex justify-center">
            <div className="mt-10 sm:w-1/3 flex flex-col mx-auto items-center">
                <div className="flex">
                    <img
                        className={"w-32 max-h-40 rounded-full"}
                        alt="Konrad Drozd"
                        src={rickRolled ? myPhotoSmile : myPhoto}
                    ></img>
                </div>
                <div className="flex w-full m-4 justify-center">
                    {
                        rickRolled ? <RickRoll/> :
                            loggedIn ? <ProgressBar onFinished={onProgressBarFinished}/> :
                                <LoginForm onLoginSuccess={onLoginSuccess}/>
                    }
                </div>
            </div>
        </div>

    )
}

export default AdminPage
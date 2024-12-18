import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { UserContext } from "../App";
import { useContext } from "react";
import React from 'react';
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () =>{
    const {userAuth: {username}, setUserAuth} = useContext(UserContext)

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({ access_token:null})
    }

    return(
            <div className="absolute right-0 z-50">
            <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
            <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
                <i className="fi fi-rr-file-edit"></i>
                <p>Write</p>
            </Link>
            <Link to={`/user/${username}`} className="link pl-8 py-4">
                Profile
            </Link>
            <Link to={`/dashboard/${username}`} className="link pl-8 py-4">
                Dashboard
            </Link>
            <Link to={`/settings/edit-profile`} className="link pl-8 py-4">
                Settings
            </Link>
            <span className="absolute border-t border-grey w-[100%]"></span>
            <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4" onClick={signOutUser}>
                <h1 className="font-bold text-xl mg-1">Logout</h1>
                <p>@{username}</p>
            </button>
            </div>
            </div>

            
        
        
    
    )
}

export default UserNavigationPanel;
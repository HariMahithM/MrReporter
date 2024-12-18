import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useState } from "react";
import { lookInSession } from "./common/session";
import { useEffect } from "react";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import BlogPage from "./pages/blog.page";

export const UserContext = createContext({})

const App = () => {
    const [userAuth, setUserAuth] = useState({});

    useEffect(()=>{
        let userInSession = lookInSession("user");
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token: null})
    }, [])
    
    return (
        <UserContext.Provider value={{userAuth, setUserAuth}}>
            <Routes>
                <Route path="/editor" element ={<Editor />}/>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/signin" element={<UserAuthForm type="sign-in"/>}/>   
                    <Route path="/signup" element={<UserAuthForm type="sign-up"/>}/>
                    <Route path="blog/:blog_id" element={<BlogPage />}/>
                </Route>
            </Routes>
        </UserContext.Provider>
    )
}

export default App;
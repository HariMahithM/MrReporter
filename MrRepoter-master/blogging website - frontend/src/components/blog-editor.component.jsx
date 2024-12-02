import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/log.png";
import defaultBanner from "../imgs/blog banner.png"
import { useContext, useEffect, useRef } from "react";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import {tools} from "./tools.component";
import { useState } from "react";
import sports1 from "../imgs/sports1.jpg";
import sports2 from "../imgs/sports2.jpg";
import sports3 from "../imgs/sports3.jpg";
import sports4 from "../imgs/sports4.jpg";
import sports5 from "../imgs/sports5.jpg";
import politics1 from "../imgs/politics1.png";
import politics2 from "../imgs/politics2.jpg";
import politics3 from "../imgs/politics3.jpg";
import politics4 from "../imgs/politics4.png";
import politics5 from "../imgs/politics5.jpg";
import nature1 from "../imgs/nature1.jpeg";
import nature2 from "../imgs/nature2.jpg";
import nature3 from "../imgs/nature3.jpg";
import nature4 from "../imgs/nature4.jpg";
import nature5 from "../imgs/nature5.jpg";
import {toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../App";



const BlogEditor =() => {

    const categoryImages = {
        sports: [sports1, sports2, sports3, sports4, sports5],
        politics: [politics1, politics2, politics3, politics4, politics5],
        nature: [nature1, nature2, nature3, nature4, nature5],
    };

    let blogBannerRef = useRef();
    let { blog, blog: {title,banner,content,target,tags,des},setBlog, textEditor,setTextEditor,setEditorState} = useContext(EditorContext)

    let { userAuth : {access_token} } = useContext(UserContext)

    let navigate = useNavigate()

    //use Effect
    useEffect(()=>{
        if(!textEditor.isReady){
            setTextEditor(new EditorJS({
                holderId: "textEditor",
                data: content,
                tools: tools,
                placeholder: "Share your story"
        }))
        }
        
    }, [])

    const handleBannerUpload = (e) =>{
        let img = e.target.files[0];
        //setBlog({...blog, banner:url})
    }

    const handleTitleKeyDown = (e) =>{
        if(e.keyCode == 13){
            e.preventDefault();
        }
    }

    const handleTitleChange = (e) =>{
        let input = e.target;
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + "px";

        setBlog({...blog, title:input.value})
    }

    const handleError = (e) =>{
        let img = e.target;
        //img src = defaultBanner;
    }

    const [bannerImage, setBannerImage] = useState(defaultBanner);
    const handleCategorySelection = (category) => {
        const selectedImages = categoryImages[category];
        const randomImage = selectedImages[Math.floor(Math.random() * selectedImages.length)];
        setBannerImage(randomImage); 
        setBlog({ ...blog, banner: randomImage });
    };

    const handlePublishEvent = () =>{
        if (!banner.length) {
            console.log("working");
            toast.error("Upload a blog banner to publish", { position: "top-right" }); // Add position here
            return;
        }
        if (!title.length) {
            console.log("working");
            toast.error("Your blog title is empty", { position: "top-right" }); // Add position here
            return;
        }
        if(textEditor.isReady){
            textEditor.save().then(data => {
                if(data.blocks.length){
                    setBlog({...blog, content: data })
                    setEditorState("publish")
                }else{
                    return toast.error("Write Content")
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }

    }
    const handleSaveDraft = (e) => {

        if(e.target.className.includes("disable")){
            return;
        }
        if(!title.length){
            return res.status(403).json({error:"You must provide title for saving draft"})
        }

        let loadingToast = toast.loading("Saving Draft...");
        e.target.classList.add('disable');

        if(textEditor.isReady){
            textEditor.save().then( content =>{

                
                let blogObj = {
                    title,banner,des,content,tags, draft:true
                }

                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",blogObj,{
                    headers:{
                        'Authorization':`Bearer ${access_token}`
                    }
                })
                .then(()=>{
                    e.target.classList.remove('disable');
                    toast.dismiss(loadingToast);
                    toast.success("Saved");
        
                    setTimeout(() => {
                        navigate("/")
                    }, 2000);
            })
            .catch(({response}) =>{
                    e.target.classList.remove('disable'); 
                    toast.dismiss(loadingToast);
                    return toast.error(response.data.error) 
            })
            })
        }


        
    
    }
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="flex-none w-11">
                    <img src={logo}/>
                </Link>
                <p className="max-md:hidden text-black line-clamp-1 w-full">
                    { title.length ? title : "New Blog"}
                </p>
                <div className="flex gap-4 ml-auto">
                    <button className="btn-dark py-2"
                    onClick={handlePublishEvent}>
                        Publish
                    </button>
                    <button className="btn-light py-2" onClick={handleSaveDraft}>
                        Save Draft
                    </button>
                </div>
            </nav>


                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                    <div className="p-4 text-center flex gap-4 ml-auto">
            <button 
                    onClick={() => handleCategorySelection("sports")}
                    className="btn-dark py-1"
                    >
                    Sports
                    </button>
                    <button 
                    onClick={() => handleCategorySelection("politics")}
                    className="btn-dark py-1"
                    >
                    Politics
                    </button>
                    <button 
                    onClick={() => handleCategorySelection("nature")}
                    className="btn-dark py-1"
                    >
                    Nature
                    </button>
                </div>

                {/* Banner Section */}
                <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                    <img src={bannerImage} className="z-20" alt="Selected banner" />
                </div>
                    
                        <textarea 
                        defaultValue={title}
                        placeholder="Blog Title" className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
                        onKeyDown={handleTitleKeyDown}
                        onChange={handleTitleChange}></textarea>

                        <hr className="w-full opacity-10 my-5"/>

                        <div id="textEditor" className="font-gelasio"></div>

                    </div>
                </section>

        </>
        
    )
}


export default BlogEditor;


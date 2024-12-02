import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader.component";
import { Link } from "react-router-dom";
import { getday } from "../common/date";
import BlogContent from "../components/blog-content.component";

export const blogStructure = {
    title: '',
    des: '',
    content: [],
    tags: [],
    author: {personal_info: { } },
    banner: '',
    publishedAt: '',
    activity: { }
}

const BlogPage = () => {
    let { blog_id } = useParams()
    const [blog,setBlog] = useState(blogStructure);
    const [ loading, setLoading ] = useState(true);

    let {title,content,banner,author:{personal_info:{fullname,username:author_username,profile_img}},publishedAt,activity:{total_reads}} = blog;
    
    const fetchBlog = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog",{blog_id})
        .then(({data:{ blog } })=>{
            setBlog(blog);
            setLoading(false);
        })
        .catch(err =>{
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(()=>{
        fetchBlog();
    },[])
    return (
        <>
            {
                loading ? <Loader /> 
                : <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
                    <img src={banner} className="aspect-video"/>
                    <div className="mt-12">
                        <h2>{title}</h2>
                        <div className="flex max-sm:flex-col justify-between my-8">
                            <div className="flex gap-5 items-start">
                                <img src={profile_img} className="w-12 h-12 rounded-full"/>
                                <p className="capitalize"> 
                                    {fullname}
                                    <br />
                                    <Link to={'/'}> @{author_username} </Link>
                                </p>
                            </div>
                            <p className="text-dark-grey opacity-60 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">Published on {getday(publishedAt)}</p>
                        </div>
                    </div>
                    <div className="my-12 font-gelasio blog-page-content">
                        {
                            content[0].blocks.map((block, i)=>{
                                return (
                                    <div key={i} className="my-4 md:my-8">
                                        <BlogContent block={block} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default BlogPage;
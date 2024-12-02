import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";

const HomePage = () => {
    let [blogs, setBlog ] = useState(null);
    let [trendingblogs, settrendingBlog ] = useState(null);
    let [pageState, setPageState ] = useState("home");

    let categories = ["cricket","politics","nature","war","sports","photography"];

    const fetchlatestBlogs = () =>{
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
        .then( ({data})  =>{
            setBlog(data.blogs);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const fetchtrendingBlogs = () =>{
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
        .then( ({data})  =>{
            settrendingBlog(data.blogs);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const loadBlogByCategory = (e) =>{
        let category = e.target.innerText.toLowerCase();
        setBlog(null);
        if(pageState == category){
            setPageState("home");
            return;
        }
        setPageState(category);
    }

    useEffect(() =>{
        fetchlatestBlogs();
        fetchtrendingBlogs();
    }, [])
    return (
        <section className="h-cover flex justify-center gap-10">
            {/*Latest Blog*/}
            <div className="w-full">
                <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
                    <>
                        {
                            blogs == null ? <Loader />:
                            blogs.map((blog, i)=>{
                                return <div key={i}>
                                    <BlogPostCard content={blog} author= {blog.author.personal_info}/>
                                </div>
                            })
                        }
                    </>
                    {
                        trendingblogs == null ? <Loader />:
                        trendingblogs.map((blog, i)=>{
                            return <div key={i}>
                                <MinimalBlogPost blog={blog} index={i}/>
                            </div>
                        })    
                    }
                </InPageNavigation>
            </div>
            {/*filters*/}     
                    <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-5 max-md:hidden">
                        <div className="flex flex-col gap-10">
                            <h1 className="font-medium text-xl mb-8">Stories from all interests</h1>
                            <div>
                                <div className="flex gap-5 flex-wrap">
                                    {
                                        categories.map((category, i) => {
                                            return (
                                                <button onCLick={loadBlogByCategory} className="tag" key={i}> 
                                                    {category}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        
                        <div>
                            <h1 className="font-medium text-xl mb-8">Trending
                            <i className="fi fi-br-arrow-trend-up"></i>
                            </h1>
                            {
                        trendingblogs == null ? <Loader />:
                        trendingblogs.map((blog, i)=>{
                            return <div key={i}>
                                <MinimalBlogPost blog={blog} index={i}/>
                            </div>
                        })    
                    }


                        </div>
                    </div>
                    </div>
        </section>             
    );
}

export default HomePage;
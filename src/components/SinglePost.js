import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Moment from "react-moment";
import Loader from "../skull.webp";

const SinglePost = (props) => {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const wordPressSiteUrl = 'http://localhost:8080/react-wordpress';

    useEffect(() => {
        setLoading(true);
    }, [])

    useEffect(() => {
        axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts/${props.id}`)
            .then(response => {
                setLoading(false);
                setPost(response.data);
            })
            .catch(error => {
                setLoading(false);
                setErrorMessage(error.response.data.message);
            })
    },[loading]);    

    return(
        <div>
            <Navbar/>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {Object.keys(post).length ? (
                <div className="mt-5 post-container">
                    <div key={post.id} className="card border-dark mb-3" style={{width :'50rem'}}>
                        {/* TITLE */}
                        <div className="card-header">
                            {post.title.rendered}
                        </div>

                        {/* BODY */}
                        <div className="card-body">
                            <div className="card-text post-content">
                                {ReactHtmlParser(post.content.rendered)}                
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="card-footer">
                            <Moment fromNow>{post.date}</Moment>
                        </div>
                    </div>
                </div>
            ) : ("")}
            {loading && <img className="loader" src={Loader} alt="Loader"/>}
        </div>
    )
}

export default SinglePost;
import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const SinglePost = (props) => {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const wordPressSiteUrl = 'http://localhost:8080/react-wordpress/';

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
        </div>
    )
}

export default SinglePost;
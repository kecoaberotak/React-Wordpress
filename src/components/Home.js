import React from "react";
import { useState, useEffect } from "react";
import Navbar from './Navbar';
import axios from "axios";
import {Link} from "@reach/router";
import ReactHtmlParser from "react-html-parser";
import Moment from "react-moment";
import Loader from '../skull.webp';
import '../style.css';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const wordPressSiteUrl = 'http://localhost:8080/react-wordpress';

    useEffect(() => {
        setLoading(true);
    }, [])

    useEffect(() => {
        axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts`)
            .then(response => {
                setLoading(false);
                setPosts(response.data);
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
            {posts.length ? (
                <div className="mt-5 post-container">
                    {posts.map( post => (
                        <div key={post.id} className="card border-dark mb-3" style={{width :'50rem'}}>
                            {/* TITLE */}
                            <div className="card-header">
                                <Link to={`/post/${post.id}`}>{post.title.rendered}</Link>
                            </div>

                            {/* BODY */}
                            <div className="card-body">
                                <div className="card-text post-content">
                                    {ReactHtmlParser(post.excerpt.rendered)}                
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="card-footer">
                                <Moment fromNow>{post.date}</Moment>
                                <Link className="btn btn-secondary float-right" to={`/post/${post.id}`}>Read More..</Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : ("")}
            {loading && <img className="loader" src={Loader} alt="Loader"/>}
        </div>
    )
}

export default Home;
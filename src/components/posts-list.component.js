import React, { Component } from "react";
import PostDataService from "../services/post.service";
import { Link } from "react-router-dom";

export default class PostsList extends Component {
  constructor(props) {
    super(props);
    
    this.retrievePosts = this.retrievePosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePost = this.setActivePost.bind(this);
    

    this.state = {
      posts: [],
      currentPost: null,
      currentIndex: -1,     
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  

  retrievePosts() {
    PostDataService.getAll()
      .then(response => {
        this.setState({
          posts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePosts();
    this.setState({
      currentPost: null,
      currentIndex: -1
    });
  }

  setActivePost(post, index) {
    this.setState({
      currentPost: post,
      currentIndex: index
    });
  }


  render() {
    const {posts, currentPost, currentIndex } = this.state;

    return (
    <div>
      <div className="list row">
        
        <div className="col-sm-4">
          <h4>Posts List</h4>

          <ul className="list-group">
            {posts &&
              posts.map((post, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePost(post, index)}
                  key={index}
                >
                  {post.how_saved}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-sm-4"></div>
        
        <div className="col-sm-4">
          {currentPost ? (
            <div>
              <h4>Post</h4>
              <div>
                <label>
                  <strong>How Saved:</strong>
                </label>{" "}
                {currentPost.how_saved}
              </div>
              <div>
                <label>
                  <strong>When Saved:</strong>
                </label>{" "}
                {currentPost.when_saved}
              </div>
              <div>
                <label>
                  <strong>Thanked To:</strong>
                </label>{" "}
                <ul>
                {currentPost.persons.map((person, index) => (
                    <li key = {person.id} value ={person.id}>{person.name}</li>
                    ))}
                   
                </ul>
              </div>

            </div>
          ) : (
            <div>
              <br />
              
            </div>
          )}
        </div>
    </div>
    <div className="list row mt-3">
        <div className="col-md-6">
            <p>{posts ? 'Please click on a Post...': ''}</p>
        </div>
    </div>
    
   
        
    
    
    </div>
      
    );
  }
}
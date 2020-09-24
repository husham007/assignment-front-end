import React, { Component } from "react";
import PostDataService from "../services/post.service";
import PersonDataService from "../services/person.service";
//import PersonsList from "../components/persons-list.component"

export default class AddPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeHowSaved = this.onChangeHowSaved.bind(this);
    this.onChangeWhenSaved = this.onChangeWhenSaved.bind(this);
    this.savePost = this.savePost.bind(this);
    this.newPost = this.newPost.bind(this);
    this.retrievePersons = this.retrievePersons.bind(this);
    this.handleSelect = this.handleSelect.bind(this)

    this.state = {
      id: null,
      how_saved: "",
      when_saved: "", 
      persons: [],
      selectedPersons: [],
      
      submitted: false
    };
  }

  onChangeHowSaved(e) {
    this.setState({
      how_saved: e.target.value
    });
  }

  onChangeWhenSaved(e) {
    this.setState({
      when_saved: e.target.value
    });
  }

  componentDidMount() {
    this.retrievePersons();
  }

  

  retrievePersons() {
    PersonDataService.getAll()
      .then(response => {
        this.setState({
          persons: response.data
        });
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleSelect(e) {
    
    
    let options = e.target.options;
            let value = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(options[i].value);
              }
            }
            this.setState({selectedPersons: [...value]});
    
    
    }


  savePost() {
    var data = {
      how_saved: this.state.how_saved,
      when_saved: this.state.when_saved,
      ids:this.state.selectedPersons
    };
    
    PersonDataService.createPost(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          how_saved: response.data.how_saved,
          when_saved: response.data.when_saved,
          persons: response.data.persons,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPost() {
    this.setState({
      id: null,
      when_saved: "",
      how_saved: "",
      submitted: false,
      selectedPersons: [],
      
      
    });
  }

  render() {
      
    const {persons } = this.state;
    if (!persons){
        this.retrievePersons()
    }

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPost}>
              AddPost
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="how_saved">How Saved</label>
              <input
                type="text"
                className="form-control"
                id="how_saved"
                required
                value={this.state.how_saved}
                onChange={this.onChangeHowSaved}
                name="how_saved"
              />
            </div>

            <div className="form-group">
              <label htmlFor="when_saved">When Saved</label>
              <input
                type="date"
                className="form-control"
                id="when_saved"
                required
                value={this.state.when_saved}
                onChange={this.onChangeWhenSaved}
                name="when_saved"
              />
            </div>

            <div className="form-group">
              <label htmlFor="when_saved">Select People to Thank</label>
                <select multiple className="form-control" onChange={this.handleSelect}>
                {persons.map((person, index) => (
                    <option key = {person.id} value ={person.id}>{person.name}</option>
                    ))}
                   
                </select>
            </div>

            <button onClick={this.savePost} className="btn btn-success">
              Save Post
            </button>
          </div>
        )}
    <div>
       
    </div>
      </div>
    );
  }
}
import React, { Component } from "react";
import PersonDataService from "../services/person.service";
import { Link } from "react-router-dom";

export default class PersonsList extends Component {
  constructor(props) {
    super(props);
    
    this.retrievePersons = this.retrievePersons.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePerson = this.setActivePerson.bind(this);
    

    this.state = {
      persons: [],
      currentPerson: null,
      currentIndex: -1,     
    };
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
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePersons();
    this.setState({
      currentPerson: null,
      currentIndex: -1
    });
  }

  setActivePerson(person, index) {
    this.setState({
      currentPerson: person,
      currentIndex: index
    });
  }


  render() {
    const {persons, currentPerson, currentIndex } = this.state;

    return (
    <div>
      <div className="list row">
        
      <div class="col-sm-4">
          <h4>Persons List</h4>

          <ul className="list-group">
            {persons &&
              persons.map((person, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePerson(person, index)}
                  key={index}
                >
                  {person.name}
                </li>
              ))}
          </ul>
        </div>
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          {currentPerson ? (
            <div>
              <h4>Person</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentPerson.name}
              </div>
              <div>
                <label>
                  <strong>Name2:</strong>
                </label>{" "}
                {currentPerson.name}
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
            <p>{persons ? 'Please click on a Person...': ''}</p>
        </div>
    </div>
    
   
        
    
    
    </div>
      
    );
  }
}
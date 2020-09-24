import http from "../http-common";

class PersonDataService {
  getAll() {
    return http.get("/persons");
  }

  

  create(data) {
    return http.post("/persons", data);
  }

  createPost(data) {
    return http.post("/persons/addpost", data);
  }

}



  export default new PersonDataService();
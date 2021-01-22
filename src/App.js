import React from "react";
import API from "./utils/API"
import  UserView  from "./components/UserView";
import  Header  from "./components/Header";
import './style.css'


class App extends React.Component{

        state = {
          allUsers: [],
          filteredUsers: [],
          searchTerm: "",

        }

    // component did mount

    componentDidMount() {
        
      this.getRandomUsers()
      
    }

    getRandomUsers = () => {
      // call API (utils)
      API.getRandomUsers()
        .then((res) => {
          
          // set state
          this.setState({
            allUsers: res.data.results,
            filteredUsers: res.data.results
            })
          })
      };
          
      
        // handleInputChange
      handleSearchChange = (event) => {
       
        console.log(event.target)
        const {name, value } = event.target;

        this.setState(
          {
            [name]: value,
          },
          () => {
          console.log(this.state.allUsers)
            const filtered = this.state.allUsers.filter((result) =>
              
              result.name.first.includes(this.state.searchTerm)
              );
              console.log(filtered);
              this.setState({
                filteredUsers: filtered,
              });
            }
          );
        };
  

  
     // sortUsers
     handleSubmit = (event) => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      event.preventDefault();
      if (this.state.trackSort !== "ascend") {
        const sorted = this.state.allUsers.sort((a, b) => a.name.first.localeCompare(b.name.first))
        console.log(sorted)
        console.log("clicked")
        this.setState({
          filteredUsers: sorted,
          trackSort:"ascend"
        });
      }
  
      else{  const sorted = this.state.allUsers.sort((a, b) => b.name.first.localeCompare(a.name.first))
        console.log(sorted)
        console.log("clicked")
        this.setState({
          filteredUsers: sorted,
          trackSort:"descend"
        });}
  
    };

  
    render(){
      return (
        <div className="App">
        <Header />
        
        <nav className="navbar navbar-light bg-light mx-auto" style={{height : "100px"}}>
        <form className="form-inline">
          <input className="form-control mr-sm-2" name="searchTerm" type="text" placeholder="Search" aria-label="Search" onChange = {this.handleSearchChange} value ={this.state.searchTerm}></input>
        </form>
        <button className="bg-primary sort" onClick = {this.handleSubmit}>Sort by name</button>
        </nav>
        <div className="row">
            <div className="table-title col">Image</div>
            <div className="table-title click col-3" onClick={this.handleSubmit}>Name</div>
            <div className="table-title col">Phone Number</div>
            <div className="table-title col">Email</div>
            <div className="table-title col">DOB</div>
        </div>
        
        {this.state.filteredUsers.map((user, index) => (
          
          <UserView user={ user} key={index} />
        )
        )}
        </div>
      );
  }

}

export default App;

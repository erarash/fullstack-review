import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoDisplay from './components/RepoDisplay.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getTop25 = this.getTop25.bind(this)
  }
  

  componentDidMount(){
    this.getTop25()
  }




  search (term) {
    console.log(`${term} was searched`);
    let context = this
    $.ajax({
      method: "POST",
      url: "/repos",
      data: {query: term},
      type: "application/JSON",
      success: function(result) {
        console.log(result)
        context.getTop25();
      },
      error: function(err) {
        console.error(err)
      }
    })
  }

    getTop25(){
      let context = this;
      $.ajax({
        method: "GET",
        url: "/repos",
        type: "application/json",
        success: function(result){
          console.log(result);
          context.setState({ repos: result })
        },
        error: function(err) {
          console.error(err)
        }
      })
    }




  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
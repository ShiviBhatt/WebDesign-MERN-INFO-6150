import React from 'react';
import './Items.scss';

import Item from '../item/Item';
//  ----------------------Item List -----------------
export default class extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:[],
      isloaded:false
    };
  }
  //it will call the api and get all the items.
  componentDidMount(){
    //api headers are set here
    const requestOptions = {
      method: 'GET',
    };
    //API is called here to fetch todo details
    fetch('http://localhost:3000/todos/', requestOptions)
      .then(response => response.json())
      .then(data => 
        this.setState({items:data,isloaded:true}));
  }

  render(){
    let items = this.state.items.map(c=>
      <Item obj={c} callback={this.componentDidMount.bind(this)}/>
    );
    return ( 
      <div>
      <h3>To-do Items :</h3> <button className="refresh-btn" onClick={this.componentDidMount.bind(this)}> Refresh</button>
      <div className="item-list">
        {items}
      </div>
      </div>
    );
  }
}

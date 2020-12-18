import React from 'react';
import './App.scss';
import NavBar from './nav-bar/NavBar';
import AddNewBtn from './add-new-Btn/AddNewBtn';
import AddNewItem from './add-new-item/AddNewItem';
import Items from './items/Items';

/* in constructor newItem field of state is declared */
export default class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      newItem:false,
      items:[],
    };
    this.handler = this.handler.bind(this)
  }


  /* changeNewItem will take a boolean parameter and set the value of newItem */
  changeNewItem(bool){
    this.setState({
      newItem:bool
    });
  }

  handler() {
    window.location.reload(false);
  }

  // Render add new button in UI
  render(){
        return (
        <div>
        <NavBar />
        <AddNewBtn addDiv={this.changeNewItem.bind(this)} />
         {/* when button is clicked it will render below code */}
        {this.state.newItem &&
          <AddNewItem handler = {this.handler}/>
        }
        <Items/>
        </div>
        );
  }
}

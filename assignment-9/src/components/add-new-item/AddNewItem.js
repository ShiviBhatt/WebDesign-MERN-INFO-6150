import React from 'react';
import './AddNewItem.scss';

// Add new Button
export default class extends React.Component{
  constructor(props){
    super(props);
    // title, description,date and items of states are declared
    this.state={
        "title":"",
        "description":"",
        "date":null,
        "dueDate":"",
        "dueTime":"",
        "items":[]
    };
  }

  //Method to add new item.
  addItem(event){
      event.preventDefault();
      console.log(this.state);
      /* headers for API is set here. */
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({title:this.state.title,description:this.state.description,dueDate:this.state.dueDate,dueTime:this.state.dueTime})
      };
      /* API for sending data is called here */
      fetch('http://localhost:3000/todos/', requestOptions)
        .then(response => response.json())
        .then(data => 
          console.log(data));

      this.props.handler();
      alert('New item added to the to-do list');
  }

  /* this function is called whenever title input field is changed */
  changeTitle(event){
    event.preventDefault();
    this.setState({
        title:event.target.value
    });
  }

    /* this function is called whenever date input field is changed */
  changeDate(event){
    event.preventDefault();
    this.setState({
        date:event.target.value
    });
  }
    /* this function is called whenever description input field is changed */
  changeDesc(event){
    event.preventDefault();
    this.setState({
      description:event.target.value
    });
  }

  changeDueDate(event){
    event.preventDefault();
    this.setState({
      dueDate:event.target.value
    });
  }

  changeDueTime(event){
    event.preventDefault();
    this.setState({
      dueTime:event.target.value
    });
  }

    // Render Title, Description, Date and Time
  render(){
    return (
      <div className="add-card">
        <form>
          <label>Title : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
          <input type="text" name="title" onChange={this.changeTitle.bind(this)} required />
          <br /><br />
          <label>Description : &nbsp;</label>
          <input type="text" name="desc" onChange={this.changeDesc.bind(this)} />
          <br /><br />
          <label>Due Date : &nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input type="text" name="desc" onChange={this.changeDueDate.bind(this)} />

          <br /><br />
          <label>Due Time : &nbsp; &nbsp;</label>
          <input type="text" name="desc" onChange={this.changeDueTime.bind(this)} />

          <br></br><br></br>
          <button onClick={this.addItem.bind(this)}>Add</button>
        </form>
      </div>
    );
  }
}

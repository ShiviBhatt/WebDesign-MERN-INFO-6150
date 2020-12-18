import React from 'react';
import './Item.scss';

  // constructor will set the field of state
export default class extends React.Component{

  constructor(props){
    super(props);
    console.log(props);
    
    this.state={
        id:props.obj._id,
        showDescription:false,
        title:props.obj.title,
        disabled:true,
        description:props.obj.description,
        status: props.obj.status,
        dueDate: props.obj.dueDate,
        dueTime: props.obj.dueTime,
        createdDate:null,
        createdTime:null,
    };

  }
  /* below function will be called when component is rendered in DOM */
  componentDidMount(){
   
    //Code to format created date and time
    let pattern1 = /(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}:\d{1,2})/gi;
    let match = pattern1.exec(this.props.obj.createdAt);

    // //formatted date will be stored in state
    this.setState({createdDate:match[2]+'/'+match[3]+"/"+match[2],createdTime:match[4]});
   // this.setState({createdDate:this.props.obj.createdDate});
  }

  //Below function will be called to delete a To-do Item.
  deleteItem(event){
    event.preventDefault();

    /* api for deleting data is called here */
    const requestOptions = {
      method: 'DELETE'
    };
    
    fetch('http://localhost:3000/todos/'+this.state.id, requestOptions)
      .then(response => response.json())
      .then(data => 
        console.log(data));
      this.props.callback();
  }

  //below function is used to Update a To-do item.
  updateItem(){
 

    this.setState({disabled:true});

    /* api for Updating data is called here */
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({title:this.state.title,description:this.state.description,status:this.state.status,dueDate:this.state.dueDate,dueTime:this.state.dueTime})
    };
    fetch('http://localhost:3000/todos/'+this.state.id, requestOptions)
      .then(response => response.json())
      .then(data => 
        console.log(data));
  }

  //Below function is used to update status of An item.
   async markcomplete(event){

   event.preventDefault();
      this.setState({status:true});
      
      /* API for Updating data is called here */
      // const requestOptions = {
      //   method: 'PUT',
      //   headers :{'Content-Type': 'application/json'},
      //   body: JSON.stringify({title:this.state.title,description:this.state.description,status: true})
        
      // };
      // fetch('http://localhost:3000/todos/5fc21acc72a24466fc90ff43', requestOptions)
      //   .then(response => response.json())
      //   .then(data => 
      //     console.log(data));


  try {
    const response = await fetch('http://localhost:3000/todos/' + this.state.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({title:this.state.title,description:this.state.description,status: true})
    });
    return response;
    } catch (error) {
    console.log("Some issue occured !!", error.message);
    }
  }




  //below function is called whenever title input field is changed.
  changeTitle(event){
    event.preventDefault();
    this.setState({
        title:event.target.value
    });
  }

    //below function is called whenever date input field is changed.
  changeDate(event){
    event.preventDefault();
    this.setState({
        date:event.target.value
    });
  }

  //below function is called whenever description input field is changed.
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

  // below function is called when edit button is clicked.
  editItems(){
    this.setState({
      disabled:false
    })
  }
  //it is called to show or hide the description  
  toogleDescription(){
    if(this.state.disabled === true){
      this.setState({
        showDescription: !this.state.showDescription
    });
    }
  }

  render(){
    return ( 
        <div className={`item-div  ${this.state.status === true ? "green-border":"red-border"}`} onClick={this.toogleDescription.bind(this)}>
          <button className="delete-btn red-background" onClick={this.deleteItem.bind(this)}>Delete</button>
          <button className="edit-btn" onClick={this.editItems.bind(this)} hidden={!this.state.disabled}>Edit</button>
        {/* form will show the data and edit the data */}
        <form>
          <label>Title : </label>
          <input type="text" name="title" value={this.state.title} onChange={this.changeTitle.bind(this)}  disabled={this.state.disabled} />
          <br /><br />
          { this.state.showDescription &&
            <div>
                        <label>Description : </label>
                        {/* description value */}
                        <input type="text" name="desc" value={this.state.description} onChange={this.changeDesc.bind(this)} disabled={this.state.disabled}  />
                        <br></br><br></br>
                        <label>Due Date : </label>
                        {/* description value */}
                        <input type="text" name="dueDate" value={this.state.dueDate} onChange={this.changeDueDate.bind(this)} disabled={this.state.disabled}  />
                        <br></br><br></br>
                        <label>Due Time : </label>
                        {/* description value */}
                        <input type="text" name="dueTime" value={this.state.dueTime} onChange={this.changeDueTime.bind(this)} disabled={this.state.disabled}  />
                        <br></br><br></br>
            </div>
          }
         {
            this.state.status ?
            <div>
               <span>Status : </span>
              <span className="complete"> Completed </span><br></br><br></br>
              <button disabled>completed</button>
            </div> : 
            <div>
               <span>Status : </span>
              <span className="pending"> Pending </span><br></br><br></br>
              <button onClick={this.markcomplete.bind(this)}>Mark as a complete</button>
              <button onClick={this.updateItem.bind(this)} hidden={this.state.disabled} >UPDATE</button>
            </div>
          }
        <p>Created Date : {this.state.createdDate} &nbsp; &nbsp; Created Time : {this.state.createdTime}</p>
        </form>
        </div>
    );
  }
}

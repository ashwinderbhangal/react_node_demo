import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { contacts , addContact, addUpdateContact, addDeleteContact} from "../actions/contacts";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


class ContactlistUI extends Component {
  
  constructor(props) {
    super(props);
    this.props.contacts();
    this.state = {
      showadd: false,
      selectedKey: false,
      first_name: '',
      last_name: '',
      email: '',
      country: '',
      about: '',
      formstatus: 'Add',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleaddSubmit = this.handleaddSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleedit = this.handleedit.bind(this);
    this.handledelete = this.handledelete.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

 handledelete(data){
  	this.props.addDeleteContact(data.id, (response) => {
        if(response === 'success') {
          this.props.contacts();
          this.setState({ showadd : false });
        }
      });
  }

  handleedit(data){
  	this.setState({
    	first_name: data.first_name, 
    	last_name: data.last_name, 
    	email: data.email, 
    	country: data.country, 
    	about: data.about,
    	showadd : true, 
    	formstatus : 'Edit',
    	selectedKey : data.id
    });
  }

  handleaddSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    var data = {};
    data.first_name = this.state.first_name;
    data.last_name = this.state.last_name;
    data.email = this.state.email;
    data.country = this.state.country;
    data.about = this.state.about;
    if (this.state.selectedKey === false) {
      this.props.addContact(data, (response) => {
        if(response === 'success') {
          this.props.contacts();
          this.setState({ showadd : false });
        }
      });
    }
    else{
    	this.props.addUpdateContact(this.state.selectedKey,data, (response) => {
        if(response === 'success') {
          this.props.contacts();
          this.setState({ showadd : false });
        }
      });
    }


  }

  handleShow (){
  	this.setState({
    	first_name: '', 
    	last_name: '', 
    	email: '', 
    	country: '', 
    	about: '',
    	showadd : true, 
    	formstatus : 'Add',
    	selectedKey : false
    });
  }

  handleClose (){
  	this.setState({ showadd : false });
  }

   renderConatcts() {
    if(this.props.ncontacts.length > 0) {
      return (
      		<Row className="mt-3">
		      {this.props.ncontacts.map((s) => (
		    	<Col>
		       	<Card style={{ width: '18rem' }}>
			      <Card.Title>{s.first_name} {s.last_name}</Card.Title>
			      <Card.Body>
			        <Card.Text>
			          Email : {s.email}
			         </Card.Text>
			         <Card.Text>
			          Country : {s.country}
			         </Card.Text>
			         <Card.Text>
				          {s.about}
			         </Card.Text>
			        <Button variant="primary" onClick={() =>this.handleedit(s)}>Edit</Button>
			        <Button variant="danger" onClick={() =>this.handledelete(s)}>Delete</Button>
			      </Card.Body>
			    </Card>
		    	</Col>
		      )) }
		    </Row>
  		);
    }
  }

  render() {
    const { ncontacts } = this.props;
    console.log(ncontacts.length,'sadasasd');
    return (

      <div className="row mt-3">
      	<Button variant="primary" onClick={this.handleShow}>Add Contact</Button>
      	{this.renderConatcts()}
      	<Modal show={this.state.showadd} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.formstatus} Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        		 <form onSubmit={this.handleaddSubmit}>
				    <label for="fname">First Name</label>
				    <input type="text"
                  		className="form-control"
                  		name="first_name" required
                  		value={this.state.first_name}
                  		onChange={this.handleChange}
            		/>

				    <label for="lname">Last Name</label>
				    <input type="text"
                  		className="form-control"
                  		name="last_name" required
                  		value={this.state.last_name}
                  		onChange={this.handleChange}
            		/>
            		<label for="email">Email</label>
				    <input type="email"
                  		className="form-control"
                  		name="email"
                  		value={this.state.email} required
                  		onChange={this.handleChange}
            		/>
            		<label for="country">Country</label>
				    <input type="text"
                  		className="form-control"
                  		name="country"
                  		value={this.state.country}
                  		onChange={this.handleChange}
            		/>
				    <label for="about">about</label>
				    <textarea id="about" name="about" onChange={this.handleChange} placeholder="Write something.." style={{ width: '100%' }}>{this.state.about}</textarea>

				    <input type="submit" value="Submit"/>
				</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.Contacts.contacts);
  return {
    ncontacts: state.Contacts.contacts
  };
};

export default connect(mapStateToProps, {contacts, addContact, addUpdateContact, addDeleteContact})(ContactlistUI);
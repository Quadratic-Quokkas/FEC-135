import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
`

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`
const CloseButton = styled.button`
  display: inline;
  float: right;
`

class AddAnswerForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      body: '',
      name: '',
      email: '',
      photos: []
    }

    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  async handleSubmitAnswer(event) {

    event.preventDefault();

    const answer = {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      photos: this.state.photos
    }

    const question_id = parseInt(this.props.questionId);
    console.log('question id?')
    console.log(question_id)

    console.log(this.state.body)

    try {

      const result = await axios.post(`/api/qa/questions/${question_id}/answers`, answer)
      console.log('results from add answer')
      console.log(result)
    }  catch (error) {
      console.log(error)
    }
    this.setState({
      body: '',
      name: '',
      email: '',
      photos: []
    })
    this.props.dismissAnswerForm();
  }


  handleFormChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <ModalBackground>
        <ModalContent>
          <CloseButton onClick={this.props.dismissAnswerForm}>X</CloseButton>
          <div>Submit Your Answer</div>
          <form onSubmit={this.handleSubmitAnswer}>
            <label>Your Answer:</label>
            <input name="body" value={this.state.body} placeholder="" onChange={this.handleFormChange}/>
            <br/>

            <label>What is your nickname:</label>
            <input name="name" value={this.state.name} placeholder="Example: jackson11!" onChange={this.handleFormChange}/>
            <br/>

            <label>Your Email:</label>
            <input name="email" value={this.state.email} placeholder="Example: jack@email.com" onChange={this.handleFormChange}/>
            <p>For authentication reasons, you will not be emailed</p>
            <br/>

            <label>Upload Your Photos:</label>
            <input name="photos" value={this.state.photos} placeholder="Submit Photo" onChange={this.handleFormChange}/>
            <br/>
            <button type="submit">Submit Answer</button>
          </form>


          </ModalContent>
        </ModalBackground>





    )
  }

}

export default AddAnswerForm;
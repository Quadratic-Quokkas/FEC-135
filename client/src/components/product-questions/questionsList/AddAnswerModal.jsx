import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import AddAnswerForm from './AddAnswerForm';


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: .5;
`

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`

const Modal = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: 1.50rem auto;
  border-radius: 3px;
  width: 300px;
  padding: 3rem;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`

const AddAnswerModal = ({isAnswerModalShowing, toggleAnswerModal, questionId}) => isAnswerModalShowing ? ReactDOM.createPortal(
  <>
    <Overlay/>
      <Wrapper >
        <Modal>
          <ModalHeader>
            <button type="button"
              onClick={toggleAnswerModal}>
              <span>x</span>
            </button>
            </ModalHeader>

              <AddAnswerForm
              // handleAddedQuestion={handleAddedQuestion}
              questionId={questionId}
              />


            </Modal>
        </Wrapper>
  </>, document.body
) : null;


export default AddAnswerModal;
import styled from 'styled-components'

export const AnswerPageStyle = styled.div`
  display: flex;
  justify-content: center;
`

export const AnswerSheetStyle = styled.section`
  max-width: 1040px;
  width: 80vw;
  padding: 32px;
  margin-top: 32px;
  border: 1px solid gray;
  h2 {
    margin-bottom: 8px;
  }
  button {
    width: 100px;
    height: 32px;
  }
`

export const FormStyle = styled.form`
  margin: 32px;
  input {
    padding: 4px;
    margin: 8px 0;
  }
  .error-message {
    color: gray;
    font-size: 14px;
    margin-bottom: 8px;
  }
  .term-box {
    width: 100%;
    height: 250px;
    padding: 8px;
    margin: 8px 0;
    overflow-wrap: break-word;
    overflow: scroll;
    border: 1px solid darkgray;
  }
  label {
    margin: 0 4px;
  }
  .notice {
    margin-left: 16px;
    color: gray;
  }
`

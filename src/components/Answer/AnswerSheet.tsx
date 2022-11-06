import { AnswerSheetStyle, FormStyle } from './AnswerStyles'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { useState, useCallback, ChangeEvent } from 'react'
import axios from 'axios'
import Terms from './Terms'

const AnswerSheet = () => {
  const navigate = useNavigate()
  /*QR코드가 생성된 시간인 timestamp와
  스캔하여 방문한 시간인 scannedAt의 차이가 5분 30초 이하여야 페이지가 유효 */
  const { adId, timestamp } = useParams()
  const scannedAt = new Date()
  const isValidPage =
    scannedAt.getTime() - Number(timestamp) <= (5 * 60 + 30) * 1000

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [check, setCheck] = useState('N')
  const [nameMessage, setNameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [isValidAnswer, setIsValidAnswer] = useState({
    name: false,
    email: false,
  })

  // 이름 입력 체크
  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.trim())
    console.log(username)
    if (e.target.value.length < 2) {
      setNameMessage('이름은 2글자 이상 입력해 주세요')
      setIsValidAnswer((prev) => {
        return { ...prev, name: false }
      })
    } else {
      setNameMessage('')
      setIsValidAnswer((prev) => {
        return { ...prev, name: true }
      })
    }
  }, [])

  // 이메일 입력 체크
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /^[0-9a-zA-Z]([`~!#$%^&*|₩'";:_\-.0-9]?[a-zA-Z0-9])*@[a-zA-Z0-9]([`~!#$%^&*|₩'";:_\-0-9]?[a-zA-Z0-9])*\.[a-zA-Z]{2,5}$/
    const emailCurrent = e.target.value.trim()
    setEmail(emailCurrent)

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('사용할 수 있는 이메일을 입력해 주세요')
      setIsValidAnswer((prev) => {
        return { ...prev, email: false }
      })
    } else {
      setEmailMessage('')
      setIsValidAnswer((prev) => {
        return { ...prev, email: true }
      })
    }
  }, [])

  const handleCheckChange = () => {
    setCheck((prev) => (prev === 'N' ? 'Y' : 'N'))
  }

  const handleSubmit = () => {
    /*scannedAt과 now의 차이가 5분 이하여야 답변이 유효 */
    const now = new Date()
    if (now.getTime() - scannedAt.getTime() > 5 * 60 * 1000) {
      navigate('excp/expired', { replace: true })
    } else if (!isValidAnswer.name || !isValidAnswer.email) {
      if (!isValidAnswer.name) setNameMessage('이름은 2글자 이상 입력해 주세요')
      if (!isValidAnswer.email)
        setEmailMessage('사용할 수 있는 이메일을 입력해 주세요')
      const messages = document.querySelectorAll<HTMLElement>('.error-message')
      for (let msg of messages) {
        msg.style.color = '#f7244b'
      }
    } else {
      axios({
        method: 'post',
        url: `http://localhost:3004/${process.env.REACT_APP_APT_ID}/answer`,
        data: {
          eleId: process.env.REACT_APP_ELE_ID,
          adId: adId,
          scanedAt: scannedAt.toLocaleString(),
          userName: username,
          email: email,
          agreement: check,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            navigate('/excp/submitted', { replace: true })
          }
        })
        .catch(() => {
          navigate('/excp/error', { replace: true })
        })
    }
  }

  return isValidPage ? (
    <AnswerSheetStyle>
      <h2>신청하기</h2> 이 페이지는 5분간만 유효합니다. 5분 안에 제출을 완료해
      주세요!
      <div>
        <FormStyle>
          <h4>이름</h4>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            onChange={onChangeName}
            required
          ></input>
          <div className="error-message">{nameMessage}</div>
          <h4>메일 주소</h4>
          <input
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={onChangeEmail}
            required
          ></input>
          <div className="error-message">{emailMessage}</div>
          <h4>이용 약관</h4>
          <Terms></Terms>
          <input
            id="checkbox"
            type="checkbox"
            name="terms"
            value={check}
            onChange={handleCheckChange}
          ></input>
          <label htmlFor="terms">[선택] 약관에 동의합니다</label>
          <div className="notice">
            약관에 동의하지 않을 시 서비스 이용에 제약이 발생할 수 있습니다.
          </div>
        </FormStyle>
      </div>
      <button onClick={handleSubmit}>제출하기</button>
    </AnswerSheetStyle>
  ) : (
    <Navigate to="/excp/expired"></Navigate>
  )
}

export default AnswerSheet

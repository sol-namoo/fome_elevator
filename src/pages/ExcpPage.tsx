import { useParams } from 'react-router-dom'
import {
  AnswerPageStyle,
  AnswerSheetStyle,
} from '../components/Answer/AnswerStyles'

function ExcpPage() {
  const { reason } = useParams()
  return (
    <AnswerPageStyle>
      <AnswerSheetStyle>
        {reason === 'submitted' ? (
          <div>응답이 제출되었습니다. 참여해 주셔서 감사합니다.</div>
        ) : reason === 'expired' ? (
          <div>페이지가 만료되었습니다. QR코드를 다시 스캔해 주세요.</div>
        ) : (
          <div>에러가 발생했습니다. 다시 시도해 주세요.</div>
        )}
      </AnswerSheetStyle>
    </AnswerPageStyle>
  )
}

export default ExcpPage

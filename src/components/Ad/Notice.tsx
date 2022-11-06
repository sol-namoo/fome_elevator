import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { NoticeWrapper } from './AdStyles'

const Notice = ({ adId }: { adId: string }) => {
  const timestamp = new Date().getTime()
  const [qrImg, setQrImg] = useState('')

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        setQrImg(
          await QRCode.toDataURL(
            `https://localhost:3000/answer/${adId}/${timestamp}`
          )
        )
      } catch (err) {
        // console.log(err)
      }
    }
    generateQrCode()
  }, [adId])

  return (
    <NoticeWrapper>
      <div className="bg">
        <div className="desc">
          <div className="desc-big">지금 보고 계시는 이벤트에 참여하세요!</div>
          <div className="desc-small">QR코드 스캔하기 ➡ </div>
        </div>
        <img
          className="qr"
          src={qrImg}
          onClick={() =>
            window.open(
              `https://localhost:3000/answer/${adId}/${timestamp}`,
              '_blank'
            )
          }
        ></img>
      </div>
    </NoticeWrapper>
  )
}

export default Notice

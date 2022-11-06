import styled from 'styled-components'

export const AdPageStyle = styled.div`
  display: flex;
  justify-content: center;
  div.time-notice {
    margin: 32px 0;
    font-size: 18px;
  }
`

export const FrameStyle = styled.section`
  position: relative;
  border: 56px solid #282b34;
  border-radius: 12px;
  .frame_logo {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 50%);
    color: #504225;
    font-size: 1.1em;
    font-weight: 700;
  }
`
export const NoticeWrapper = styled.aside`
  position: absolute;
  width: 100%;
  bottom: 0;
  .bg {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 250px;
    padding: 32px;
    background: white;
    background-blend-mode: overlay;
    div.desc-big {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    div.desc-small {
      font-size: 16px;
      text-align: right;
    }
    img.qr {
      width: 200px;
      height: 200px;
    }
  }
`

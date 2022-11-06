import { FrameStyle } from './AdStyles'
import { useEffect, useState } from 'react'
import Notice from './Notice'
import Video from './Video'

type playlistItem = {
  adId: string
  link: string
}

function Frame({ playlist }: { playlist: playlistItem[] }) {
  const [idx, setIdx] = useState(0)
  const [id, setId] = useState('')
  const [link, setLink] = useState('')
  // console.log('다음 인덱스:', idx)

  useEffect(() => {
    if (playlist.length > 0) {
      if (idx === 0) {
        // console.log('Frame에서 업데이트 된 playlist 받음')
        // console.log('첫 번째 재생')
        setId(playlist[idx]['adId'])
        setLink(playlist[idx]['link'])
        setIdx((prev) => prev + 1)
      } else if (idx < playlist.length) {
        // console.log('idx 변경, setTimeout 설정')
        setTimeout(() => {
          setId(playlist[idx]['adId'])
          setLink(playlist[idx]['link'])
          setIdx((prev) => prev + 1)
        }, 30000)
      }
    }
  }, [playlist, idx])

  return (
    <FrameStyle>
      <Video link={link} />
      <Notice adId={id} />
      <div className="frame_logo">FOCUS MEDIA</div>
    </FrameStyle>
  )
}

export default Frame

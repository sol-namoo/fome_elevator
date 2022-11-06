import Frame from '../components/Ad/Frame'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AdPageStyle } from '../components/Ad/AdStyles'

type baselistItem = {
  adId: string
  category: string
  limit: number
  startsAt: string
  endsAt: string
  link: string
}

type playlistItem = {
  adId: string
  link: string
}

const AdPage = () => {
  const now = new Date()
  let [isTime, setIsTime] = useState(false)
  const [playlist, setPlaylist] = useState<playlistItem[]>([])
  let metadata: { startsAt?: Date; endsAt?: Date; space?: number } = {}

  useEffect(() => {
    async function getPlaylist() {
      let baselist: baselistItem[] = []
      let limits: number[] = []
      let templist: playlistItem[] = []
      try {
        // 광고 자료를 받아 limit 기준으로 정렬
        baselist = await axios
          .get(`http://localhost:3004/${process.env.REACT_APP_APT_ID}/ad`)
          .then((res) =>
            res.data.sort(
              (a: baselistItem, b: baselistItem) => a.limit - b.limit
            )
          )
        // console.log(baselist)

        // 송출 시간대 파악
        metadata.startsAt = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          parseInt(baselist[0].startsAt.split(':')[0]),
          parseInt(baselist[0].startsAt.split(':')[1])
        )
        metadata.endsAt = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          parseInt(baselist[0].endsAt.split(':')[0]),
          parseInt(baselist[0].endsAt.split(':')[1])
        )
        metadata.space = Math.floor(
          (metadata.endsAt.getTime() - now.getTime()) / 30000
        )
        // console.log(metadata)
        setIsTime(metadata.startsAt <= now && now <= metadata.endsAt)

        // limit 전환 idx 파악
        let count = 1
        baselist.forEach((item, i) => {
          if (i === 0) {
            limits.push(i)
            return
          }
          if (baselist[i].limit !== baselist[i - 1].limit) limits.push(i)
          else return
        })

        // 송출 limit별 templist 생성
        limits.forEach((idx, i) => {
          const from = idx === 0 ? 1 : baselist[limits[i - 1]].limit + 1
          const to = baselist[idx].limit
          let section = []

          for (let j = idx; j < baselist.length; j++) {
            section.push({ adId: baselist[j].adId, link: baselist[j].link })
          }
          templist.push(...[...Array(to - from + 1)].fill(section).flat())
        })

        // 전체 송출 시간 동안 송출할 수 있는 길이 만큼의 playlist를 생성
        setPlaylist(templist.slice(0, metadata.space))
      } catch (error) {
        console.error(error)
      }
    }
    getPlaylist()
  }, [])

  // console.log('playlist is now: ', playlist, playlist.length)

  return (
    <AdPageStyle>
      {isTime ? (
        <Frame playlist={playlist} />
      ) : (
        <div className="time-notice">지금은 광고 송출 시간이 아닙니다</div>
      )}
    </AdPageStyle>
  )
}

export default AdPage

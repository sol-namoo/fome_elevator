const Video = ({ link }: { link: string }) => {
  return (
    <>
      <div>
        <iframe
          width="608"
          height="1080"
          title="advideo"
          src={`https://www.youtube.com/embed/${link}?autoplay=1&mute=1&controls=0&modestbranding=1&playlist=${link}&loop=1`}
          frameBorder="0"
        ></iframe>
      </div>
    </>
  )
}

export default Video

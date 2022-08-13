
const embedCalendar = () => {
  let email = '[EMAIL]';
  return (
    <h2>Your Calendar:</h2>
      <iframe src={`https://calendar.google.com/calendar/embed?src=${encodeURI(email)}`}></iframe>
  )
}

export default embedCalendar;
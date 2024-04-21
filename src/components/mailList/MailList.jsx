import "./mailList.css"

const MailList = (isMr) => {
  return (
    <div className="mail" style={{ marginBottom: isMr===true ? "50px" : "" }}>
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
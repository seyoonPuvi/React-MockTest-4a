import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const token = Cookies.get('jwt_token')

  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  const header = () => (
    <div className="header">
      <div className="logo-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo-img"
        />
      </div>

      <button className="logout-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )

  const onRenderCard = () => (
    <div className="card-container">
      <h1 className="heading">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="card-img"
      />
    </div>
  )

  return (
    <div className="home-container">
      {header()}
      {onRenderCard()}
    </div>
  )
}

export default Home

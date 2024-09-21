import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showError: false, errorMsg: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onStoreJwtToken = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }

    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, option)
    const data = await response.json()

    if (response.ok) {
      this.onStoreJwtToken(data.jwt_token)
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {showError, errorMsg, userId, pin} = this.state

    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <div className="main-container">
          <div className="left-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-img"
            />
          </div>
          <div className="right-container">
            <form className="form-container" onSubmit={this.onSubmitLoginForm}>
              <h1 className="heading">Welcome Back!</h1>
              <div className="input-container">
                <label htmlFor="username" className="label">
                  User ID
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter User ID"
                  onChange={this.onChangeUserId}
                  value={userId}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="label">
                  PIN
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={this.onChangePin}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showError && <p className="errorText">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login

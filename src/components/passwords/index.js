import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import Box from '../passwordItem'
import NoPassword from '../nopassword'

class PasswordManager extends Component {
  constructor(props) {
    super(props)
    const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || []

    this.state = {
      passwordsDetails: storedPasswords,
      inputweb: '',
      inputname: '',
      inputpass: '',
    }
  }

  handleInputChange = field => event => {
    this.setState({[field]: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {inputweb, inputname, inputpass} = this.state

    if (!inputweb || !inputname || !inputpass) {
      // Add your validation logic here
      return
    }

    const newpasswordDetails = {
      id: uuidv4(),
      website: inputweb,
      username: inputname,
      password: inputpass,
      isPasswordVisible: false,
    }

    this.setState(prevState => {
      const updatedPasswords = [
        ...prevState.passwordsDetails,
        newpasswordDetails,
      ]

      // Store updated passwords list in localStorage
      localStorage.setItem('passwords', JSON.stringify(updatedPasswords))

      return {
        passwordsDetails: updatedPasswords,
        inputname: '',
        inputweb: '',
        inputpass: '',
      }
    })
  }

  deletePassword = id => {
    this.setState(prevState => {
      const updatedPasswords = prevState.passwordsDetails.filter(
        password => password.id !== id,
      )

      // Update localStorage after deleting
      localStorage.setItem('passwords', JSON.stringify(updatedPasswords))

      return {
        passwordsDetails: updatedPasswords,
      }
    })
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordsDetails: prevState.passwordsDetails.map(password => ({
        ...password,
        isPasswordVisible: !password.isPasswordVisible,
      })),
    }))
  }

  onSearch = event => {
    const searchQuery = event.target.value.toLowerCase()
    this.setState(prevState => ({
      passwordsDetails: prevState.passwordsDetails.filter(password =>
        password.website.toLowerCase().includes(searchQuery),
      ),
    }))
  }

  render() {
    const {passwordsDetails, inputweb, inputname, inputpass} = this.state

    return (
      <div className="main-container">
        <div className="bg-container">
          <img
            alt="app logo"
            className="app-logo-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />
          <div className="top-container">
            <div className="form-container">
              <h1>Add New Password</h1>
              <form className="form-ele" onSubmit={this.onSubmitForm}>
                <div className="div-align">
                  <div className="box">
                    <img
                      className="iconimg"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                    />
                  </div>
                  <input
                    type="text"
                    className="inp-ele"
                    placeholder="Enter Website"
                    value={inputweb}
                    onChange={this.handleInputChange('inputweb')}
                  />
                </div>
                <div className="div-align">
                  <div className="box">
                    <img
                      className="iconimg"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                    />
                  </div>
                  <input
                    type="text"
                    className="inp-ele"
                    placeholder="Enter Username"
                    value={inputname}
                    onChange={this.handleInputChange('inputname')}
                  />
                </div>
                <div className="div-align">
                  <div className="box">
                    <img
                      className="iconimg"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                    />
                  </div>
                  <input
                    type="password"
                    className="inp-ele"
                    placeholder="Enter Password"
                    value={inputpass}
                    onChange={this.handleInputChange('inputpass')}
                  />
                </div>

                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="right-img"
              alt="password manager"
            />
          </div>
          <div className="bottom-container">
            <div className="b-top-container">
              <h2>
                Your Passwords <p className="span">{passwordsDetails.length}</p>
              </h2>
              <div className="ml">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img"
                />
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.onSearch}
                />
              </div>
            </div>
            <hr className="line" />
            <div>
              <label htmlFor="c-box">Show passwords</label>
              <input
                type="checkbox"
                id="c-box"
                onChange={this.togglePasswordVisibility}
              />
            </div>

            {passwordsDetails.length === 0 ? (
              <NoPassword />
            ) : (
              <ul className="list-container">
                {passwordsDetails.map(password => (
                  <Box
                    details={password}
                    key={password.id}
                    deletePasswordDetails={this.deletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager

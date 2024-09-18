import './index.css'

const Box = ({details, deletePasswordDetails}) => {
  const {website, username, password, id, isPasswordVisible} = details

  const onClickDelete = () => {
    deletePasswordDetails(id)
  }

  const displayPassword = isPasswordVisible ? (
    password
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-img"
    />
  )

  return (
    <li className="li-cont">
      <button className="first-name" type="button">
        {website.charAt(0).toUpperCase()}
      </button>
      <div className="text-box">
        <p className="box-web">{website}</p>
        <p className="box-web">{username}</p>
        <p className="box-web">{displayPassword}</p>
      </div>
      <button
        className="delete-btn"
        type="button"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          className="delete-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default Box

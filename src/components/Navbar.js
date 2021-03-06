import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import NotificationBadge from 'react-notification-badge'
import { Effect } from 'react-notification-badge'

const badgeStyles = {
  right: '-15px',
  background: '#7232bd',
  color: 'var(--light-gray)',
  borderRadius: '50%'
}

class Navbar extends Component {
  render() {
    const { isLoggedIn } = this.props
    const { matches, likedMe } = this.props.user
    var likedMeNum = likedMe ? Object.keys(likedMe).length : 0
    var MatchesNum = matches ? Object.keys(matches).length : 0

    return (
      <div>
        {isLoggedIn ? (
          <nav id="navBar">
            <Link to="/">
              <i className="fas fa-home"></i>
            </Link>
            <Link to="/likedMe">
              <NotificationBadge
                count={likedMeNum}
                effect={Effect.SCALE}
                style={badgeStyles}
              />
              <i className="fas fa-smile"></i>
            </Link>
            <Link to="/matches">
              <NotificationBadge
                count={MatchesNum}
                effect={Effect.SCALE}
                style={badgeStyles}
              />
              <i className="fas fa-link"></i>
            </Link>
            <Link to="/profile">
              <i className="fas fa-user"></i>
            </Link>
          </nav>
        ) : (
          <nav id="navBar">
            <Link to="/">
              <h2>Login</h2>
            </Link>
            <Link to="/signup">
              <h2>Sign Up</h2>
            </Link>
          </nav>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user._id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

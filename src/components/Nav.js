import './Nav.css'

function Nav() {
  return (
    <div className='nav nav__black'>
        <div className='nav__contents'>
            <img
                className='nav__logo'
                src='https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png'
                alt='logo'
            />
            <img
                className='nav__avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                alt='profile'
            />
        </div>
        
    </div>
  )
}

export default Nav
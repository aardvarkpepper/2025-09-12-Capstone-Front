const Dashboard = ({ user, setUser }) => {
  return (
    <div className='dashboard'>
      <div>
        {user.role === "" ? 'Please log in to enable functionality.  You may have been logged out if your session token expired' : null}
        {user.role === "sub" ? `Currently logged in as sub, ${user.username}.` : null}
        {user.role === "admin" ? `Currently logged in as admin, ${user.username}.` : null}
      </div>
      <div>
        {user.username ? <button>Log Out</button> : null}
      </div>
    </div>
  )
}

export { Dashboard }
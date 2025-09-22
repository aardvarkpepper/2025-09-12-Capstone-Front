const Dashboard = ({ user, setUser, setJwt }) => {

  const handleLogOut = () => {
    setUser({
      username: "",
      email: "",
      password: "",
      role: ""
    });
    setJwt("");
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }
  return (
    <div className='dashboard'>
      <div>
        {(user && user.role === "") ? 'Please log in to enable functionality.  You may have been logged out if your session token expired.' : null}
        {(user && user.role === "sub") ? `Currently logged in as sub, username: ${(user && user.username) ? user.username : ""}.` : null}
        {(user && user.role === "admin") ? `Currently logged in as admin, username: ${(user && user.username) ? user.username : ""}.` : null}
      </div>
      <div>
        {(user && user.username) ? <button onClick={handleLogOut}>Log Out</button> : null}
      </div>
    </div>
  )
}

export { Dashboard }
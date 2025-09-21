const Dashboard = ({ user, setUser }) => {
  return (
    <div>
      <div className='dashboard'>
        <nav className='functions'>

        </nav>
      </div>
      <div>
        {user.role === "" ? 'no' : 'yes'}
      </div>
    </div>
  )
}

export { Dashboard }
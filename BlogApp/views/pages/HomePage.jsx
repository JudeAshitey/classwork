const React = require('react')
const NavBar = require('../components/Navbar')
class HomePage extends React.Component {
    render(){
        return(
        
        
        <div>
             <head>
             <link rel="stylesheet" href="/app.css" />

             <NavBar />
             </head>
            <h1>Welcome to my Blog App</h1>
        </div>)
    }
}

module.exports = HomePage
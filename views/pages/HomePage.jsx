const React = require('react')
const NavBar = require('../components/Navbar')
class HomePage extends React.Component {
    render(){
        return(
        
        
        <div>
             <head>
             <link rel="stylesheet" href="/CSS/app.css" />
             </head>
             <NavBar />
            <h1>Welcome to My Blog App</h1>
             
             <div>
                <img src = "/CSS/car1.jpg"/>
             </div>
        </div>)
    }
}

module.exports = HomePage;
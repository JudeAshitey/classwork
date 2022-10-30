const React = require('react')


class Navbar extends React.Component{
   render(){

    return(
        <nav style={styles.container}>
            <a href="">Home</a>
            <a href="/blog">Blog</a>
            <a href="/blog/new">Create New Blog</a>
            <a href="/signin">Sign In</a>
            <a href="/user/signout">Signout</a>
        </nav>
    )
   }
}


const styles = {
    container: {
        display : 'flex',
        justifyContent: 'space-between',
        background : '#5C2E7E',
	    "margin-left":"auto",
	    "margin-right": "auto",
        "max-width": "auto"
    }
}

module.exports = Navbar;
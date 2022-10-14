const React = require('react')


class Navbar extends React.Component{
   render(){

    return(
        <nav style={style.container}>
            <a href="">Home</a>
            <a href="/blog">Blog</a>
            <a href="/blog/new">Create New Blog</a>
            <a href="/signin">Sign In</a>
        </nav>
    )
   }
}


const styles = {
    container: {
        display : 'flex',
        justifyContent: 'space-between',
        background : 'rgba(193, 235, 187, 0.9)'
    }
}

module.exports = Navbar;
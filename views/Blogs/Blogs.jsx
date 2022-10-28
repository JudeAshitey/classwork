const React = require('react')
const NavBar = require('../components/Navbar')
class Blogs extends React.Component{
   render(){
    const {blogs} =this.props

    return(
        <div>
            <NavBar />
            <h1>Blogs</h1>
            <section>{blogs.map((blog) =>(
                <div key={blog._id}>
                    <a href={`blog/${blog._id}`}>{blog.title}</a>                   
                     <br />
                     <p>{blog.body}</p>
                     <h4>{blog.author}</h4>
                </div>
            ))}

            </section>
        </div>
    )

   }
}


module.exports = Blogs;
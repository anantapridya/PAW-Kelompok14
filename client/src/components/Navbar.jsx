import logo from '../img/websitelogo.png'
import '../css/Navbar.css'

// height: 64px
export default function Navbar() {
    return (
        <nav role="navigation">
        <ul className="nav--list">
            <li className="nav--logo">
                <img src={logo} alt="app logo on navigation bar"></img>
                <span>Pharma</span><span>Web</span>
            </li>
            <li><a href="/">List</a></li>
            <li><a href="/add">Add</a></li>
            <li><a href="/welcome">Sign in/Sign out</a></li>
        </ul>
    </nav>
    )
}

// note to do:
// add href to sign in/sign out
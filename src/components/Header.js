import {Nav, Navbar, OverlayTrigger, Badge, Container, Tooltip} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../svg/logo.svg';
import {ReactComponent as CartIcon} from '../svg/cart.svg';
import {ReactComponent as Auth} from '../svg/auth.svg';
import {ReactComponent as LogIn} from '../svg/login.svg';
import {ReactComponent as LogOut} from '../svg/logout.svg';
import {ReactComponent as MenuIcon} from '../svg/menu.svg';
import {ReactComponent as ContactsIcon} from '../svg/contacts.svg';
import '../css/Header.css';
import {useSelector} from 'react-redux';
import { useContext, useState } from 'react';
import {useAuth} from '../hooks/useAuth';
import AlertContext from '../context/AlertContext';
function Header () {
    const {isAuth, firstName, role} = useAuth();
    const {setPoint, setSale, setNews} = useContext(AlertContext);
    const orders = useSelector(state => state.cart.cart);
    const [showMenu, setShowMenu] = useState(false);
    
    const menuClick = () => {
        if (window.screen.width < 1100) {
            setShowMenu(showMenu ? false : true);
        }
    }
    return <>
        <Navbar bg="dark" variant="dark">
            <Container className='position-relative'>
                <div className='d-flex'>
                    <Navbar.Brand className='header__logo'><Link to="/"><Logo /></Link></Navbar.Brand>
                    <div className='menu-icon d-none'><MenuIcon onClick={menuClick}/></div>
                </div>
                <Nav className={`${showMenu ? 'd-block' : ''} mr-auto header__nav menu-links`} onClick={menuClick} >
                    <Link className={'nav-link'} onClick={() => setPoint('Чоловікам')} to="products">Чоловікам</Link>
                    <Link className={'nav-link'} onClick={() => setPoint('Жінкам')} to="products">Жінкам</Link>
                    <Link className={'nav-link'} onClick={() => setPoint('Дітям')} to="products">Дітям</Link>
                    <Link className={'nav-link text-danger'} onClick={() => setSale(true)} to="products">Sale</Link>
                    <Link className={'nav-link text-success'} onClick={() => setNews(true)} to="products">Новинки</Link>
                    {role==='admin' ? <Link className={'nav-link text-danger'} to="admin">Admin</Link> : ''}
                </Nav>
                    <div className='d-flex'>
                        {isAuth ? <Link className={'nav-link px-3 custom-icons'} to="profile">
                            <OverlayTrigger placement='bottom' overlay={<Tooltip>Welcome, {firstName}</Tooltip>}>
                                <Auth />
                            </OverlayTrigger></Link> : ''}
                        {isAuth ?
                            <Link className={'nav-link px-3 custom-icons'} to="logout">
                                <OverlayTrigger placement='bottom' overlay={<Tooltip>LogOut</Tooltip>}>
                                    <LogOut />
                                </OverlayTrigger></Link> : 
                            <Link className={'nav-link px-3 custom-icons'} to="login">
                                <OverlayTrigger placement='bottom' overlay={<Tooltip>LogIn</Tooltip>}>
                                    <LogIn />
                                </OverlayTrigger></Link> }
                        
                        <Link className={'nav-link px-3 custom-icons'} to="contacts">
                            <OverlayTrigger placement='bottom' overlay={<Tooltip>Контакти</Tooltip>}>
                                <ContactsIcon />
                            </OverlayTrigger>
                        </Link>
                        <Link className={'nav-link px-3 custom-icons position-relative'} to="cart">
                            <CartIcon style={{fill: orders.length ? '#198754' : '#fff'}} />
                            {orders?.length>0 ? 
                            <Badge pill className='position-absolute' style={{top: '1.2rem', left: '.4rem'}} bg="success">{orders.length}</Badge> : ''}
                        </Link>
                    </div>
            </Container>
        </Navbar>
    </>
}

export default Header;
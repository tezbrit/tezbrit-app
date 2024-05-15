import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import tezbritLogo from '/tezbrit-typo.svg';
import menuIcon from '/menu.svg';
import Menu from './Menu';

function Header() {

    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);

        if (!menu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <>
            <header className={`header ${menu ? 'header-menu' : ''}`}>
                <nav className="navbar">
                    <div className="logo-container">
                        <Link to='/'>
                            <img src={tezbritLogo} alt="Tezbrit Logo" />
                        </Link>
                    </div>
                    <div className={`icon-container ${menu ? 'active' : ''}`} onClick={toggleMenu}>
                        <img src={menuIcon} alt="Menú ícono" />
                    </div>
                </nav>

                
            </header>
            {menu && < Menu />}
        </>
    )
}

export default Header;
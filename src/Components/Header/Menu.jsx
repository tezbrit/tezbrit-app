import { Link } from 'react-router-dom';
import './Menu.css';
import albumIcon from '/albumIcon.svg';
import favIcon from '/favIcon.svg';
import aboutIcon from '/aboutIcon.svg';

function Menu () {

    return (
        <aside className='menu'>
            <ul>
                <li>
                    <Link to='/discografia'>
                        <img src={albumIcon} alt="ícono álbum" loading='lazy' />
                        Discografía
                    </Link>
                </li>
                <li>
                    <img src={favIcon} alt="ícono Favoritos" loading='lazy' />
                    Favoritos
                </li>
                <li>
                    <img src={aboutIcon} alt="Ícono Sobre Tezbrit" loading='lazy' />
                    Sobre Tezbrit
                </li>
            </ul>
        </aside>
    )
}

export default Menu;
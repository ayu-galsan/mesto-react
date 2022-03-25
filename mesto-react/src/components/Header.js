import logo from '../images/logo.svg';

function Header() {
  return ( 
    <header className = "header" >
      <img className = "header__logo" src = {logo} alt = "Логотип с надписью Mesto" />
   </header>
   )}

export default Header;
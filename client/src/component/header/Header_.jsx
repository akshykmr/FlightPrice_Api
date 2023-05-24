import "./Header.scss";
const Header = () => {
    return  (
      <>
        <header className='main-header'> 
            <div className="header-content">
                <div className="logo">Flight Price Checker</div>
                <div className="signIn_Up">
                   <li>Sign In</li>
                   <li>Sign Up</li>
                </div>
            </div>
        </header>
        </>
    );
};

export default Header;

import Link from 'next/link';

const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__contianer--logo">
                    <Link href="/">
                        <img src="/logo.svg" alt="Logo" />
                    </Link>
                </div>
                <nav>
                    <Link href="/admin" className='header__container--link'>
                        Admin
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;

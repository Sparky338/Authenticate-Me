import "./footer.css"

const Footer = () => {

    return (
        <footer>
            <div className="footer-container">
                <div className='dev-footer-container'>
                    <div className='Footer-content'>
                        <div className="dev-name-footer">
                            Matthew Hutter
                        </div>
                        <div className="footer-separator"> - </div>
                        <div className="dev-links-footer">
                            <a className="dev-link-footer"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/Sparky338">
                                GitHub
                            </a>
                            <div className="footer-separator"> - </div>
                            <a className="dev-link-footer"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.linkedin.com/in/matthew-hutter-2a6620173">
                                LinkedIn
                            </a>
                            <div className="footer-separator"> - </div>
                            <a className="dev-link-footer"
                                target="_blank"
                                rel="noreferrer"
                                href="https://sparky338.github.io/">
                                Profile
                            </a>
                            <div className="footer-separator"> - </div>
                            <a className="dev-link-footer"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/Sparky338/SoundClod">
                                SoundClod Repo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer

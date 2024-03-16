import { Button, Columns, Navbar } from "react-bulma-components";
import { authService, User } from "../services/auth";
import { ThemeSelector } from "./ThemeSelector";
import { CheckBox } from "./elements/Checkbox";
import { Link } from "react-router-dom";

interface HeaderProps {
    user: User | null;
}

export function Header( { user }: HeaderProps) {

    return (
        <Navbar color={"primary"} role="navigation" aria-label="main-navigation">
            <Navbar.Brand>
                <Navbar.Item renderAs="h1" className="is-size-3">
                    MovieProject
                </Navbar.Item>
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container align="left">
                    <Navbar.Item href="/">Home</Navbar.Item>
                    <Navbar.Item href="/movies">Movie Library</Navbar.Item>
                </Navbar.Container>
                <Navbar.Container align="right">
                    <Navbar.Item  renderAs="div">
                        <CheckBox variant="switch" label="Toggle" value="Toggle value"></CheckBox>
                    </Navbar.Item>
                    <Navbar.Item  renderAs="div">
                        <ThemeSelector />
                    </Navbar.Item>
                    <Navbar.Item  renderAs="div">
                        {user 
                        ? <Navbar.Container>
                            <Navbar.Item renderAs="p">{user.username}</Navbar.Item>
                            <Button 
                                color={"accent"}
                                onClick={() => {
                                    authService.logout();
                                }}>
                                    Log out
                                </Button>
                        </Navbar.Container>
                        : <div className="buttons">
                            <Link to="register" className="button is-info">
                                <strong>Sign up</strong>
                            </Link>
                            <Link to='login' className="button is-light">
                                Login
                            </Link>
                        </div>}
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    )
}
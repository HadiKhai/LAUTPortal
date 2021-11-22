import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AUTH_PATH, DASHBOARD_PATH,} from "../config/routes";
import Dashboard from "./views/Dashboard";
import LoginLayout from "./views/LoginLayout";
import Main from "./main/Main";

const App = () => {

    return (
        <Router>
            <Switch>
                <Route exact  path={AUTH_PATH} component={LoginLayout}/>
                <Main>
                    <Route path={DASHBOARD_PATH} component={Dashboard}/>
                </Main>
            </Switch>
        </Router>
    )
}

export default App;

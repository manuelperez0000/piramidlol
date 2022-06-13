import React from "react";
import { Switch, Route } from "react-router-dom"
import Clasic from "./pages/clasic";
import Lotery from "./pages/lotery";
import Referals from "./pages/referals";
import Launcher from "./pages/launcher";
import Tokens from "./pages/tokens";
import Market from "./pages/market";

const Routes = ({wallet}) => {
    return (
        <Switch>
            <Route path="/" exact>
                <Clasic/>
            </Route>
            <Route path="/clasic" exact>
                <Clasic/>
            </Route>
            <Route path="/lotery" exact>
                <Lotery wallet={wallet}/>
            </Route>
            <Route path="/referals" exact>
                <Referals/>
            </Route>
            <Route path="/launcher" exact>
                <Launcher/>
            </Route>
            <Route path="/Tokens" exact>
                <Tokens/>
            </Route>
            <Route path="/market" exact>
                <Market/>
            </Route>
        </Switch>
    )
}
export default Routes
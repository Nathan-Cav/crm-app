/* @refresh reload */
import { render } from 'solid-js/web';
import { Navigate, Route, Router } from "@solidjs/router";

import './index.css';

import Dashboard from './Dashboard';
import ClientDisplay from './ClientDisplay';

const root = document.getElementById('root')

render(() => (
    <Router>
        <Route path="/" component={Dashboard} />
        {/* <Route path="/add" component={Dashboard} /> */}
        <Route path="/client/:clientId" component={ClientDisplay} />
        <Route path="*paramName" component={() => <Navigate href={"/"} />} />
    </Router>
), root!);

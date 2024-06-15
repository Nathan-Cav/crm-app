/* @refresh reload */
import { render } from 'solid-js/web';
import { Navigate, Route, Router } from "@solidjs/router";

import './styles/index.css';

import Dashboard from './Dashboard';
import Client from './Client';

const root = document.getElementById('root')

render(() => (
    <Router>
        <Route path="/" component={Dashboard} />
        <Route path="/jobs" component={Dashboard} />
        <Route path="/jobs/:jobId" component={Dashboard} />
        <Route path="/client/:clientId" component={Client} />
        <Route path="*paramName" component={() => <Navigate href={"/"} />} />
    </Router>
), root!);

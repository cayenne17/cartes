import React, { Component } from 'react'
import './Layout.css'
import './reset.css'
import './ribbon.css'

import {Link, Route, Router, Switch} from 'react-router-dom'
import ReactPiwik from 'react-piwik'
import createHistory from 'history/createBrowserHistory'

import HomeEmbauche from 'Components/HomeEmbauche'
import HomeSyso from 'Components/HomeSyso'
import Rule from 'Components/rule/Rule'
import Route404 from 'Components/Route404'
import Contact from 'Components/Contact'
import Simulateur from 'Components/Simulateur'
import Results from 'Components/Results'
import RulesList from "Components/RulesList"

const piwik = new ReactPiwik({
	url: 'stats.data.gouv.fr',
	siteId: 39,
	trackErrors: true,
})

export default class Layout extends Component {
	history = createHistory()

	render() {
		let displayWarning = ["/simu/", "/regle/", "/regles"].find(
			t => window.location.href.toString().indexOf(t) > -1
		)

		// track the initial pageview
		ReactPiwik.push(["trackPageView"])

		return (
			<Router history={piwik.connectToHistory(this.history)}>
				<div id="main">
					<div id="ninetyPercent">
						<div id="header">

							{ displayWarning &&
								<span id="ribbon">
									<Link to="/contact"><em>version beta</em> <i className="fa fa-flask" aria-hidden="true"></i></Link>
								</span>
							}
							{
								// this.props.location.pathname != '/' &&
								// <Link to="/">
								// 	<img id="site-logo" src={require('../images/logo.png')} />
								// </Link>
							}
						</div>
						<Switch>
							<Route exact path="/" component={HomeEmbauche} />
							<Route exact path="/syso" component={HomeSyso} />
							<Route path="/contact" component={Contact} />
							<Route path="/regle/:name" component={Rule} />
							<Route path="/regles" component={RulesList} />
							<Route path="/simu/:name/:intro?" component={Simulateur} />
							<Route component={Route404} />
						</Switch>
					</div>
					<Results />
				</div>
			</Router>
		)
	}
}

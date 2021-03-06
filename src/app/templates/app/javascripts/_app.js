/* @flow */
import 'babel-polyfill';
import { MlApplication } from 'middle-layer/lib/application';
import { <%= titleCaseName %>Loading } from './components/loading';
import { <%= titleCaseName %>Renderer } from './components/renderer';
import { <%= titleCaseName %>Router } from './components/router';
import { WelcomeController } from './controllers/welcome_controller';


class <%= titleCaseName %>App extends MlApplication {

	config() {
		return {
			controllers: [
				WelcomeController
			],
			classes: {
				router: <%= titleCaseName %>Router,
				renderer: <%= titleCaseName %>Renderer
			}
		};
	}

	async ready() {
		let self = this;

		FastClick.attach(document.body);

		<%= titleCaseName %>Loading.show();

		if (typeof analytics !== 'undefined') {
			// analytics.debugMode();
			if (analytics.startTrackerWithId) {
				analytics.startTrackerWithId('UA-71870948-1');
			}
			else {
				window.gaChromeTracker = analytics.getService('flood-aware').getTracker('UA-71870948-1');
			}
		}

		if (typeof device !== 'undefined' && device.platform === 'iOS') {
			$('body')
				.addClass('is-ios');

			if (Number(device.version.split('.')[0]) >= 7) {
				$('body')
					.addClass('ios-header');
			}
		}

		if (typeof navigator !== 'undefined' && navigator.splashscreen) {
			navigator.splashscreen.hide();
		}

		await this.router.goTo('welcome');

		<%= titleCaseName %>Loading.hide();

	}

	afterReady() {
		console.log('ready');
	}

}

<%= titleCaseName %>App.doAppReady();

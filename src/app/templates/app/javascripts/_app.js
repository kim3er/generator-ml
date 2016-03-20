/* @flow */
import 'babel-polyfill';
import { MlApplication } from 'middle-layer/lib/application';

class <%= titleCaseName %>App extends MlApplication {

	config() {

	}

	async ready() {
		let self = this;

		FastClick.attach(document.body);

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

	}

	afterReady() {
		console.log('ready');
	}

}

<%= titleCaseName %>App.doAppReady();

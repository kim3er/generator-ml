/* @flow */
import { <%= titleCaseName %>Controller } from '../components/controller';
import { route } from 'middle-layer/lib/controller';

export class WelcomeController extends <%= titleCaseName %>Controller {

	@route('welcome')
	async index(): Promise {
		return this.render('welcome/index', {});
	}

}

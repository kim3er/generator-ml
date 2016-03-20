import { Base } from 'yeoman-generator';

export default class MyGenerator extends Base {

	constructor( ...args ) {
		super(...args);
		this.argument('appname');
	}

	method1() {
		console.log(`The name is: ${ this.appname }`);
	}
}

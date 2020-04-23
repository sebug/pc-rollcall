console.log('Lieu de convocation placeholder');

class ConvocationPlace extends HTMLElement {
    constructor() {
	super();

	const shadow = this.attachShadow({ mode: 'open' });

	this.outer = document.createElement('p');

	const style = document.createElement('style');
	style.textContent = 'p {' +
	    'color: blue;' +
	    '}';

	shadow.appendChild(style);
	shadow.appendChild(this.outer);

	this.bindConvocationPlace = this.bindConvocationPlace.bind(this);
    }

    bindConvocationPlace(convocationPlace) {
	console.log(convocationPlace);
	console.log('bound convocation place');
    }
}

customElements.define('convocation-place', ConvocationPlace);

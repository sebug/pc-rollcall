console.log('component description here');

class EventDetails extends HTMLElement {
    constructor() {
	super();

	const shadow = this.attachShadow({ mode: 'open' });

	const wrapper = document.createElement('section');
	wrapper.setAttribute('class', 'wrapper');

	this.heading = document.createElement('h2');

	const eventDescription = this.getAttribute('eventdescription');

	this.heading.textContent = eventDescription;

	const style = document.createElement('style');
	style.textContent = 'h2 {' +
	    'color: green;' +
	    '}';

	shadow.appendChild(style);
	shadow.appendChild(wrapper);
	wrapper.appendChild(this.heading);
    }

    connectedCallback() {
	this.heading.textContent = this.getAttribute('eventdescription');
    }
}

customElements.define('event-details', EventDetails);

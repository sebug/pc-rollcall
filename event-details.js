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

	this.bindCourseInfo = this.bindCourseInfo.bind(this);
    }

    static get observedAttributes() {
	return ['eventdescription'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
	if (name === 'eventdescription') {
	    this.heading.textContent = newValue;
	}
    }

    bindCourseInfo(courseInfo) {
	console.log(courseInfo);
    }

    connectedCallback() {
    }
}

customElements.define('event-details', EventDetails);

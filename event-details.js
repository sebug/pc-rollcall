console.log('component description here');

class EventDetails extends HTMLElement {
    constructor() {
	super();

	const shadow = this.attachShadow({ mode: 'open' });

	const wrapper = document.createElement('section');
	wrapper.setAttribute('class', 'wrapper');

	this.heading = document.createElement('h2');

	this.introParagraph = document.createElement('p');
	this.introParagraph.setAttribute('class', 'intro-paragraph');

	this.eventNumber = document.createElement('span');
	this.eventNumber.setAttribute('class', 'event-number');
	this.eventNumber.textContent = this.getAttribute('eventnumber');

	this.introParagraph.appendChild(this.eventNumber);

	const eventDescription = this.getAttribute('eventdescription');

	this.heading.textContent = eventDescription;

	const style = document.createElement('style');
	style.textContent = 'h2 {' +
	    'color: green;' +
	    '}';

	shadow.appendChild(style);
	shadow.appendChild(wrapper);
	wrapper.appendChild(this.heading);
	wrapper.appendChild(this.introParagraph);

	this.bindCourseInfo = this.bindCourseInfo.bind(this);
    }

    static get observedAttributes() {
	return ['eventdescription', 'eventnumber'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
	if (name === 'eventdescription') {
	    this.heading.textContent = newValue;
	} else if (name === 'eventnumber') {
	    this.eventNumber.textContent = newValue;
	}
    }

    bindCourseInfo(courseInfo) {
	console.log(courseInfo);
	if (courseInfo.description) {
	    this.setAttribute('eventdescription', courseInfo.description);
	}
	if (courseInfo.eventNumber) {
	    this.setAttribute('eventnumber', courseInfo.eventNumber);
	}
    }

    connectedCallback() {
    }
}

customElements.define('event-details', EventDetails);

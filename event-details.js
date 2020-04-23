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

	this.fromDate = document.createElement('span');
	this.fromDate.setAttribute('class', 'from-date');
	this.fromDate.textContent = this.getAttribute('fromdate');

	this.toDate = document.createElement('span');
	this.toDate.setAttribute('class', 'to-date');
	this.toDate.textContent = this.getAttribute('todate');

	this.introParagraph.appendChild(this.eventNumber);
	this.introParagraph.appendChild(this.fromDate);
	this.introParagraph.appendChild(this.toDate);

	const eventDescription = this.getAttribute('eventdescription');

	this.heading.textContent = eventDescription;

	this.convocationPlace = document.createElement('convocation-place');

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
	return ['eventdescription', 'eventnumber', 'fromdate', 'todate'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
	if (name === 'eventdescription') {
	    this.heading.textContent = newValue;
	} else if (name === 'eventnumber') {
	    this.eventNumber.textContent = newValue;
	} else if (name === 'fromdate') {
	    if (newValue) {
		this.fromDate.textContent = ' du ' + newValue;
	    } else {
		this.fromDate.textContent = '';
	    }
	} else if (name === 'todate') {
	    if (newValue) {
		this.toDate.textContent = ' au ' + newValue;
	    } else {
		this.toDate.textContent = '';
	    }
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
	if (courseInfo.eventFromDate) {
	    this.setAttribute('fromdate', courseInfo.eventFromDate);
	}
	if (courseInfo.eventToDate) {
	    this.setAttribute('todate', courseInfo.eventToDate);
	}

	this.convocationPlace.bindConvocationPlace(courseInfo);
    }

    connectedCallback() {
    }
}

customElements.define('event-details', EventDetails);

console.log('Setting event handlers');

const fileInput = document.querySelector('#pisa-xml');

fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
	const firstFile = fileInput.files[0];
	const reader = new FileReader();
	reader.onload = (e) => {
	    const participants = readPISAExport(e.target.result);
	    const tableNode = document.querySelector('.participants table');
	    const tableBody = tableNode.querySelector('tbody');
	    tableBody.innerHTML = ''; // clear out old content
	    const template = document.querySelector('#participant-row');
	    for (let participant of participants) {
		const participantRow = template.content.cloneNode('true');
		const td = participantRow.querySelectorAll('td');
		td[0].textContent = participant.email || '';
		td[1].textContent = participant.participantFromDate || '';
		td[2].textContent = participant.participantToDate || '';
		td[3].textContent = participant.daysOfService || '0';

		tableBody.appendChild(participantRow);
	    }
	};

	reader.readAsText(firstFile);
    }
});

const readPISAExport = (txt) => {
    const oParser = new DOMParser();
    const oDOM = oParser.parseFromString(txt, 'application/xml');
    const daysNodes = Array.from(oDOM.querySelectorAll('PISA_TAGE_ADZS'));
    const result = daysNodes.map(ParticipantDays.createFromNode);
    return result;
};

class ParticipantDays {
    constructor() {
    }

    static createFromNode(node) {
	let result = new ParticipantDays();
	const basicMappings = [
	    [ 'employeeID', 'EMPLID' ],
	    [ 'nationalID', 'NATIONAL_ID' ],
	    [ 'eventID', 'ZS_ANLASSID' ],
	    [ 'eventFromDate', 'ZS_ANL_VON_DT' ],
	    [ 'participantType', 'ZS_TEILNART_CD' ],
	    [ 'participantFromDate', 'ZS_TN_VON_DT' ],
	    [ 'participantToDate', 'ZS_TN_BIS_DT' ],
	    [ 'daysOfService', 'ZS_DIENSTTAGE' ],
	    [ 'additionalTraining', 'ZS_ZUSAUSBG' ],
	    [ 'mobilePhone', 'ZS_MOBILE_HOME' ],
	    [ 'businessPhone', 'ZS_PHONE_BUSN' ],
	    [ 'emergencyPhone', 'ZS_PHONE_EMERG' ],
	    [ 'homePhone', 'ZS_PHONE_HOME' ],
	    [ 'email', 'ZS_EMAIL_ADDR' ],
	    [ 'comments', 'ZS_DL_BEMERKUNG' ]
	];
	for (let m of basicMappings) {
	    const v = node.querySelector(m[1]);
	    if (v) {
		result[m[0]] = v.innerHTML || null;
	    } else {
		result[m[0]] = null;
	    }
	}
	const effectiveDateNodes = Array.from(node.querySelectorAll('ZS_TEILN_DT_EFF'));
	result.dates = effectiveDateNodes.map(EffectiveDate.createFromNode);
	
	return result;
    }
}

class EffectiveDate {
    constructor() {
    }

    static createFromNode(node) {
	let result = new ParticipantDays();
	const basicMappings = [
	    [ 'date', 'ZS_TN_DATUM' ],
	    [ 'counted', 'ZS_ANRECH_YN' ],
	    [ 'reasonForAbsence', 'ZS_ABWGRUND_CD' ]
	];
	for (let m of basicMappings) {
	    const v = node.querySelector(m[1]);
	    if (v) {
		result[m[0]] = v.innerHTML || null;
	    } else {
		result[m[0]] = null;
	    }
	}
	return result;
    }
}

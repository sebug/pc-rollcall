console.log('Setting event handlers');

const fileInput = document.querySelector('#pisa-xml');

fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
	const firstFile = fileInput.files[0];
	const reader = new FileReader();
	reader.onload = (e) => {
	    const oParser = new DOMParser();
	    const oDOM = oParser.parseFromString(e.target.result, 'application/xml');
	    if (oDOM.querySelector('PISA_EO_TAGE_IN_OUT')) {
		const participants = readDaysInOut(oDOM);
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
	    } else {
		readCourseInfo(oDOM);
	    }
	};

	reader.readAsText(firstFile);
    }
});

const readDaysInOut = (oDOM) => {
    const daysNodes = Array.from(oDOM.querySelectorAll('PISA_TAGE_ADZS'));
    const result = daysNodes.map(ParticipantDays.createFromNode);
    return result;
};

const readCourseInfo = (oDOM) => {
    const eventDescriptionNode = oDOM.querySelector('ZS_ANLASS_O');
    const result = EventDescription.createFromNode(eventDescriptionNode);
    console.log(oDOM);

    console.log(result);

    return result;
};

class EventDescription {
    constructor() {
    }

    static createFromNode(node) {
	let result = new EventDescription();
	const basicMappings = [
	    [ 'canton', 'ZS_SETID' ],
	    [ 'eventID', 'ZS_ANLASSID' ],
	    [ 'eventNumber', 'ZS_ANLASSNR' ],
	    [ 'description', 'ZS_ANL_DESCR' ],
	    [ 'level', 'ZS_ANL_ORG_LEVEL' ],
	    [ 'orgDescription', 'ZS_ANL_ORG_DESCR' ],
	    [ 'departmentID', 'ZS_ANL_DEPTID' ],
	    [ 'departmentDescription', 'ZS_ANL_DEPT_DESCR' ],
	    [ 'eventKind', 'ZS_ANLART_CD' ],
	    [ 'eventKindDescription', 'ZS_ANLART_DESCR' ],
	    [ 'eventType', 'ZS_ANLTYP_CD' ],
	    [ 'eventTypeDescription', 'ZS_ANLTYP_DESCR' ],
	    [ 'maxNumberOfParticipants', 'ZS_TEILN_MAX_NBR' ],
	    [ 'eventReferenceNumber', 'ZS_ANL_REFNR' ],
	    [ 'lawArticle', 'ZS_BZGARTIK_CD' ],
	    [ 'lawArticleDescription', 'ZS_BZGARTIK_DESCR' ],
	    [ 'language', 'ZS_KURSLANG_CD' ],
	    [ 'courseNumber', 'ZS_KURSNR' ],
	    [ 'courseDescription', 'ZS_KURSDESCR'],
	    [ 'courseLength', 'ZS_KURS_LEN' ],
	    [ 'eventFromDate', 'ZS_ANL_VON_DT'],
	    [ 'eventToDate', 'ZS_ANL_BIS_DT' ],
	    [ 'eventStartTime', 'ZS_ANL_EINR_TM' ],
	    [ 'eventEndTime', 'ZS_ANL_ENTL_TM' ],
	    [ 'eventPlace', 'ZS_ANL_EINR_ORT_CD' ],
	    [ 'eventPlaceDescription', 'ZS_ANL_EORT_DESCR'],
	    [ 'eventPlaceAddress1', 'ZS_ANL_EADDRESS1' ],
	    [ 'eventPlaceAddress2', 'ZS_ANL_EADDRESS2' ],
	    [ 'eventPlaceZipCode', 'ZS_ANL_EINR_POSTAL' ],
	    [ 'eventPlaceCity', 'ZS_ANL_EINR_CITY' ],
	    [ 'eventPlaceCanton', 'ZS_ANL_EINR_STATE' ],
	    [ 'eventFunction', 'ZS_ANL_FUNKT_CD' ],
	    [ 'eventFunctionDescription', 'ZS_ANL_FUNKT_DESCR' ],
	    [ 'eventRank', 'ZS_ANL_GRAD_CD' ],
	    [ 'eventRankDescription', 'ZS_ANL_GRAD_DESCR' ],
	    [ 'courseDirector', 'ZS_KURSLEITER_ID' ],
	    [ 'courseAccountant', 'ZS_RECHFUEHRER_ID' ],
	    [ 'eventIDReference', 'ZS_ANLID_FK' ]
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

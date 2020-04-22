console.log('Setting event handlers');

const fileInput = document.querySelector('#pisa-xml');

fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
	const firstFile = fileInput.files[0];
	const reader = new FileReader();
	reader.onload = (e) => {
	    const exportContent = readPISAExport(e.target.result);
	};

	reader.readAsText(firstFile);
    }
});

const readPISAExport = (txt) => {
    const oParser = new DOMParser();
    const oDOM = oParser.parseFromString(txt, 'application/xml');
    console.log(oDOM);
};

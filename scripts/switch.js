import fs from 'fs';

const vercelFile = JSON.parse(fs.readFileSync(`${process.cwd()}/vercel.json`, 'utf8'));
const netlifyFile = fs.readFileSync(`${process.cwd()}/_headers`, { encoding: 'utf-8' });

toggleNetlify(netlifyFile);

toggleVercel(vercelFile);

function toggleNetlify(file) {
	const lines = file.split('\n');
	const editedLines = lines.map((line) => {
		if (line.toLowerCase().includes('x-robots-tag')) {
			const newRobotsLine = commentNetlifyLine(line);
			return newRobotsLine;
		}
		return line;
	});
	fs.writeFileSync('_headers', editedLines.join('\n'));
}

function commentNetlifyLine(line) {
	if (line.includes('#')) {
		return line.replace('#', '').substring(1);
	}
	return `# ${line}`;
}

function toggleVercel(file) {
	const allHeaders = file.headers;
	const globalHeaders = allHeaders.find((headerObject) => headerObject.source === '/(.*)');
	const index = globalHeaders.headers.findIndex((x) => x.key.toLowerCase() == 'x-robots-tag');
	index === -1
		? (globalHeaders.headers = [
				...globalHeaders.headers,
				...[{ key: 'x-robots-tag', value: 'noindex' }]
		  ])
		: (globalHeaders.headers = globalHeaders.headers.filter(
				(header) => header.key.toLowerCase() !== 'x-robots-tag'
		  ));

	fs.writeFileSync('vercel.json', JSON.stringify(file));
}

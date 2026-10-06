export interface Degree {
	qualification: string;
	institution: string;
	location: string;
	status: string;
}

export const education: Degree[] = [
	{
		qualification: 'MSc Cybersecurity',
		institution: 'Munster Technological University',
		location: 'Ireland',
		status: 'In progress'
	},
	{
		qualification: 'BSc Computer Science and Information Systems',
		institution: 'Rhodes University',
		location: 'South Africa',
		status: 'Awarded'
	}
];

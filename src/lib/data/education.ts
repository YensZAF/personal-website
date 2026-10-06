export interface Degree {
	qualification: string;
	institution: string;
	status: string;
}

export const education: Degree[] = [
	{
		qualification: 'MSc Cybersecurity',
		institution: 'Munster Technological University',
		status: 'In progress'
	},
	{
		qualification: 'BSc Computer Science and Information Systems',
		institution: 'Munster Technological University',
		status: 'Awarded'
	}
];

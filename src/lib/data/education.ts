import mtu from '$lib/assets/universities/mtu-logo.svg';
import rhodes from '$lib/assets/universities/rhodes-logo-svg-color.svg';

export interface Degree {
	qualification: string;
	institution: string;
	location: string;
	status: string;
	logo: string;
}

export const education: Degree[] = [
	{
		qualification: 'MSc Cybersecurity',
		institution: 'Munster Technological University',
		location: 'Ireland',
		status: 'In progress',
		logo: mtu
	},
	{
		qualification: 'BSc Computer Science and Information Systems',
		institution: 'Rhodes University',
		location: 'South Africa',
		status: 'Awarded',
		logo: rhodes
	}
];

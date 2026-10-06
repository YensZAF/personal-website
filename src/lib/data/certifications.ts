export interface Certification {
	name: string;
	issuer: string;
}

/** Currently held, newest series first. */
export const certifications: Certification[] = [
	{
		name: 'SecurityX',
		issuer: 'CompTIA'
	},
	{
		name: 'Security Analytics Expert (CSAE)',
		issuer: 'CompTIA'
	},
	{
		name: 'Security Analytics Professional (CSAP)',
		issuer: 'CompTIA'
	},
	{
		name: 'CySA+',
		issuer: 'CompTIA'
	},
	{
		name: 'Security+',
		issuer: 'CompTIA'
	}
];

/** Held previously, now lapsed. Listed because the work behind them still counts. */
export const pastCertifications: string[] = [
	'Microsoft 365 Certified: Security Administrator Associate',
	'Microsoft Certified: Azure Security Engineer Associate',
	'Microsoft Certified: Security Operations Analyst Associate'
];

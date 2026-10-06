import csae from '$lib/assets/certifications/csae.svg';
import csap from '$lib/assets/certifications/csap.svg';
import cysaPlus from '$lib/assets/certifications/cysa-plus.svg';
import securityPlus from '$lib/assets/certifications/security-plus.svg';
import securityx from '$lib/assets/certifications/securityx.svg';

export interface Certification {
	name: string;
	issuer: string;
	logo: string;
}

/** Currently held, newest series first. */
export const certifications: Certification[] = [
	{
		name: 'SecurityX',
		issuer: 'CompTIA',
		logo: securityx
	},
	{
		name: 'Security Analytics Expert (CSAE)',
		issuer: 'CompTIA',
		logo: csae
	},
	{
		name: 'Security Analytics Professional (CSAP)',
		issuer: 'CompTIA',
		logo: csap
	},
	{
		name: 'CySA+',
		issuer: 'CompTIA',
		logo: cysaPlus
	},
	{
		name: 'Security+',
		issuer: 'CompTIA',
		logo: securityPlus
	}
];

/** Held previously, now lapsed. Listed because the work behind them still counts. */
export const pastCertifications: string[] = [
	'Microsoft 365 Certified: Security Administrator Associate',
	'Microsoft Certified: Azure Security Engineer Associate',
	'Microsoft Certified: Security Operations Analyst Associate'
];

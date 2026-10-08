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

export interface PastCertification {
	name: string;
	/** Shown on phones, where the full Microsoft title wraps across several lines. */
	shortName: string;
	status: string;
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

/** Held previously. Listed because the work behind them still counts. */
export const pastCertifications: PastCertification[] = [
	{
		name: 'Microsoft 365 Certified: Security Administrator Associate (MS-500)',
		shortName: 'Security Administrator (MS-500)',
		status: 'Exam retired by Microsoft'
	},
	{
		name: 'Microsoft Certified: Azure Security Engineer Associate (AZ-500)',
		shortName: 'Azure Security Engineer (AZ-500)',
		status: 'Exam retired by Microsoft'
	},
	{
		name: 'Microsoft Certified: Security Operations Analyst Associate (SC-200)',
		shortName: 'Security Operations Analyst (SC-200)',
		status: 'Expired'
	}
];

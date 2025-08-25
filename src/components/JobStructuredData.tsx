import type { Job } from '@/types/database'

interface Props {
  job: Job
}

export function JobStructuredData({ job }: Props) {
  const formatSalary = () => {
    if (job.salary_type === 'negotiable') {
      return undefined
    }

    const currency = 'JPY'
    const unitText = {
      hourly: 'HOUR',
      monthly: 'MONTH',
      yearly: 'YEAR'
    }[job.salary_type] || 'YEAR'

    if (job.salary_min && job.salary_max) {
      return {
        '@type': 'MonetaryAmount',
        currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salary_min,
          maxValue: job.salary_max,
          unitText
        }
      }
    } else if (job.salary_min) {
      return {
        '@type': 'MonetaryAmount',
        currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salary_min,
          unitText
        }
      }
    }
    return undefined
  }

  const getEmploymentType = () => {
    const types = {
      full_time: 'FULL_TIME',
      part_time: 'PART_TIME',
      contract: 'CONTRACTOR',
      temporary: 'TEMPORARY'
    }
    return types[job.employment_type as keyof typeof types] || 'FULL_TIME'
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: job.company,
      value: job.id
    },
    datePosted: job.published_at || job.created_at,
    ...(job.expires_at && { validThrough: job.expires_at }),
    employmentType: getEmploymentType(),
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'JP'
      }
    },
    ...(formatSalary() && { baseSalary: formatSalary() }),
    ...(job.requirements && { qualifications: job.requirements }),
    ...(job.benefits && { jobBenefits: job.benefits })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}


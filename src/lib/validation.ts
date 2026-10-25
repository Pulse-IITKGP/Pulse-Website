export interface InterestFormValues {
  name: string
  email: string
  affiliation: string
  interest: string
  message: string
}

export type InterestFormErrors = Partial<Record<keyof InterestFormValues, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const MESSAGE_MIN = 20
export const MESSAGE_MAX = 2000

export function validateInterestForm(values: InterestFormValues): InterestFormErrors {
  const errors: InterestFormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Enter your name.'
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!email) errors.email = 'Enter your email address.'
  else if (!EMAIL.test(email)) errors.email = 'Enter an email address in the format name@example.com.'

  if (!values.affiliation.trim()) errors.affiliation = 'Enter your affiliation or year of study.'

  if (!values.interest) errors.interest = 'Choose an area of interest.'

  if (!message) errors.message = 'Enter a message.'
  else if (message.length < MESSAGE_MIN)
    errors.message = `Message must be at least ${MESSAGE_MIN} characters (currently ${message.length}).`
  else if (message.length > MESSAGE_MAX) errors.message = `Message must be ${MESSAGE_MAX} characters or fewer.`

  return errors
}

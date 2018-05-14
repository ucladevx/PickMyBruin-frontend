/*
  Map first name and last name from profile (immutable map) into a string
*/
export const getName = profile => {
    return `${profile.get('first_name')} ${profile.get('last_name')}`
}

export const pluralize = (count, word) => {
  return count === 1 ? word : `${word}s`;
}
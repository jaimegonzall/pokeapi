export const capitalize = (text) => {
  console.log('capitalize', text);
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const uppercase = (text) => {
  return text.toUpperCase()
}

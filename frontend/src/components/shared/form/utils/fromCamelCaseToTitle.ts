export const fromCamelCaseToTitle = (camelCasedText: string): string => {
  const baseString = camelCasedText.trim().replace(camelCasedText[0], camelCasedText[0].toUpperCase());

  console.log(baseString);

  return baseString
}
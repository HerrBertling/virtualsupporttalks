// unslugify string
export default function unslugify(string) {
  const unhypenedString = string.replaceAll('-', ' ')
  return unhypenedString
    .split(' ')
    .map((word) => {
      const uppercased = word.charAt(0).toUpperCase() + word.slice(1)
      return uppercased
        .replaceAll('ue', 'ü')
        .replaceAll('oe', 'ö')
        .replaceAll('ae', 'ä')
        .replaceAll('Ae', 'Ä')
        .replaceAll('Ue', 'Ü')
        .replaceAll('Oe', 'Ö')
    })
    .join(' ')
}

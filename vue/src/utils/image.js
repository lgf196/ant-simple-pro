export function fileToDataURI(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      }
    })
    reader.addEventListener('error', reject)
    reader.readAsDataURL(file)
  })
}

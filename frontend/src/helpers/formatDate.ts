export default function formatDate(date: string): string | void {
  if (!date) {
    return
  }
  return date.replaceAll('-', '/')
}

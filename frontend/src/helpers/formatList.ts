export default function formatList(lista: string[]): string {
  const len = lista.length

  if (!lista || len === 0) {
    return ''
  }

  if (len === 1) {
    return lista[0]
  }

  const allExceptLast = lista.slice(0, -1)
  const lastElement = lista[len - 1]

  return `${allExceptLast.join(', ')} y ${lastElement}`
}

import { Skill } from '@/types/models/Skill.js'

export default function formatList(array: Skill[]): string {
  const len = array.length

  if (!array || len === 0) {
    return ''
  }

  if (len === 1) {
    return array[0].nombre
  }

  const allExceptLast = array.slice(0, -1)
  const lastElement = array[len - 1]

  return `${allExceptLast.map((skill) => skill.nombre).join(', ')} y ${lastElement.nombre}`
}

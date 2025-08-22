import { atom } from 'jotai'
import { Group } from './types'

export const selectedGroup = atom<Group | null>(null)
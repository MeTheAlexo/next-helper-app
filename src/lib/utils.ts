import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { generateRandomString } from '@oslojs/crypto/random'
import type { RandomReader } from '@oslojs/crypto/random'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateInviteCode() {
  const random: RandomReader = {
    read(bytes) {
      crypto.getRandomValues(bytes)
    }
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const code = generateRandomString(random, alphabet, 6)

  return code
}

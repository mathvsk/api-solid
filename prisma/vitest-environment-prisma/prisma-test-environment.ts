import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'

import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest/environments'

const prisma = new PrismaClient()

function generateNewDatabaseURL(newSchema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Por favor, forneça uma variável de ambiente DATABASE_URL.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', newSchema)

  return url.toString()
}

export default <Environment>{
  transformMode: 'ssr',
  name: 'prisma',

  async setup() {
    console.log('Setup')

    const schema = randomUUID()
    const databaseURL = generateNewDatabaseURL(schema)
    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        console.log('Teardown')

        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}

#!/bin/sh
npm prisma generate
npx prisma migrate dev
npm run dev-local

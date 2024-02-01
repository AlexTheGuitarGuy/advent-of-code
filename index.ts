import { performance } from 'perf_hooks'
import { calculateRockPaperScisors } from './2022/day-2/typescript/solution'

const startTime = performance.now()
calculateRockPaperScisors()
const endTime = performance.now()

const elapsedTime = endTime - startTime
console.log(`Elapsed time: ${elapsedTime.toFixed(4)} milliseconds`)

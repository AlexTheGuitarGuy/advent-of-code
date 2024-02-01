import { readFileSync } from 'fs'

const file = readFileSync('2022/day-1/input.txt', 'utf-8')

const summedCalories = file.split('\n').reduce(
    (accumulator, current) => {
        if (current === '') return [...accumulator, 0]
        return [
            ...accumulator.slice(0, accumulator.length + 1),
            accumulator[accumulator.length - 1] + +current,
        ]
    },
    [0]
)

const sorted = summedCalories.sort((a, b) => b - a)
console.log('result to part 1: ', sorted[0])

console.log('result to part 2: ', sorted[0] + sorted[1] + sorted[2])

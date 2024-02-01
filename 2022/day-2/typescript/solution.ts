import { readFileSync } from 'fs'

type OpponentMove = 'A' | 'B' | 'C'
type MyMove = 'X' | 'Y' | 'Z'
type Position = 'rock' | 'paper' | 'scissors'
type GameState = 'win' | 'lose' | 'draw'
export function calculateRockPaperScisors() {
    const file = readFileSync('2022/day-2/input.txt', 'utf-8')

    const positions: Position[] = ['rock', 'paper', 'scissors'] as const
    const getRoundResult = (
        opponentIndex: number,
        myIndex: number
    ): GameState => {
        if (myIndex === opponentIndex) return 'draw'
        else if (
            myIndex === (opponentIndex + 1) % 3 ||
            myIndex === (opponentIndex + 4) % 3
        )
            return 'win'
        return 'lose'
    }

    const getIndices = (
        opponent: OpponentMove,
        me: MyMove,
        isPart1 = true
    ): [number, number] => {
        const opponentToPosition: Record<OpponentMove, Position> = {
            A: 'rock',
            B: 'paper',
            C: 'scissors',
        } as const
        const convertedOpponent = opponentToPosition[opponent]
        const opponentIndex = positions.indexOf(convertedOpponent)

        const getPart1IndexOfMe = (): number => {
            const meToPosition: Record<MyMove, Position> = {
                X: 'rock',
                Y: 'paper',
                Z: 'scissors',
            } as const
            const convertedMe = meToPosition[me]

            return positions.indexOf(convertedMe)
        }
        const getPart2IndexOfMe = (): number => {
            const myAction = (
                {
                    X: 'lose',
                    Y: 'draw',
                    Z: 'win',
                } as Record<MyMove, GameState>
            )[me]
            const winningMove: Record<Position, Position> = {
                rock: 'paper',
                paper: 'scissors',
                scissors: 'rock',
            }

            const actionIndices: Record<GameState, number> = {
                win: positions.indexOf(winningMove[convertedOpponent]),
                draw:
                    (positions.indexOf(winningMove[convertedOpponent]) + 2) % 3,
                lose:
                    (positions.indexOf(winningMove[convertedOpponent]) + 1) % 3,
            }
            return actionIndices[myAction]
        }

        const myIndex = isPart1 ? getPart1IndexOfMe() : getPart2IndexOfMe()
        return [opponentIndex, myIndex]
    }

    const getShapeBonuses = (
        me: MyMove,
        myIndex: number,
        isPart1 = true
    ): number => {
        if (isPart1) {
            const shapeBonuses: Record<MyMove, 1 | 2 | 3> = {
                X: 1,
                Y: 2,
                Z: 3,
            } as const
            return shapeBonuses[me]
        }
        return myIndex + 1
    }

    const calculateResult = (isPart1 = true) => {
        return file.split('\n').reduce((accumulator, current) => {
            if (current === '') return accumulator
            const [opponent, me] = current.split(' ') as [OpponentMove, MyMove]

            const [opponentIndex, myIndex] = getIndices(opponent, me, isPart1)
            const roundResult = getRoundResult(opponentIndex, myIndex)

            const shapeBonus = getShapeBonuses(me, myIndex, isPart1)

            const roundResultBonuses: Record<GameState, 6 | 3 | 0> = {
                win: 6,
                draw: 3,
                lose: 0,
            } as const
            let roundResultBonus = roundResultBonuses[roundResult]

            const roundScore = shapeBonus + roundResultBonus
            return accumulator + roundScore
        }, 0)
    }

    const part1Res = calculateResult()
    const part2Res = calculateResult(false)
    console.log('part 1: ', part1Res)
    console.log('part 2:', part2Res)
}

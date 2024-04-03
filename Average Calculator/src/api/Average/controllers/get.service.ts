import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
const fs = require('fs')
export const calculate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const storedState = fs.readFileSync('state.json', 'utf8')
        const windowPrevSate = JSON.parse(storedState)

        let result = ''
        const type = req.params.numberID
        switch (type) {
            case 'p':
                result = 'prime'
                break

            case 'f':
                result = 'fibo'
                break

            case 'e':
                result = 'even'
                break

            case 'r':
                result = 'random'
                break
        }

        const windowSize = 10
        const numbers: Array<Number> = await axios.get(
            `http://20.244.56.144/test/${type}`
        )
        let windowCurrState = numbers

        if (windowCurrState.length > windowSize) {
            const startIndex = numbers.length - 10
            for (let i = startIndex; i < numbers.length; i++) {
                windowCurrState.push(numbers[i])
            }
        }

        let sum = 0
        windowCurrState.forEach(function (number) {
            sum = sum + number
        })
        const avg = sum / windowCurrState.length
        res.status(200).json({
            numbers,
            windowPrevSate,
            windowCurrState,
            avg,
        })

        setTimeout(() => {
            fs.writeFileSync('state.json', JSON.stringify(windowCurrState))
        }, 0)
    } catch (error) {
        console.log(error)
    }
}

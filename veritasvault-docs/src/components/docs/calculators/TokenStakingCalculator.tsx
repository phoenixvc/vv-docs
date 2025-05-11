"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/common/Card"
import { Button } from "@/components/common/Button"
import { calculateStakingRewards, formatCurrency } from "./utils"

export interface TokenStakingCalculatorProps {
  tokenSymbol?: string
  defaultAmount?: number
  defaultDuration?: number
  defaultApy?: number
  className?: string
}

export const TokenStakingCalculator: React.FC<TokenStakingCalculatorProps> = ({
  tokenSymbol = "TOKEN",
  defaultAmount = 1000,
  defaultDuration = 12,
  defaultApy = 5,
  className,
}) => {
  const [amount, setAmount] = useState<number>(defaultAmount)
  const [duration, setDuration] = useState<number>(defaultDuration)
  const [apy, setApy] = useState<number>(defaultApy)
  const [rewards, setRewards] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [errors, setErrors] = useState<{
    amount?: string
    duration?: string
    apy?: string
  }>({})

  useEffect(() => {
    calculateRewards()
  }, [amount, duration, apy])

  const validateInputs = (): boolean => {
    const newErrors: {
      amount?: string
      duration?: string
      apy?: string
    } = {}

    if (!amount || amount <= 0) {
      newErrors.amount = "Amount must be greater than 0"
    }

    if (!duration || duration <= 0) {
      newErrors.duration = "Duration must be greater than 0"
    }

    if (!apy || apy < 0) {
      newErrors.apy = "APY must be 0 or greater"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateRewards = () => {
    if (!validateInputs()) return

    const result = calculateStakingRewards(amount, apy, duration)
    setRewards(result.rewards)
    setTotal(result.total)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setAmount(isNaN(value) ? 0 : value)
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10)
    setDuration(isNaN(value) ? 0 : value)
  }

  const handleApyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setApy(isNaN(value) ? 0 : value)
  }

  return (
    <Card className={className}>
      <Card.Header>
        <Card.Title>Token Staking Calculator</Card.Title>
        <Card.Description>Calculate potential rewards for staking {tokenSymbol}</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount ({tokenSymbol})
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>}
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duration (months)
            </label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={handleDurationChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.duration && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.duration}</p>}
          </div>

          <div>
            <label htmlFor="apy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              APY (%)
            </label>
            <input
              id="apy"
              type="number"
              value={apy}
              onChange={handleApyChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.apy && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.apy}</p>}
          </div>

          <Button variant="primary" onClick={calculateRewards} className="w-full">
            Calculate
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Initial Investment</p>
              <p className="text-lg font-medium">
                {formatCurrency(amount)} {tokenSymbol}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Staking Rewards</p>
              <p className="text-lg font-medium text-green-600 dark:text-green-400">
                +{formatCurrency(rewards)} {tokenSymbol}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Value After {duration} Months</p>
              <p className="text-xl font-bold">
                {formatCurrency(total)} {tokenSymbol}
              </p>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}

export default TokenStakingCalculator


import React from 'react'

export const LeetCode = () => {
  // Multiply by a 1000 to get actual time
  // timezone from leetcode * 1000 + 21600000
  const leetCodeData = require("../data/LeetCodeDummy").data
  const converter = require("../converter/LeetCode")
  console.log(leetCodeData)
  console.log(converter.convert(leetCodeData))
  return (
    <div>LeetCode</div>
  )
}

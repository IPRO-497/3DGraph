
import moment from "moment/moment"
export const convert = (data) => {
  const newData = [] // Data list
  const array = Object.keys(data) // Change data keys to list
  const firstDate = new Date(array[0]) // Get First Date

  const weekYear1 = moment((new Date().getFullYear() - 1).toString())
  .weeksInYear() // Get number of weeks in first year

  const weekYear2 = moment((new Date().getFullYear()).toString())
  .weeksInYear() // Get number of weeks in second year

  // Fill up data with number of weeks in both years
  for(let i = 0; i < (weekYear1+weekYear2); i++)newData.push(new Array(7).fill(0))

  // Fill in the date provided with the array
  for(const date of array){
    const dayDate = new Date(date)
    const day = (dayDate.getDay()+1) % 7
    const week = moment(date).week()

    if((new Date()).getFullYear() - dayDate.getFullYear() !== 1){
      newData[weekYear1+week-2][day] = data[date]
    }else newData[week-1][day] = data[date]
  }

  // Remove excess weeks
  newData.splice(weekYear1-1 + moment().week(), weekYear2)
  newData.splice(0,moment(array[0]).week()-1)

  // Return data
  return newData
}
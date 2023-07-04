import React from 'react'

const mongo = () => {
  let arr1 = ["one", "two","three"]
let arr2 = ["four","five","six"]
let arr3 = []


// arr3.push(arr1,arr2)

for(let i=0;i<arr1.length;i++) {
  arr3.push(arr1[i])
}

for(let i=0;i<arr2.length;i++) {
  arr3.push(arr2[i])
}

arr3.reverse()


console.log(arr1,"arr1")
console.log(arr2,"arr2")
console.log(arr3,"arr3")


  return (
    <div>mongo</div>
  )
}

export default mongo
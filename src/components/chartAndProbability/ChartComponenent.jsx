import React, {useState, useEffect} from 'react'
// import SingleChart from './SingleChart'
import SingleChart from './SingleChart'
import TableStats from '../tableStats/TableStats'

class Dice{
    binomialCoefficient(n, k) {
      if (k > n) {
        return 0;
      }
      function factorial(num) {
        if (num === 0 || num === 1) {
          return 1;
        } else {
          return num * factorial(num - 1);
        }
      }
      return factorial(n) / (factorial(k) * factorial(n - k));
    }
    probabilityOnNumber(numDice, numDiceExpected, number) {
      let probDice = (1 + 6 - number) / 6;
      let probExactNumber =
        probDice ** numDiceExpected *
        (1 - probDice) ** (numDice - numDiceExpected);
      let combinations = this.binomialCoefficient(numDice, numDiceExpected);
      return probExactNumber * combinations;
    }
  
    probabilityForAllDices(diceUsed, number) {
      let listOfProbability = [];
  
      for (let i = 1; i < diceUsed + 1; i++) {
        listOfProbability.push(
          this.probabilityOnNumber(diceUsed, i, number) * 100
        );
      }
      
      let firstElement = 100 - listOfProbability.reduce((partialSum, a) => partialSum + a, 0)
      let allProbability = []
      allProbability.push(firstElement)
      allProbability = allProbability.concat(listOfProbability)
      return allProbability;
    }
}

export default function ChartComponenent() {
    // const tab
    const [tableStats, setTableStats] = useState({})
    const [createHitBool, setCreateHitBool] = useState(false)
    

    // to hit table
    const [toHitDicesLabel , setToHitDicesLabel] =useState([])
    const [toHitDicesProbability , setToHitDicesProbability] =useState([])


    function setupTableStats(stats){
        setTableStats(stats)
        setCreateHitBool(true)
        // console.log(tableStats);
    }

    function createLabelList(numberOfAtacks){
        const list = [];
        for (let i = 0; i <= numberOfAtacks; i++) {
          list.push(i);
        }
        return list;
    }

    function updateTable(stateName, setStateName){
        setStateName(!stateName)
    }

    function procederTalbeStatsToHit(){
        let labelHit = createLabelList(tableStats.numAttacks) // label for hit chart
        let DiceHit = new Dice() // to hit table is always max = tableStats.numAtacks
        console.log(tableStats.numAttacks, tableStats.toHit);
        let diceProbabilityTable = DiceHit.probabilityForAllDices(tableStats.numAttacks, tableStats.toHit)
        setToHitDicesLabel(labelHit)
        setToHitDicesProbability(diceProbabilityTable)
    }



    useEffect(()=>{
        console.log(tableStats);
        if(createHitBool){
            procederTalbeStatsToHit()
            // setCreateHitBool(!createHitBool)
        }
    },[tableStats])


    return (
    <div>
        <TableStats tableSetFunction={setupTableStats}/>
        {createHitBool ? <SingleChart chartLabelData={toHitDicesLabel} chartProbabilityData={toHitDicesProbability} tableName={'To Hit'}/> : ''}
        
        {/* <SingleChart/> */}
        {/* <SingleChart/> */}
    </div>
  )
}

import React , { useState } from 'react'

export default function TableStats({tableSetFunction}) {
    const [numAttacks, setNumAttacks] = useState(1);
    const [toHit, setToHit] = useState(2);
    const [toWound, setToWound] = useState(2);
    const [damage, setDamage] = useState(1);
    const [enemySave, setEnemySave] = useState(2);
    const [enemyHP, setEnemyHP] = useState(1);
  
    const calculateDamage = () => {
      // Calculate damage based on inputs
      const hits = numAttacks * (toHit / 6);
      const wounds = hits * (toWound / 6);
      const failedSaves = wounds * (1 - enemySave / 6);
      const damage = failedSaves * enemyHP;
  
      return damage;
    };
  
    const handleNumAttacksChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value)) {
        setNumAttacks(value);
      }
    };
  
    const handleToHitChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value > 1) {
        setToHit(value);
      }
    };
  
    const handleToWoundChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value > 1) {
        setToWound(value);
      }
    };
    const handleToDamageChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value > 1) {
        setDamage(value);
      }
    };
  
    const handleEnemySaveChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value > 1) {
        setEnemySave(value);
      }
    };
  
    const handleEnemyHPChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value)) {
        setEnemyHP(value);
      }
    };

    function setupTable(){
    //     console.log({
    //         numAttacks:numAttacks,
    //         toHit:toHit,
    //         toWound:toWound,
    //         damage:damage,
    //         enemySave:enemySave,
    //         enemyHP:enemyHP,

    // });
        tableSetFunction({
            numAttacks:numAttacks,
            toHit:toHit,
            toWound:toWound,
            damage:damage,
            enemySave:enemySave,
            enemyHP:enemyHP,

        })
    }
  
    return (
      <table>
        <thead>
          <tr>
            <th>Number of Attacks</th>
            <th>To Hit</th>
            <th>To Wound</th>
            <th>Atack Dmg</th>
            <th>Enemy Save</th>
            <th>Enemy HP</th>
            <th>Calculate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="number" value={numAttacks} onChange={handleNumAttacksChange} min={1} defaultValue={1}/>
            </td>
            <td>
              <input type="number" value={toHit} onChange={handleToHitChange} min={2} max={6} defaultValue={2}/>
            </td>
            <td>
              <input type="number" value={toWound} onChange={handleToWoundChange} min={2} max={6} defaultValue={2}/>
            </td>
            <td>
              <input type="number" value={damage} onChange={handleToDamageChange} defaultValue={1} min={1}/>
            </td>
            <td>
              <input type="number" value={enemySave} onChange={handleEnemySaveChange} min={2} max={6} defaultValue={2} />
            </td>
            <td>
              <input type="number" value={enemyHP} onChange={handleEnemyHPChange} min={1} defaultValue={1}/>
            </td>
            <td>
                <button onClick={setupTable}>calculate</button>
            </td>
          </tr>
        </tbody>
      </table>
    );

 
}

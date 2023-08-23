import { useState } from 'react';
import './App.css';
import classes from './classes.json';
import GearSlot from './GearSlot';

function App() {
  const [selectedClass, setSelectedClass] = useState('Barbarian');
  const [gearSlots, setGearSlots] = useState([]);
  const [gear, setGear] = useState({});

  const classOptions = classes;

  function classChangeHandler(event) {
    setSelectedClass(event.target.value);
  }

  function addGearSlot() {
    const newGearSlots = JSON.parse(JSON.stringify(gearSlots));
    const newIndex = newGearSlots.length;
    newGearSlots.push(newIndex);
    setGearSlots(newGearSlots);
  }

  function removeGearSlot(gearId) {
    const newGearSlots = JSON.parse(JSON.stringify(gearSlots));
    const newIndex = newGearSlots.indexOf(gearId);
    newGearSlots.splice(newIndex, 1);
    setGearSlots(newGearSlots);
  }

  function updateGear(gearId, affixes, type) {
    const newGear = JSON.parse(JSON.stringify(gear));
    newGear[gearId] = { type: type, affixes: affixes };
    setGear(newGear);
  }

  function exportGear() {
    const charName = prompt('Character Name');
    const lineBreak = '\n';
    let textString = 'GEAR LIST';
    textString += lineBreak;
    Object.keys(gear).forEach((key) => {
      const curGear = gear[key];
      textString += `Gear Slot: ${curGear.type.toUpperCase()} ${lineBreak}`;
      textString += 'Affixes';
      textString += lineBreak;
      curGear.affixes
        .sort((a, b) => (a.type < b.type ? 1 : -1))
        .forEach((affix) => {
          textString += `${affix.affix} (${affix.type})`;
          textString += lineBreak;
        });
      textString += lineBreak;
    });
    const blob = new Blob([textString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${charName}_gear.txt`;
    link.href = url;
    link.click();
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <select
          onChange={classChangeHandler}
          value={selectedClass}
          style={{ marginBottom: 8 }}
        >
          {classOptions
            .sort((a, b) => (a > b ? 1 : -1))
            .map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
        </select>
        <div style={{ marginBottom: 8 }}>
          <button onClick={exportGear}>Export Gear</button>
        </div>
      </div>
      <div>
        {gearSlots.map((slotId) => {
          return (
            <GearSlot
              key={slotId}
              slotId={slotId}
              selectedClass={selectedClass}
              removeGearSlot={removeGearSlot}
              updateGear={updateGear}
            />
          );
        })}
      </div>
      <div style={{ marginBottom: 8 }}>
        <button onClick={addGearSlot}>Add Gear Slot</button>
      </div>
    </div>
  );
}

export default App;

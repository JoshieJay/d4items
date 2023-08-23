import React, { useEffect, useState } from 'react';
import gear from './gear.json';
import affixes from './gear_affixes.json';

export default function GearSlot({
  slotId,
  selectedClass,
  removeGearSlot,
  updateGear,
}) {
  const [selectedGear, setSelectedGear] = useState('amulet');
  const [textFilter, setTextFilter] = useState('');
  const [showAffixes, setShowAffixes] = useState(true);
  const [selectedAffixes, setSelectedAffixes] = useState([]);
  const gearOptions = gear;
  const affixOptions = affixes;

  useEffect(() => {
    updateGear(slotId, selectedAffixes, selectedGear);
  }, [selectedAffixes, selectedGear]);

  function gearChangeHandler(event) {
    setSelectedAffixes([]);
    setSelectedGear(event.target.value);
  }

  function addAffix(affix, type) {
    const newAffixes = JSON.parse(JSON.stringify(selectedAffixes));
    // const index = newAffixes.indexOf(affix);
    const index = newAffixes.findIndex((a) => a.affix === affix);
    if (index === -1) {
      newAffixes.push({ affix: affix, type: type });
    } else {
      newAffixes.splice(index, 1);
    }
    setSelectedAffixes(newAffixes);
  }

  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid black',
        marginBottom: 16,
        padding: 16,
      }}
    >
      <div
        style={{
          borderRight: '1px solid black',
          marginRight: 8,
          padding: 16,
          width: 400,
        }}
      >
        <div style={{ marginBottom: 8 }}>
          Gear Slot: {slotId}
          <button
            style={{ marginLeft: 4 }}
            onClick={() => removeGearSlot(slotId)}
          >
            Remove Gear
          </button>
        </div>
        <div style={{ marginBottom: 8 }}>
          A piece of gear can have one implict and four affixes. Use this to
          either generate accurate items or just a list of affixes to look for.
        </div>
        <div style={{ marginBottom: 8 }}>
          <select
            onChange={gearChangeHandler}
            value={selectedGear}
            style={{ marginBottom: 8 }}
          >
            {gearOptions
              .sort((a, b) => (a > b ? 1 : -1))
              .map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
          </select>
          <button
            style={{ marginLeft: 4 }}
            onClick={() => setShowAffixes(!showAffixes)}
          >
            {showAffixes ? 'Hide Affixes' : 'Show Affixes'}
          </button>
          {showAffixes && (
            <div style={{ marginBottom: 8 }}>
              <input
                type='text'
                placeholder='filter affixes'
                value={textFilter}
                onChange={(event) => setTextFilter(event.target.value)}
              ></input>
            </div>
          )}
          {showAffixes && (
            <div
              style={{
                marginBottom: 8,
                maxHeight: 300,
                overflow: 'scroll',
                border: '1px solid black',
                borderRadius: 5,
              }}
            >
              <div
                style={{
                  marginLeft: 8,
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                IMPLICITS
              </div>
              {affixOptions.filter((affix) => {
                return (
                  affix[selectedGear] &&
                  affix.class === 'Implicit' &&
                  affix.affix.toLowerCase().includes(textFilter.toLowerCase())
                );
              }).length > 0 ? (
                affixOptions
                  .filter((affix) => {
                    return (
                      affix[selectedGear] &&
                      affix.class === 'Implicit' &&
                      affix.affix
                        .toLowerCase()
                        .includes(textFilter.toLowerCase())
                    );
                  })
                  .map((affix, index) => {
                    return (
                      <div
                        value={index}
                        key={index}
                        className={
                          selectedAffixes
                            .map((a) => a.affix)
                            .includes(affix.affix)
                            ? 'gearSelected'
                            : 'gearOption'
                        }
                        onClick={() => addAffix(affix.affix, 'Implicit')}
                      >
                        {affix.affix}
                      </div>
                    );
                  })
              ) : (
                <div
                  style={{
                    marginLeft: 8,
                  }}
                >
                  NONE
                </div>
              )}
            </div>
          )}
          {showAffixes && (
            <div
              style={{
                marginBottom: 8,
                maxHeight: 300,
                overflow: 'scroll',
                border: '1px solid black',
                borderRadius: 5,
              }}
            >
              <div
                style={{
                  marginLeft: 8,
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                AFFIXES
              </div>
              {affixOptions.filter((affix) => {
                return (
                  affix[selectedGear] &&
                  affix.class !== 'Implicit' &&
                  (affix.class === 'All Classes' ||
                    affix.class === selectedClass) &&
                  affix.affix.toLowerCase().includes(textFilter.toLowerCase())
                );
              }).length > 0 ? (
                affixOptions
                  .filter((affix) => {
                    return (
                      affix[selectedGear] &&
                      affix.class !== 'Implicit' &&
                      (affix.class === 'All Classes' ||
                        affix.class === selectedClass) &&
                      affix.affix
                        .toLowerCase()
                        .includes(textFilter.toLowerCase())
                    );
                  })
                  .map((affix, index) => {
                    return (
                      <div
                        value={index}
                        key={index}
                        className={
                          selectedAffixes
                            .map((a) => a.affix)
                            .includes(affix.affix)
                            ? 'gearSelected'
                            : 'gearOption'
                        }
                        onClick={() => addAffix(affix.affix, 'Affix')}
                      >
                        {affix.affix}
                      </div>
                    );
                  })
              ) : (
                <div
                  style={{
                    marginLeft: 8,
                  }}
                >
                  NONE
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 'bolder' }}>{selectedGear.toUpperCase()}</div>
        {selectedAffixes.map((affix, index) => {
          return <div key={index}>{affix.affix}</div>;
        })}
      </div>
    </div>
  );
}

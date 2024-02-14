//chat poo poo pee
import React, { useState } from 'react';

interface ChecklistProps {
  checklist: string[];
}

const ChecklistComponent: React.FC<ChecklistProps> = ({ checklist }) => {
  // State to keep track of the checked items
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Handler function to toggle the checkbox state
  const handleCheckboxChange = (item: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [item]: !prevCheckedItems[item] // Toggle the state
    }));
  };

  return (
    <div>
      <h2>Checklist</h2>
      <ul>
        {checklist.map((item) => (
          <li key={item}>
            <input
              type="checkbox"
              id={item}
              checked={checkedItems[item] || false}
              onChange={() => handleCheckboxChange(item)}
            />
            <label htmlFor={item}>{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ChecklistComponent;

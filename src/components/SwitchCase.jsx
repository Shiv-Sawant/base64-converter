import React, { useState } from 'react'

const SwitchCase = () => {
    const [material, setMaterial] = useState('wood');
    const [vehicleType1, setVehicleType1] = useState('vehicletype1');
    const [vehicleType2, setVehicleType2] = useState('vehicletype2');
    const [vehicleType3, setVehicleType3] = useState('vehicletype3');
  
    const handleMaterialChange = (event) => {
      const newMaterial = event.target.value;
      setMaterial(newMaterial);
  
      // Set predefined values for vehicle types based on the selected material
      switch (newMaterial) {
        case 'wood':
          setVehicleType1('vehicletype1');
          setVehicleType2('vehicletype2');
          setVehicleType3('vehicletype3');
          break;
        case 'metal':
          setVehicleType1('vehicletype4');
          setVehicleType2('vehicletype5');
          setVehicleType3('vehicletype6');
          break;
        case 'plastic':
          setVehicleType1('vehicletype7');
          setVehicleType2('vehicletype8');
          setVehicleType3('vehicletype9');
          break;
        default:
          setVehicleType1('');
          setVehicleType2('');
          setVehicleType3('');
      }
    };
  
    const handleVehicleType1Change = (event) => {
      const newVehicleType1 = event.target.value;
      setVehicleType1(newVehicleType1);
    };
  
    const handleVehicleType2Change = (event) => {
      const newVehicleType2 = event.target.value;
      setVehicleType2(newVehicleType2);
    };
  
    const handleVehicleType3Change = (event) => {
      const newVehicleType3 = event.target.value;
      setVehicleType3(newVehicleType3);
    };
  
    return (
      <div>
        <label>
          Material:
          <select value={material} onChange={handleMaterialChange}>
            <option value="wood">Wood</option>
            <option value="metal">Metal</option>
            <option value="plastic">Plastic</option>
          </select>
        </label>
  
        <label>
          Vehicle Type 1:
          <select value={vehicleType1} onChange={handleVehicleType1Change}>
            <option value="vehicletype1">Vehicle Type 1</option>
            <option value="vehicletype4">Vehicle Type 4</option>
            <option value="vehicletype7">Vehicle Type 7</option>
          </select>
        </label>
  
        <label>
          Vehicle Type 2:
          <select value={vehicleType2} onChange={handleVehicleType2Change}>
            <option value="vehicletype2">Vehicle Type 2</option>
            <option value="vehicletype5">Vehicle Type 5</option>
            <option value="vehicletype8">Vehicle Type 8</option>
          </select>
        </label>
  
        <label>
          Vehicle Type 3:
          <select value={vehicleType3} onChange={handleVehicleType3Change}>
            <option value="vehicletype3">Vehicle Type 3</option>
            <option value="vehicletype6">Vehicle Type 6</option>
            <option value="vehicletype9">Vehicle Type 9</option>
          </select>
        </label>
      </div>
    );
}

export default SwitchCase
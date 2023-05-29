const fs = require('fs');

const cities = [
  { city: 'Mumbai' },
  { city: 'Delhi' },
  { city: 'Bangalore' },
  { city: 'Kolkata' },
  { city: 'Chennai' },
  { city: 'Hyderabad' },
  { city: 'Ahmedabad' },
  { city: 'Pune' },
  { city: 'Jaipur' },
  { city: 'Lucknow' }
];

const generateRandomDate = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const randomDate = new Date(
    startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
  );
  return randomDate.toISOString().split('T')[0];
};

const generateRandomPrice = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateFlightData = () => {
  const flightData = [];

  for (let i = 0; i < cities.length; i++) {
    const sourceCity = cities[i].city;

    for (let j = 0; j < cities.length; j++) {
      const destinationCity = cities[j].city;

      if (sourceCity !== destinationCity) {
        for (let k = 0; k < 30; k++) {
          const randomDate = generateRandomDate('2023-05-01', '2023-05-30');
          const randomPrice = generateRandomPrice(1000, 5000);

          flightData.push({
            source: sourceCity,
            destination: destinationCity,
            date: randomDate,
            price: randomPrice
          });
        }
      }
    }
  }

  return flightData;
};

const jsonData = generateFlightData();
console.log(jsonData);

const folderName = 'jsonDataGenerator'; // Name of the folder
const fileName = 'jsonDataGenerated.json'; // Name of the file

const filePath = `D:/STUDY MATERIAL/REACT/Flight_Price/server/${folderName}/${fileName}`;
fs.writeFileSync(filePath, JSON.stringify(jsonData));

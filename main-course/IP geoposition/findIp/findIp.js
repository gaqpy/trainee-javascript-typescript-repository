import fs from 'fs';

const IP_CONSTS = [16777216, 65536, 256, 1];

const dotProduct = (arr1, arr2) => {
  const product = arr1.map((x, i) => arr1[i] * arr2[i]);
  return product.reduce((a, b) => a + b);
};

const convertToNumber = (ip) => {
  let values = ip.split(".");
  return dotProduct(values, IP_CONSTS);
};

const convertIPToLocation = async(ip) => {
  const csvFilePath = 'IP geoposition/findIp/locationsByIp.CSV';

  return new Promise((resolve, reject) => {
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading CSV file:', err);
        reject(err);
        return;
      }

      const rows = data.split('\n');

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i].split(',');

        if (row.length >= 4) {
          const startIP = parseInt(row[0].replace(/"/g, ''));
          const endIP = parseInt(row[1].replace(/"/g, ''));
          const userIP = convertToNumber(ip);

          if (userIP >= startIP && userIP <= endIP) {
            const location = {
              ip: userIP,
              country: row[2].replace(/"/g, ''),
              countryFullName: row[3].replace(/"/g, '').replace(/\r/g, ''),
            }
            console.log('Location:', location);
            resolve(location);
            return JSON.stringify(location, null, 3);
          }
        }
      }

      console.log('Location not found for the given IP address.');
      resolve(null);
    });
  });
}

export default convertIPToLocation;
export function groupClientsByLastName(clients) {
  if (!clients) {
    return [];
  }
  const initials = new Set();

  clients.forEach(client => {
    initials.add(client.last_name[0]);
  });

  const preResultObject = {};
  [...initials].sort().forEach(letter => {
    preResultObject[letter] = [];
  });

  clients.forEach(client => {
    const letter = client.last_name[0];
    preResultObject[letter].push(client);
  });

  const results = [];
  for (let property in preResultObject) {
    if (preResultObject.hasOwnProperty(property)) {
      results.push({
        letter: property,
        clients: preResultObject[property].sort(),
      });
    }
  }
  return results;
}

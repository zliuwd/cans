const compareStrings = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
};

const sortClientsInGroups = clients => {
  return clients.sort((a, b) => {
    const aLastName = a.last_name.toUpperCase();
    const bLastName = b.last_name.toUpperCase();
    if (aLastName !== bLastName) {
      return compareStrings(aLastName, bLastName);
    } else {
      return compareStrings(a.first_name, b.first_name);
    }
  });
};

export function groupClientsByLastName(clients) {
  if (!clients) {
    return [];
  }
  const initials = new Set();

  clients.forEach(client => {
    initials.add(client.last_name[0].toUpperCase());
  });

  const preResultObject = {};
  [...initials].sort().forEach(letter => {
    preResultObject[letter] = [];
  });

  clients.forEach(client => {
    const letter = client.last_name[0].toUpperCase();
    preResultObject[letter].push(client);
  });

  const results = [];
  for (let property in preResultObject) {
    if (preResultObject.hasOwnProperty(property)) {
      results.push({
        letter: property,
        clients: sortClientsInGroups(preResultObject[property]),
      });
    }
  }
  return results;
}

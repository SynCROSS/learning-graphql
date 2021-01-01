export const people = [
  {
    id: 1,
    name: 'SynCROSS',
    age: 18,
    gender: 'Male',
  },
  {
    id: 2,
    name: 'LYW',
    age: 18,
    gender: 'Female',
  },
  {
    id: 3,
    name: 'WJS',
    age: 18,
    gender: 'Female',
  },
];

export const getPersonById = id => {
  const filteredPeople = people.filter(person => id === person.id);
  return filteredPeople[0];
};

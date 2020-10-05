const faker = require('faker')

const populateRequestors = (number) => {
  const listOfWorkers = []
  for (let i = 0; i < number; i++) {
    listOfWorkers.push({
      user: faker.random.uuid(),
      description: faker.lorem.paragraphs(),
      name: faker.lorem.words(),
      logo: null,
      created: faker.date.past()
    })
  }
  return listOfWorkers
}

module.exports = populateRequestors

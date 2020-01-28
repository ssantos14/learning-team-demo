const {db, Movie} = require('./server/models')

async function seed() {
   await db.sync({force: true})
   console.log('db synced!')
 
   const movies = await Promise.all([
      Movie.create({
         name: 'The Dark Knight',
         genre: 'action'
      }),
      Movie.create({
         name: '13 Going On 30',
         genre: 'rom-com'
      }),
      Movie.create({
         name: 'Rush Hour',
         genre: 'comedy'
      })
   ])
 
   console.log(`seeded ${movies.length} movies`)
   console.log(`seeded successfully`)
 }

async function runSeed() {
   console.log('seeding...')
   try {
     await seed()
   } catch (err) {
     console.error(err)
   } finally {
     console.log('closing db connection')
     await db.close()
     console.log('db connection closed')
   }
}

runSeed();
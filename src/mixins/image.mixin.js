export const image = {
   methods: {
        getImage (filename) {
          return require(`@/assets/covers/${filename}`)
      }
   }
}

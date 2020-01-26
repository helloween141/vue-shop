export const mixin = {
   methods: {
        getImage (filename) {
          return require(`@/assets/covers/${filename}`)
      }
   }
}

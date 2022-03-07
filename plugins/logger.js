export default ({ app }, inject) => {
  app.router.beforeEach((to, from, next) => {
    console.log(`[ROUTER] move to '${to.fullPath}'`)
    next()
  })
}

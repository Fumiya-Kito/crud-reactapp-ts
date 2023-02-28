class Application {
  id: string
  name: string

  constructor (id: string, name: string) {
    this.id = id
    this.name = name
  }

  updateApplication (name: string) {
    this.name = name
  }
}


export default Application;
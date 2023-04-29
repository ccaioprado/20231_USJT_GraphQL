
import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const livros = [
  {
    id: '1',
      titulo: 'Effective Java',
      genero: 'Técnico',
      edicao: 3,
      preco: '39.99'
  },
  {
    id: '2',
      titulo: 'Concrete Mathematics',
      genero: 'Técnico',
      edicao: 1,
      preco: 89.99
  }
]


const schema = createSchema({
  typeDefs: `
    type Query {
      hello: String!
      name: String!
      id: ID!
      location: String!
      age: Int!
      ofAge: Boolean!
      salary: Float
      adicionar(numeros: [Float!] !): Float!
      notas: [Int]!
      bemVindo(nome: String): String!
      effectiveJava: Livro!
      livros: [Livro!] !
    },

    type Livro {
      id: ID!,
      titulo: String!,
      genero: String!,
      edicao: Int,
      preco: Float
    }
  `,
  resolvers: {
    Query: {
      hello(){
        return "Minha primeira API GraphQL!"
      },
      name(){
        return "Ana"
      },
      id: () => "uma chave qualquer aqui",
      location: () => "Rua B, numero 1",
      age: () => 1,
      ofAge: () => true,
      salary: () => 400,
      effectiveJava() {
        return {
          id: 123456,
          titulo: "Effective Java",
          genero: "Técnico",
          edicao: 3,
          preco: 43.9
        }
      },
      bemVindo(parent, args, ctx, info){
        return `Bem vindo ${args.nome? args.nome : "Visitante"}`
        
      },
      notas(parent, args, ctx, info){
        return[10,2,7,7,8]
      },
      adicionar(parent, args, ctx, info){
        return args.numeros.lenght === 0 ? 0 : args.numeros.reduce((ac, atual) =>{
          return ac + atual;
        })
      },
      livros(parent,args,ctx,info){
        return livros;
      }
    }
  }
})

const yoga = createYoga({
  schema: schema
})

const porta = 4000
const server = createServer(yoga)
server.listen(porta, () => console.log(`Servidor ok. Porta ${porta}.`))

import { gql } from "apollo-server-express";

const typeDefs = gql`
  type TarotCard {
    name: String
    image: String
  }

  type TarotReading {
    id: ID
    cards: [TarotCard]
    quote: String
    createdAt: String
  }

  type User {
    id: ID
    username: String
    email: String
  }

  type Query {
    getTarotReading: TarotReading
    getUser: User
  }

  type Mutation {
    login(email: String!, password: String!): String
    signup(username: String!, email: String!, password: String!): User
    saveTarotReading(cards: [TarotCardInput], quote: String!): TarotReading
  }

  input TarotCardInput {
    name: String
    image: String
  }
`;

export default typeDefs;

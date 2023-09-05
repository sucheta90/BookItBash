const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    password: String
    events: [Event]
}

type Event {
    _id: ID
    eventId: String!
    name: String!
    type: String!
    venue: [Venue]
    image: [Image]
    ticketLink: String!
    priceRangeMin: Int
    priceRangeMax: Int
    segment: Segment
    genre: Genre
    subGenre: SubGenre
}

type Venue {
    _id: ID
    venueId: String!
    name: String!
    type: String
    address: String!
    cityName: String!
    stateName: String!
    stateCode: String!
}

type Image {
    _id: ID
    ratio: String
    link: String!
    height: Int
    width: Int
    fallback: Boolean
}

type Segment {
    _id: ID
    segmentId: String!
    name: String
}

type Genre {
    _id: ID
    genreId: String!
    name: String
}

type SubGenre {
    _id: ID
    subGenreId: String!
    name: String
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
    event(eventId: ID!): Event
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth

    addEvent(eventId: ID!): Event

    removeUser: User
    removeEvent(eventId: ID!): Event
}

`



module.exports = typeDefs;

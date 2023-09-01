const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    events: [Event]
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

type Event {
    _id: ID
    eventId: String!
    name: String!
    type: String!
    venue: [Venue]
    image: [Image]
    ticketLink: String!
    priceRangeMin: Float
    priceRangeMax: Float
    segment: Segment
    genre: Genre
    subGenre: SubGenre
}

input EventData {
    _id: ID
    eventId: String!
    name: String!
    type: String!
    venue: [Venue]
    image: [Image]
    ticketLink: String!
    priceRangeMin: Float
    priceRangeMax: Float
    segment: Segment
    genre: Genre
    subGenre: SubGenre
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

input Segment {
    _id: ID
    segmentId: String!
    name: String
    }

input Genre {
     _id: ID
    genreId: String!
    name: String
    }

input SubGenre {
    _id: ID
    subGenreId: String!
    name: String
    }
    

type Auth {
    token: ID!
    user: User
}


type Query {
    user(username: String!): User
    events(username: String): [Event]
    event(Id: ID!): Event
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createEvent(event: EventData): Event
    removeUser(userId: ID!): User
    removeEvent(id: ID!): Event
}


`



module.exports = typeDefs;

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
    priceRangeMin: Float
    priceRangeMax: Float
    segment: Segment
    genre: Genre
    subGenre: SubGenre
    date: String
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
    segmentId: String!
    name: String
}

type Genre {
    genreId: String!
    name: String
}

type SubGenre {
    subGenreId: String!
    name: String
}

type Auth {
    token: ID!
    user: User
  }


input EventData {
    eventId: String!
    name: String!
    type: String!
    venue: [VenueData]
    image: [ImageData]
    ticketLink: String!
    priceRangeMin: Float
    priceRangeMax: Float
    segment: SegmentData
    genre: GenreData
    subGenre: SubGenreData
    date: String
}

input VenueData {
    venueId: String!
    name: String!
    type: String
    address: String!
    cityName: String!
    stateName: String!
    stateCode: String!
}

input ImageData {
    ratio: String
    link: String!
    height: Int
    width: Int
    fallback: Boolean
}
input SegmentData {
    segmentId: String
    name: String
}

input GenreData {
    genreId: String
    name: String
}

input SubGenreData {
    subGenreId: String
    name: String
}

type Query {
    me: User
    event(_id: ID!): Event
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth

    addEvent(event: EventData): Event

    removeUser(userId: ID!): User
    removeEvent(_id: ID!): Event
}

`



module.exports = typeDefs;

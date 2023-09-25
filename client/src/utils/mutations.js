import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        email
        password
        username
        _id
      }
      token
    }
  }
`;
export const ADD_EVENT = gql`
mutation addEvent($event: EventData) {
  addEvent(event: $event) {
    _id
    eventId
    name
    type
    venue {
      _id
      address
      cityName
      name
      stateCode
      stateName
      type
      venueId
    }
    image {
      fallback
      height
      link
      _id
      ratio
      width
    }
    ticketLink
    priceRangeMin
    priceRangeMax
    segment {
      name
      segmentId
    }
    genre {
      genreId
      name
    }
    subGenre {
      name
      subGenreId
    }
    date
  }
}
`;

export const REMOVE_EVENT= gql`
mutation Mutation($_id: ID!) {
  removeEvent(_id: $_id) {
    _id
  }
}
`

export const REMOVE_USER= gql`
mutation Mutation($userId: ID!) {
  removeUser(userId: $userId) {
    _id
  }
}
`

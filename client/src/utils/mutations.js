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

export const Login_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        email
        password
        username
      }
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
            venueId
            name
            type
            address
            cityName
            stateName
            stateCode
        }
        image {
            _id
            ratio
            link
            height
            width
            fallback

        }
        ticketLink
        priceRangeMin
        priceRangeMax
        segment {
            segmentId
            name
        }
        genre {
            genreId
            name
        }
        subGenre {
            subGenreId
            name
        }
    }
}

`

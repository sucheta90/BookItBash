import { gql } from '@apollo/client';

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         createdAt
//       }
//     }
//   }
// `;


export const QUERY_ME = gql`
query me {
    me {
        _id
        email
        events {
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
          date
        }
        password
        username
      }
}

`

export const QUERY_SINGLE_EVENT = gql`
query getSingleEvent($id: ID!) {
    event(_id: $id) {
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
        date
      }
  }

`
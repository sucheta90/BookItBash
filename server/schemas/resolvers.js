const { User, Event } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("events");
      }
      throw AuthenticationError;
    },
    event: async (parent, { _id }) => {
      return Event.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addEvent: async (
      parent,
      {
        event: {
          eventId,
          name,
          type,
          venue,
          image,
          ticketLink,
          priceRangeMin,
          priceRangeMax,
          segment,
          genre,
          subGenre,
          date,
        },
      },
      context
    ) => {
      if (context.user) {
        // console.log(event);
        // console.log(args);
        const event = await Event.create({
          eventId,
          name,
          type,
          venue,
          image,
          ticketLink,
          priceRangeMin,
          priceRangeMax,
          segment: {
            segmentId: segment.segmentId,
            name: segment.name,
          },
          genre: {
            genreId: genre.genreId,
            name: genre.name,
          },
          subGenre: {
            subGenreId: subGenre.subGenreId,
            name: subGenre.name,
          },
          date,
        });

        await User.findOneAndUpdate(
          // "64f790ff1d34174571bdb4b6"
          { _id: context.user._id },
          // { _id: "64f790ff1d34174571bdb4b6" },
          { $addToSet: { events: event._id } }
        );

        return event;
      }

      throw AuthenticationError;
      ("You need to be logged in!");
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    removeEvent: async (parent, { _id }, context) => {
      if (context.user) {
        const event = await Event.findOneAndDelete({
          _id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: event._id } }
        );

        return event;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;

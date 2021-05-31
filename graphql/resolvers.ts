import { getCharacter, newVoice } from "./db";

const resolvers = {
  Query: {
    characters: () => getCharacter(),
  },
  Mutation: {
    updateVoice: (_, { id, voice }) => newVoice({ id, voice }),
  }
};

export default resolvers;
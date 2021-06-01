import { getCharacter, newVoice, getChapter, getScript, updateSpeaker } from "./db";

const resolvers = {
  Query: {
    characters: () => getCharacter(),
    chapters: () => getChapter(),
    scripts: (_, { series }) => getScript({ series }),
  },
  Mutation: {
    updateVoice: (_, { id, voice }) => newVoice({ id, voice }),
    updateSpeaker: (_, { series, line, speaker }) => updateSpeaker({ series, line, speaker }),
  }
};

export default resolvers;
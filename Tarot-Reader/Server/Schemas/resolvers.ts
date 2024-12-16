import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import TarotReading from "../models/TarotReading";
import axios from "axios";

const resolvers = {
  Query: {
    getTarotReading: async () => {
      const tarotRes = await axios.get(`${process.env.TAROT_API_URL}/random?count=3`);
      const quoteRes = await axios.get(process.env.RON_SWANSON_API_URL);

      return {
        cards: tarotRes.data.cards,
        quote: quoteRes.data[0],
        createdAt: new Date().toISOString(),
      };
    },
    getUser: async (_, __, context) => {
      if (!context.token) throw new Error("Authentication required");
      const decoded = jwt.verify(context.token, process.env.JWT_SECRET || "");
      return User.findById(decoded.id);
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      return await user.save();
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");

      return jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
    },
    saveTarotReading: async (_, { cards, quote }, context) => {
      if (!context.token) throw new Error("Authentication required");
      const decoded = jwt.verify(context.token, process.env.JWT_SECRET || "");

      const reading = new TarotReading({ userId: decoded.id, cards, quote });
      return await reading.save();
    },
  },
};

export default resolvers;

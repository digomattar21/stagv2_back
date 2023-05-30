"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const news_routes_1 = __importDefault(
  require("./routes/public/news/news.routes")
);
const dotenv_1 = require("dotenv");
const auth_routes_1 = __importDefault(require("./routes/auth/auth.routes"));
const privateNews_routes_1 = __importDefault(
  require("./routes/private/news/privateNews.routes")
);
const articles_routes_1 = __importDefault(
  require("./routes/public/articles/articles.routes")
);
const privateArticles_routes_1 = __importDefault(
  require("./routes/private/articles/privateArticles.routes")
);
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/news", news_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.use("/articles", articles_routes_1.default);
app.use("/userNews", privateNews_routes_1.default);
app.use("/userArticles", privateArticles_routes_1.default);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.jsehy3t.mongodb.net/?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongooseConnect = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield mongoose_1.default.connect(uri, options);
  });
mongooseConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Connected to Mongo Instance at: ${mongoose_1.default.connection.host}`
      );
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });

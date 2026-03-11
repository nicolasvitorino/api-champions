"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/app.ts
var app_exports = {};
__export(app_exports, {
  default: () => app_default
});
module.exports = __toCommonJS(app_exports);
var import_express2 = __toESM(require("express"));

// src/routes.ts
var import_express = require("express");

// src/utils/http-helper.ts
var ok = (data) => __async(null, null, function* () {
  return {
    statusCode: 200,
    body: data
  };
});
var noContent = () => __async(null, null, function* () {
  return {
    statusCode: 204,
    body: null
  };
});

// src/repositories/champions-repository.ts
var cachedChampions = null;
var parseLane = (role) => {
  switch (role) {
    case "Marksman":
      return "Bot";
    case "Support":
      return "Support";
    case "Mage":
      return "Mid";
    case "Assassin":
      return "Jungle";
    case "Tank":
    case "Fighter":
    default:
      return "Top";
  }
};
var parseDamageType = (tags) => {
  const hasMage = tags.includes("Mage");
  const hasAssassin = tags.includes("Assassin");
  const hasMarksman = tags.includes("Marksman");
  const hasFighter = tags.includes("Fighter");
  if (hasMage && hasAssassin || hasMage && hasFighter) {
    return "Hybrid";
  }
  if (hasMage) {
    return "AP";
  }
  if (hasMarksman || hasAssassin || hasFighter) {
    return "AD";
  }
  return "Hybrid";
};
var fetchChampions = () => __async(null, null, function* () {
  const versionsResponse = yield fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const versions = yield versionsResponse.json();
  const latestVersion = versions[0];
  const championResponse = yield fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
  );
  const championPayload = yield championResponse.json();
  return Object.values(championPayload.data).sort((first, second) => first.name.localeCompare(second.name)).slice(0, 100).map((champion, index) => {
    var _a, _b, _c;
    const role = (_a = champion.tags[0]) != null ? _a : "Fighter";
    return {
      id: index + 1,
      key: champion.id,
      name: champion.name,
      title: champion.title,
      role,
      lane: parseLane(role),
      damageType: parseDamageType(champion.tags),
      resource: champion.partype || "Unknown",
      difficulty: (_c = (_b = champion.info) == null ? void 0 : _b.difficulty) != null ? _c : 5
    };
  });
});
var findAllChampions = () => __async(null, null, function* () {
  if (!cachedChampions) {
    cachedChampions = yield fetchChampions();
  }
  return cachedChampions;
});
var findChampionById = (id) => __async(null, null, function* () {
  const champions = yield findAllChampions();
  const champion = champions.find((championItem) => championItem.id === id);
  return champion || null;
});

// src/services/champions-service.ts
var getChampionsService = () => __async(null, null, function* () {
  const data = yield findAllChampions();
  if (data.length > 0) {
    return ok(data);
  }
  return noContent();
});
var getChampionByIdService = (id) => __async(null, null, function* () {
  const data = yield findChampionById(id);
  if (data) {
    return ok(data);
  }
  return noContent();
});

// src/controllers/champions-controller.ts
var getChampions = (_req, res) => __async(null, null, function* () {
  const httpResponse = yield getChampionsService();
  res.status(httpResponse.statusCode).json(httpResponse.body);
});
var getChampionById = (req, res) => __async(null, null, function* () {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid champion id" });
    return;
  }
  const httpResponse = yield getChampionByIdService(id);
  if (httpResponse.statusCode === 204) {
    res.status(404).json({ message: "Champion not found" });
    return;
  }
  res.status(httpResponse.statusCode).json(httpResponse.body);
});

// src/routes.ts
var router = (0, import_express.Router)();
router.get("/champions", getChampions);
router.get("/champions/:id", getChampionById);
var routes_default = router;

// src/app.ts
function createApp() {
  const app = (0, import_express2.default)();
  app.use(import_express2.default.json());
  app.use("/api", routes_default);
  return app;
}
var app_default = createApp;

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/services/champions-service.ts
var champions_service_exports = {};
__export(champions_service_exports, {
  getChampionByIdService: () => getChampionByIdService,
  getChampionsService: () => getChampionsService
});
module.exports = __toCommonJS(champions_service_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getChampionByIdService,
  getChampionsService
});

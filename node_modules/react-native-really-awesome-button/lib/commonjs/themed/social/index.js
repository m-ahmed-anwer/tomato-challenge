"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _constants = require("./constants");
function _default(common) {
  return {
    twitter: {
      ...common,
      ..._constants.TWITTER
    },
    messenger: {
      ...common,
      ..._constants.MESSENGER
    },
    facebook: {
      ...common,
      ..._constants.FACEBOOK
    },
    github: {
      ...common,
      ..._constants.GITHUB
    },
    linkedin: {
      ...common,
      ..._constants.LINKEDIN
    },
    whatsapp: {
      ...common,
      ..._constants.WHATSAPP
    },
    reddit: {
      ...common,
      ..._constants.REDDIT
    },
    pinterest: {
      ...common,
      ..._constants.PINTEREST
    },
    youtube: {
      ...common,
      ..._constants.YOUTUBE
    }
  };
}
//# sourceMappingURL=index.js.map
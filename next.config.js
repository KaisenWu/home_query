/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "Kaisen",
        mongodb_password: "Kaisen",
        mongodb_clustername: "homequerycluster",
        mongodb_database: "home_query",
      },
    };
  }

  return {
    env: {
      mongodb_username: "Kaisen",
      mongodb_password: "Kaisen",
      mongodb_clustername: "homequerycluster",
      mongodb_database: "home_query",
    },
  };
};


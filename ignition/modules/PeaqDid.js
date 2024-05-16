const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("PeaqDidModule", (m) => {
  const PeaqDid = m.contract("PeaqDid");
  return { PeaqDid };
});
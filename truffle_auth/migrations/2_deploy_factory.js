const EndorseTokenFactory =
  artifacts.require(`./EndorseTokenFactory.sol`)

module.exports = (deployer) => {
  deployer.deploy(EndorseTokenFactory)
}

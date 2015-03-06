EchoTag = require './echo'

module.exports = class UnescapedEchoTag extends EchoTag
    tagOpenStart: '{{{'
    tagOpenEnd: '}}}'

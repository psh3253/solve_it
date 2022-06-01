const {gql} = require('apollo-server');

module.exports = gql`
    enum FileType {
        HWP
        DOC
        TXT
        PDF
    }
`;
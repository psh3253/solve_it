const {gql} = require('apollo-server');

module.exports = gql`
    type Query {
        allReports(page: Int!): [Report!]!
        reportsByType(type: ReportType!): [Report!]!
    }
    
    type Mutation {
        createReport(input: CreateReportInput): NormalResponse
        deleteReport(id: ID!): NormalResponse
    }
    
    input CreateReportInput {
        content: String!
        testId: ID!
        type: ReportType!
    }

    enum ReportType {
        SWEAR_WORD
        ADVERTISEMENT
        SPAMMING
        PORNOGRAPHY
        COPYRIGHT_INFRINGEMENT
        OTHER
    }
    
    type Report {
        id: ID!
        isProcess: Boolean!
        type: ReportType!
        content: String!
        creationDate: String!
        ownerId: String!
        testId: ID!
    }
`;
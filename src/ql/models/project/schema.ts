export = `
    """这是demo"""
    type Book {
        id: String!
        title: String!
    }

    extend type Query {
        # query book
        book: Book
    }
`;
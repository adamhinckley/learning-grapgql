const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

// dummy data
const books = [
	{ name: "Good to Great", genre: "Self Development", id: "1" },
	{ name: "Chronicles of Narnia", genre: "Fantasy", id: "2" },
	{ name: "Think and Grow Rich", genre: "Self Development", id: "3" }
];

const authors = [
	{ name: "Jim Collins", age: "51", id: "1" },
	{ name: "JC. S. Lewis", age: "92", id: "2" },
	{ name: "Napolean Hill", age: "104", id: "3" }
];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt }
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//code to get data from the db
				return _.find(books, { id: args.id });
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parennt, args) {
				return _.find(authors, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});

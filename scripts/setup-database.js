// Database setup script for MongoDB
// This would typically connect to your MongoDB instance and create necessary collections

const collections = [
  {
    name: "users",
    schema: {
      _id: "ObjectId",
      name: "String",
      email: "String (unique)",
      password: "String (hashed)",
      avatar: "String",
      createdAt: "Date",
      updatedAt: "Date",
      preferences: {
        theme: "String",
        notifications: "Boolean",
      },
    },
  },
  {
    name: "interviews",
    schema: {
      _id: "ObjectId",
      userId: "ObjectId (ref: users)",
      sessionId: "String",
      domain: "String",
      difficulty: "String",
      questions: "Array",
      answers: "Array",
      score: "Number",
      timeSpent: "Number",
      status: "String",
      createdAt: "Date",
      completedAt: "Date",
    },
  },
  {
    name: "questions",
    schema: {
      _id: "ObjectId",
      question: "String",
      domain: "String",
      difficulty: "String",
      expectedAnswer: "String",
      keywords: "Array",
      createdAt: "Date",
    },
  },
  {
    name: "resumes",
    schema: {
      _id: "ObjectId",
      userId: "ObjectId (ref: users)",
      filename: "String",
      parsedData: "Object",
      suggestedRole: "String",
      suggestedDomain: "String",
      uploadedAt: "Date",
    },
  },
]

console.log("Database Collections Schema:")
collections.forEach((collection) => {
  console.log(`\n${collection.name}:`)
  console.log(JSON.stringify(collection.schema, null, 2))
})

console.log("\nTo set up your database:")
console.log("1. Install MongoDB or use MongoDB Atlas")
console.log('2. Create a new database called "interview_ai"')
console.log("3. Create the collections listed above")
console.log("4. Set up indexes for email (unique) and userId fields")
console.log("5. Add your MongoDB connection string to environment variables")

export default () => ({
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/phishing-db',
  },
});

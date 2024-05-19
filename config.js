// @ts-check

const config = {
    endpoint: "https://azure-db-sql.documents.azure.com:443/",
    key: "OCEGVFcaC4yjEjUkLInraholgpohd7n7PePXgFuekpBPSKkL81F5udCdpiKbgmXKXuD5VQNB2YtqPAaL4ZzELQ==",
    databaseId: "Tasks",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  module.exports = config;
  
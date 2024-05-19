const { Items } = require("@azure/cosmos");
const express = require("express");
const app = express();
const cors = require("cors");

const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./data/databaseContext");

app.use(cors());
app.use(express.json());

async function main() {
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  await dbContext.create(client, databaseId, containerId);

  try {
    // console.log(`Querying container: Items`);

    const querySpec = {
      query: "SELECT * from c",
    };
    app.get("/api/get", async (req, res) => {
      const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();
      res.send(items);
    });
    app.delete("/api/delete/:id1/:category1", async (req, res) => {
      const id1 = req.params.id1;
      const category1 = req.params.category1;
      await container.item(id1, category1).delete();
      res.send();
    });
    app.put("/api/update", async (req, res) => {
      const newItem1 = {
        id: req.body.inputId,
        category: req.body.inputCategory,
        description: req.body.inputDescription,
      };
      const { id, category } = newItem1;
      await container.item(id, category).replace(newItem1);
      res.send();
    });
    app.post("/api", async (req, res) => {
      const newItem = {
        id: req.body.inputId,
        category: req.body.inputCategory,
        description: req.body.inputDescription,
      };
      await container.items.create(newItem);
      res.send();
    });
    app.listen(5000, () => {
      // console.log("Server running on port 5000");
    });
  } catch (err) {
    console.log(err.message);
  }
}
main();

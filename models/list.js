const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ListSchema = new schema(
  {
    listName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    items: {
      type: 
      [
        {
          id: {
            type: String,
            required: true,
          },
          poster_path: {
            type: String,
            required: true,
          },
        },
      ],
      required: false,
    },
  },
  { versionKey: false }
);

const list = mongoose.model("List", ListSchema);
module.exports = list;

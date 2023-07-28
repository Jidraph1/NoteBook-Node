const { v4 } = require("uuid");
const mssql = require("mssql");
const { sqlConfig } = require("../Config/config.js");

const notes = [];

class Notebook {
  constructor(id, title, content, created_at) {
  
    this.title = title;
    this.content = content;
    this.created_at = created_at;
  }
}


// create note
const createNote = async (req, res) => {
  try {
    const id = v();

    const { title, content, created_at } = req.body;

    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      console.log(req.body);

      const result = await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("title", mssql.VarChar, title)
        .input("content", mssql.VarChar, content)
        .input("created_at", mssql.VarChar, created_at)
        
        .execute(createNote)

      if (result.rowsAffected == 1) {
        return res.json({
          message: "Note was created Successfully",
        });
      } else {
        return res.json({ message: "Creation failed" });
      }
    }
  } catch (error) {
    return res.json({ error });
  }
};

// all notes
const getAllNotes = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    const allnotes = (await pool.request().execute("getAllNotes"))
      .recordset;

    res.json({ notes: allnotes });
  } catch (error) {
    return res.json({ error });
  }
};

// one note
const getOneNote = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await mssql.connect(sqlConfig);

    const note = (
      await pool.request().input("id", id).execute("getOneNote")
    ).recordset;

    return res.json({
      note: note,
    });
  } catch (error) {
    return res.json({ error });
  }
};



module.exports= {
    createNote,
    getAllNotes,
    getOneNote,
}



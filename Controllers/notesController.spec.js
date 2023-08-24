// import mssql from "mssql"

const mssql = require('mssql');
const {v4} = require ('uuid');
// import {res, req, next} from "express"

// const res = require('express')
import {
    createNote,
    getAllNotes,
    getOneNote,
    deleteNote,
} from "./notesController"

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

// Test number 1
describe('Notes Controller', () => { 
    describe('Creates Notes', () => {
      it("should create a new note", async()=>{
        const body = {
          
            title:"Dear Diary",
            content:"Dear Diary this is a quick recap of my not so interesting life",
            created_at:"2022-02-05"
        }
        const request = {
          body: body,
        }

        const res = { 
          json:jest.fn()
        }
     

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: [1],
        }),
      });

      await createNote(request, res);

      expect(res.json).toHaveBeenCalledWith({
        message: 'Note was Created Successfully'
      })
    })
})


// Test number 2

describe("Gets all Notes", () => {
  it("should return all notes available", async () => {
    const mockAllNotes = [{
          
      title:"Dear Diary",
      content:"Dear Diary this is a quick recap of my not so interesting life",
      created_at:"2022-02-05"
  }]

    const req = {};

    const res = {
      json:jest.fn(),
      status:jest.fn(()=> res)
      
    }

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        recordset: mockAllNotes,
      }),
    });

    await getAllNotes(req, res);

    // expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.status).mock.instances[0].status
    expect(mssql.connect).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({ notes: mockAllNotes});
  });
});

// Test number 3
describe("Getting Note By ID", () => {
  it("should return the specified note", async () => {
    const noteId = "feelhome1234";
    const mockNoteWithId = {
      
        title:"Dear Diary",
        content:"Dear Diary this is a quick recap of my not so interesting life",
        created_at:"2022-02-05"
    
    };

    const req = {
      params: {
        id: noteId,
      },
    };

    const res = {
      json: jest.fn(),
    };



    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        recordset: [mockNoteWithId],
      }),
    });

    await getOneNote(req, res);


    // expect(mssql.connect).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({ notes: [mockNoteWithId] });

    res.json.mockRestore();
  });
});

// Test Case for deleted Note

describe("Deleting a note", () => {
  it("should delete the note successfully", async () => {
    const noteId = "feelhome1234";
    const req = {
      params: {
        id: noteId
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected: [1],
      }),
    });

    await deleteNote(req, res);


    // expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Note deleted successfully",
    });
  });
})
})

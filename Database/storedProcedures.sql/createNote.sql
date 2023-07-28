CREATE OR ALTER PROCEDURE createNote(@id VARCHAR(200), @title VARCHAR(100), @content VARCHAR(500), @created_at DATE)

    AS 
        BEGIN 
        INSERT INTO noteCreate(id, title, content, created_at) VALUES ( @id, @title, @content, @created_at)

        END
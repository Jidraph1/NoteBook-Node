BEGIN
     TRY
        CREATE TABLE notebookTable(
            id VARCHAR(200) PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            content VARCHAR(500) NOT NULL,
            created_at DATE
        )
    END TRY
        BEGIN 
            CATCH
                THROW 50001, 'Table already exists', 1;
                END 
                CATCH
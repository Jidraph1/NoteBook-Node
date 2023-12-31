const mssql = require('mssql')

const createNotesTable = async(req, res)=>{
    try {
        const table = `
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
                END CATCH`;

    const pool = await mssql.connect(sqlConfig)

    await pool.request().query(table, (err)=>{
        if(err instanceof mssql.RequestError){
            console.log({Error: err.message});
        }else{
            console.log('Table created Successfully');
        }
    })

    } catch (error) {
        return ({Error: error})
    }
}

module.exports= {
    createNotesTable
}
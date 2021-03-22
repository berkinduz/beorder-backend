const pool = require("../config");

const createCompany = (request, response) => {
  const { name, status } = request.body;

  pool.query(
    "INSERT INTO companies (name,status) VALUES ($1, $2) RETURNING id",
    [name, status],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Company added with ID:${results.rows[0].id}`);
    }
  );
};

const getCompany = (request, response) => {
    pool.query(
        "SELECT * FROM companies ORDER BY id ASC", 
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).json(results.rows);
        }
    )
}

const getCompanyById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        "SELECT * FROM companies WHERE id = $1",
        [id],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(200).json(results.rows);
        }
      );

}


module.exports = {
    createCompany,
    getCompany,
    getCompanyById
}
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  const defaultError = {
    // statusCode: StatusCodes.INTERNAL_SERVER_ERROR -> npm nackage StatusCodes
    statusCode: 500,
    msg: 'Something went wrong',
  };

  if ((err.name = 'ValidationError')) {
    defaultError.statusCode = 404;
    defaultError.msg = Object.values(err.errors)
      .map((e) => e.message)
      .join(',');
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
  // res.status(500).json({ msg: 'Loging error' });
};

module.exports = errorHandlerMiddleware;

// more error handling using ExpressJS Async Errors

// app.use((err, req, res, next) => {
//   if (err instanceof ValidationError) {
//     Handle validation errors
//     return res.status(400).json({ error: 'Invalid input' });
//   } else if (err instanceof NotFoundError) {
//     Handle not found errors
//     return res.status(404).json({ error: 'Resource not found' });
//   } else {
//     Handle other errors
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

// 1.2 In your frontend UI, you can display the error message received from the server. 

// import React, { useState } from 'react';

// function MyComponent() {
//   const [error, setError] = useState('');

//   const handleFormSubmit = async () => {
//     try {
//       Make API request
//     } catch (err) {
//       setError(err.response.data.error);
//     }
//   };

//   return (
//     <div>
//       {error && <div>Error: {error}</div>}
//       Rest of your UI
//     </div>
//   );
// }



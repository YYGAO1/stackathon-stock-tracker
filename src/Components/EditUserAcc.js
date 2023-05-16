// import React, { useState } from "react";

// const EditUserAcc = () => {
//   const [userId, setUserId] = useState("");

//   return (
//     <div>
//       <h2>Update Account</h2>
//       <form onSubmit={create}>
//         <input
//           placeholder="username"
//           value={credentials.username}
//           name="username"
//           onChange={onChange}
//         />
//         <input
//           placeholder="password"
//           name="password"
//           type="password"
//           value={credentials.password}
//           onChange={onChange}
//         />
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={credentials.isAdmin}
//               onChange={(ev) =>
//                 setCredentials((credentials) => ({
//                   ...credentials,
//                   isAdmin: true,
//                 }))
//               }
//               name="isAdmin"
//             />
//           }
//           label="Admin?"
//           sx={{
//             textAlign: "center",
//             display: "flex",
//             justifyContent: "center",
//           }}
//         ></FormControlLabel>
//         <button>Update</button>
//       </form>
//     </div>
//   );
// };

// export default EditUserAcc;

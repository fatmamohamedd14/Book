// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const AllLang = () => {
//   const [languages, setLanguages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         const response = await axios.get(
//           "https://bookify-new.onrender.com/api/v1/language",
//           {
//             params: {
//               page: page,
//             },
//           }
//         );
//         setLanguages(response.data.languages);
//         setMessage(response.data.message);
//         console.log(response.data.languages);
//       } catch (error) {
//         setMessage(
//           error.response ? error.response.data.message : "An error occurred"
//         );
//       }
//     };

//     fetchLanguages();
//   }, [page]);

//   return (
//     <div
//       style={{
//         padding: "20px 10px",
//       }}
//     >
//       <h1
//         style={{
//           textAlign: "center",
//           textDecoration: "underline",
//         }}
//       >
//         All Languages
//       </h1>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "start",
//           flexWrap: "wrap",
//           gap: "10px",
//           padding: "20px 10px",
//         }}
//       >
//         {languages.map((language) => (
//           <Link
//             to={`/BookByLang/${language._id}`}
//             style={{
//               border: "solid #e5e5e5 1px",
//               borderRadius: "10px",
//               padding: "20px 10px",
//               textAlign: "center",
//               minWidth: "100px",
//               cursor: "pointer",
//             }}
//             key={language._id}
//           >
//             {language.language}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllLang;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const AllLang = () => {
  const [languages, setLanguages] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          "https://bookify-new.onrender.com/api/v1/language",
          {
            params: {
              page: page,
            },
          }
        );
        setLanguages(response.data.languages);
        setMessage(response.data.message);
        console.log(response.data.languages);
      } catch (error) {
        setMessage(
          error.response ? error.response.data.message : "An error occurred"
        );
      }
    };

    fetchLanguages();
  }, [page]);

  return (
    <div className="container">
      <h1 className="title">All Languages</h1>

      <div className="languages-container">
        {languages.map((language) => (
          <Link
            to={`/BookByLang/${language._id}`}
            className="language-link"
            key={language._id}
          >
            {language.language}
          </Link>
        ))}
      </div>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default AllLang;
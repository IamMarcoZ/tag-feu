import axios from "axios";

// export const sendMail = async (email, tableHtml) => {
  
//   const options = {
//     method: 'POST',
//     url: 'https://send-mail-serverless.p.rapidapi.com/send',
//     headers: {
//       'content-type': 'application/json',
//       'Content-Type': 'application/json',
//       'X-RapidAPI-Key': 'efb0657df5mshc131d534eeccdc0p18d8b1jsn65c4abf8e243',
//       'X-RapidAPI-Host': 'send-mail-serverless.p.rapidapi.com'
//     },
//     data: {
//       personalizations: [
//         {
//           to: [
//             {
//               email: `${email}`,
//               name: 'marco'
//             }
//           ]
//         }
//       ],
//       from: {
//         email: 'test@firebese.com',
//         name: 'Firebese Test Use'
//       },
//       reply_to: {
//         email: 'marco.cicerano@hotmail.com',
//         name: 'mail rilascio'
//       },
//       subject: 'Rilascio',
//       content: [
//         {
//           type: 'text/html',
//           value: `${tableHtml}`
//         },
//         {
//           type: 'text/plan',
//           value: 'Book'
//         }
//       ],
//       headers: {
//         'List-Unsubscribe': '<mailto: unsubscribe@firebese.com?subject=unsubscribe>, <https://firebese.com/unsubscribe/id>'
//       }
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

export const sendMail = async (email, tableHtml) =>{

const options = {
  method: 'POST',
  url: 'https://mail-sender-api1.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'efb0657df5mshc131d534eeccdc0p18d8b1jsn65c4abf8e243',
    'X-RapidAPI-Host': 'mail-sender-api1.p.rapidapi.com'
  },
  data: {
    sendto: `${email}`,
    ishtml: 'true',
    title: 'Put Your Title Here',
    body: `${tableHtml}`
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}

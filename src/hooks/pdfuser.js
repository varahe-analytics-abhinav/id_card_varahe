import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../libs/api";

const PDF_QUERY_KEY = "pdflist";

// export function usePdfUserList() {
//   const { isLoading, data } = useQuery(
//     [PDF_QUERY_KEY],
//     async () => {
//       try {
//         const { data } = await fetchJson(
//           `https://script.googleusercontent.com/macros/echo?user_content_key=TtneWuHTQFoteEPkervTK-LDvMxS1Oxyn8HzIBdYNlX1RhxWK-RxarOA0p_S2LWp4VZkQbr5sqEOrTUiRwr2PIRiIkB9fm_Jm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDK_UR9QS3BA47qvv32NhEpXz8xIZCRbTcBiH0ulytXyxbwrhrLcZZgVRsVyI4Ka-oNiTeMbngVEgQyT3uYZhhhFmNp2exz8OQ&lib=MC0t9IIlKwEDrT8lo867uWVyV9uYVTecs`,
//           {
//           }
//         );
//         console.log(data);
//         return data;
//       } catch (err) {
//         console.log(err);
//         return null;
//       }
//     },
//     {
//       cacheTime: 0,
//       staleTime: 1,
//     }
//   );
//   return { pdfuser: data, pdfuserIsLoading: isLoading };
// }



export function usePdfUserList() {
  const { isLoading, error,data } = useQuery(
   
    {
      queryKey : PDF_QUERY_KEY,
      queryFn : async () => {
          try {
            const { data } = await fetchJson(
              `https://script.google.com/macros/s/AKfycbw_va_RR-8zON0FaSMvDYlSXGYUmeAKcMILRiY15CIk4j5MpTphEW7pJl-F06-dIB1h/exec`,
              // `https://script.google.com/macros/s/AKfycbxgFoS7z1ctYS6LnTtnFiaH3iYHTZ_fxV3j8HKyIHi2jThsBzMYDC1rQHDqHz1JNPSihQ/exec`,
             
            );
            return data;
          } catch (err) {
            console.log(error);
            return null;
          }
    }
  },
  );
  return { pdfuser: data, pdfuserIsLoading: isLoading };
}
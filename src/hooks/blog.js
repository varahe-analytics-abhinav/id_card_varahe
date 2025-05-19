import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../libs/api";


const BLOG_QUERY_KEY = "blogList";

// export function useBlogList() {
//   const { isLoading, error,data } = useQuery(
   
//     {
//       queryKey : BLOG_QUERY_KEY,
//       queryFn : async () => {
//           try {
//             const { data } = await fetchJson(
//               `https://script.googleusercontent.com/macros/echo?user_content_key=TtneWuHTQFoteEPkervTK-LDvMxS1Oxyn8HzIBdYNlX1RhxWK-RxarOA0p_S2LWp4VZkQbr5sqEOrTUiRwr2PIRiIkB9fm_Jm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDK_UR9QS3BA47qvv32NhEpXz8xIZCRbTcBiH0ulytXyxbwrhrLcZZgVRsVyI4Ka-oNiTeMbngVEgQyT3uYZhhhFmNp2exz8OQ&lib=MC0t9IIlKwEDrT8lo867uWVyV9uYVTecs`,
             
//             );
//             return data;
//           } catch (err) {
//             console.log(error);
//             return null;
//           }
//     }
//   },
//   );
//   return { blogData: data, blogIsLoading: isLoading };
// }



// export function useBlogList() {
//   const { isLoading, error,data } = useQuery(
//     [BLOG_QUERY_KEY],
//     async () => {
//       try {
//         // const { accessToken } = getTokens();
//         const { data } = await fetchJson(
//           `https://script.googleusercontent.com/macros/echo?user_content_key=TtneWuHTQFoteEPkervTK-LDvMxS1Oxyn8HzIBdYNlX1RhxWK-RxarOA0p_S2LWp4VZkQbr5sqEOrTUiRwr2PIRiIkB9fm_Jm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDK_UR9QS3BA47qvv32NhEpXz8xIZCRbTcBiH0ulytXyxbwrhrLcZZgVRsVyI4Ka-oNiTeMbngVEgQyT3uYZhhhFmNp2exz8OQ&lib=MC0t9IIlKwEDrT8lo867uWVyV9uYVTecs`,
         
//         );
//         return data;
//       } catch (err) {
//         console.log(error);
//         return null;
//       }
//     },
//     {
//       cacheTime: 0,
//       staleTime: 1,
//     }
//   );
//   return { blogData: data, blogIsLoading: isLoading };
// }

// export function useUpdateBlog(id) {
//   const queryClient = useQueryClient();
//   const { accessToken } = getTokens();
//   const mutation = useMutation((values) =>
//     fetchJson(
//       `${API_HOST_URL}/${endpoints.blog.update}/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           // 'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: values,
//       },
//       true
//     )
//   );
//   return {
//     handleUpdateBlog: async (values) => {
//       try {
//         const res = await mutation.mutateAsync(values);
//         const data = await res.json();
//         if (data.success) {
//           await queryClient.invalidateQueries([BLOG_QUERY_KEY]);
//         }
//         return data;
//       } catch (err) {
//         return {
//           success: false,
//         };
//       }
//     },
//     handleUpdateIsLoading: mutation.isLoading,
//   };
// }

// export function useBlogDetail(id) {
//   const { accessToken } = getTokens();
//   const { isLoading, isError, data, status } = useQuery(
//     [BLOG_QUERY_KEY],
//     async () => {
//       try {
//         const res = await fetchJson(
//           `${API_HOST_URL}/${endpoints.blog.detail}/${id}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           },
//           true
//         );
//         const data = await res.json();
//         return data;
//       } catch (err) {
//         return {
//           success: false,
//         };
//       }
//     },
//     {
//       cacheTime: 0,
//       staleTime: 1,
//       retry: 3,
//       refetchOnMount: true, // ms
//     }
//   );
//   return { blogData: data, blogIsLoading: isLoading, isError, status };
// }

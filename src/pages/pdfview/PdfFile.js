import React, { useEffect } from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { useBlogList } from "../../components/hooks/blog";
import Header from "../../components/Header/Header";
import Sidenav from "../../components/Sidenav/Sidenav";
// import {bg_idcard} from "/public/assets/img/bg_idcard.jpeg";
// import {Font} from '@react-pdf/renderer';
// import MyCustomFont from '../fonts/Anton-Regular.ttf';

// Font.register({
//   family: 'AntonFamily',
//   src: MyCustomFont
// })

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "AntonFamily",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "AntonFamily",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
});

const PDFFile = () => {
  const id = useParams().id;
  // console.log(id);
  const { blogData, blogIsLoading } = useBlogList();
  let data = {};

  useEffect(() => {}, [!blogIsLoading]);
  if (!blogIsLoading) {
    data = blogData.filter((e) => {
      // console.log(e);
      return e["Employee Code"] == id;
      // if({
      //     setState(e)
      // }
    });
  }

  const pageColors = ["#f6d186", "#f67280", "#c06c84"];

//   const pages = [
//     { text: "First page content goes here...", image: LebronStretch },
//     {
//       text: "Second page content goes here...",
//       image:
//         "https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg",
//     },
//     {
//       text: "Third page content goes here...",
//       image:
//         "https://s.yimg.com/ny/api/res/1.2/Aj5UoHHKnNOpdwE6Zz9GIQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MA--/https://s.yimg.com/os/creatr-uploaded-images/2023-01/b02a71d0-a774-11ed-bf7f-08714e8ad300",
//     },
//   ];

// console.log(data);

  return (
    <div>
    <Header />
    <Sidenav />
    {data.length > 0 && blogData && !blogIsLoading ? ( <Document className="content-wrapper">
      <Page style={{ ...styles.body, backgroundColor: pageColors[1] }}>
        <Text style={styles.header} fixed></Text>
        <Image
          style={styles.image}
          src={"https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg"}
        />
        <Text style={styles.text}>{data[0]["Employee name"]}</Text>
        <Text style={styles.text}>{data[0]["Designation"]}</Text>
        <Text style={styles.text}>Project Id : {data[0]["Project Name"]}</Text>
        <Text style={styles.text}>Employee Id : {data[0]["Employee Code"]}</Text>
        <Text style={styles.text}>Blood Group : {data[0]["Blood Group"]}</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>) : "loading..."}
    </div>
  );
};

export default PDFFile;

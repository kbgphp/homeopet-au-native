import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";

import { useTheme } from "react-native-paper";
import { NavBar } from "../../../components/global";
import { _REST } from "../../../services";
import Swiper from "react-native-web-swiper";
import { ActivityLoader } from "../../../components/elements";

export default function Testimonials(props) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [testimonialsdata, setTestimonialsData] = useState([]);
  const [Pages, setPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);

  React.useEffect(() => {
    fetchBlogData();
  }, [Pages]);

  const fetchBlogData = async () => {
    const res = await _REST.CUSTOM_POST("pages", {
      "page": "reviews",
      "paged": 1,
      "review_per_page": 10,
      "origin": "au"
    });

    formatData(res?.data?.review);
    // setTestimonialsData([...testimonialsdata, ...res?.data?.review]);

  };

  const fetchMoreData = () => {
    if (Pages < totalPages) {
      setPages(Pages + 1);
      setLoading(true);
    }
  };


  let Arr = [];
  const formatData = async (data) => {
    Object.entries(data).map(([key, value]) => {
      Arr.push({ title: key, data: value })
    })
    console.log('Arr', Arr);
  }

  const header = () => <Text style={styles.bodyText}>{"Testimonials"}</Text>;

  return (
    <>
      <NavBar props={props} />


      <Text>hello</Text>



      {loading && (
        <View>
          <ActivityIndicator />
          <Text style={styles.loaderText}>Loading more data...</Text>
        </View>
      )}

    </>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    body: {
      backgroundColor: "#ffffff",
    },

    bodyText: {
      fontSize: 20,
      textAlign: "center",
      color: theme.colors.$pink,
      marginTop: 22,
      fontWeight: 400,
      // marginBottom: 10,
      backgroundColor: "#fff",
      fontFamily: theme.fonts.$serifReg,
    },
    header: {
      textAlign: "center",
      fontSize: 18,
      color: theme.colors.$light_green,
      paddingTop: 18,
      paddingBottom: 18,
      textTransform: "capitalize",
      fontFamily: theme.fonts.$serifReg,
    },
    contant: {
      color: theme.colors.$text,
      fontFamily: theme.fonts.$sansReg,
      fontSize: 14,
    },
    item: {
      paddingHorizontal: 20,
      backgroundColor: "#ffffff",
    },
    oddItem: {
      backgroundColor: "#f4f4f4",
    },
    loader: {
      flex: 1,
      height: 250,
      justifyContent: "center",
      alignItems: "center",
    },
  });

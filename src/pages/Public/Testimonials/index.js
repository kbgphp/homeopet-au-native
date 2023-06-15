import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, } from "react-native";
import Swiper from "react-native-web-swiper";
import { useSelector } from 'react-redux';
import { useTheme } from "react-native-paper";
import { NavBar } from "../../../components/global";
import { _REST } from "../../../services";
import { ActivityLoader } from "../../../components/elements";

export default function Testimonials(props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const TESTIMONIALS = useSelector((state) => state.appData.BIG_DATA.testimonials);
  const [testimonialsData, setTestimonialsData] = React.useState({});

  const [Pages, setPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);


  useEffect(() => {
    setTestimonialsData(TESTIMONIALS);
    setTotalPages(TESTIMONIALS.total_pages)
  }, [TESTIMONIALS]);


  const fetchTestimonialsData = async () => {
    const res = await _REST.CUSTOM_POST("pages", {
      page: "reviews",
      review_per_page: 10,
      paged: Pages,
      "origin": "au"
    });

    if (res?.data?.review) {
      setTestimonialsData((prevData) => ({
        ...prevData,
        ...res.data,
        review: {
          ...prevData.review,
          ...res.data.review,
        }
      }));
    }
    setLoading(false);

  };

  const fetchMoreData = () => {
    if (Pages < totalPages) {
      const newPages = Pages + 1;
      setPages(newPages);
      setLoading(true);
    }
  };


  useEffect(() => {
    fetchTestimonialsData();
  }, [Pages]);

  const header = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.pageTitle}>{"Testimonials"}</Text>
      </View>
    )
  }
  const renderFooter = () => (
    <View style={styles.footer}>
      {loading && <ActivityLoader size={30} text={'Loading more...'} />}
      {(totalPages === Pages && !loading) && <Text style={styles.footerText}>That's all</Text>}
    </View>
  )

  const renderList = ({ item: [category, items], index }) => (
    <>
      <View style={[styles.item, index % 2 !== 0 && styles.oddItem]}>
        <Text style={styles.header}>{category.toUpperCase()}</Text>
        <Swiper
          innerContainerStyle={{ height: 350 }}
          controlsProps={{ prevPos: false, nextPos: false }}
        >
          {items.length > 0 && items.map((item, i) => (
            <Text style={styles.content} key={i}>{item.body}</Text>
          ))}
        </Swiper>
      </View>
    </>
  )

  return (
    <>
      <NavBar props={props} />
      {!testimonialsData?.review == 0 &&
        <FlatList
          data={Object.entries(testimonialsData?.review)}
          ListHeaderComponent={header}
          ListFooterComponent={renderFooter}
          renderItem={renderList}
          onEndReached={fetchMoreData}
        />
      }
    </>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    section: {
      backgroundColor: "#ffffff",
      flex: 1
    },
    pageTitle: {
      marginTop: 14,
      marginBottom: 12,
      fontSize: theme.fonts.$font_xl,
      textAlign: "center",
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$serifReg,
    },
    header: {
      textAlign: "center",
      fontSize: 18,
      color: theme.colors.$light_green,
      paddingVertical: 18,
      textTransform: "capitalize",
      fontFamily: theme.fonts.$serifReg,
    },
    content: {
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
    footer: {
      paddingVertical: 8,
      backgroundColor: theme.colors.$white,
      alignItems: 'center'
    },
    footerText: {
      fontFamily: theme.fonts.$sansReg,
      color: theme.colors.$text,
      fontSize: theme.fonts.$xs,
    }
  });

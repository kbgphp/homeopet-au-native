import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import Swiper from "react-native-web-swiper";
import { useSelector } from 'react-redux';
import { useTheme } from "react-native-paper";
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { NavBar, StarRating } from "@src/components/global";
import { _REST } from "@src/services";
import { ActivityLoader } from "@src/components/elements";

export default function Testimonials(props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const TESTIMONIALS = useSelector((state) => state.appData.BIG_DATA.testimonials);
  const [testimonialsData, setTestimonialsData] = React.useState({});

  const [Pages, setPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);

  const swiperHeight = 490;   // 330/490 in case expanded
  const expandedSwiperHeight = 490;
  const [heightObj, setHeightObj] = React.useState({});
  const showExpandBtn = false;

  useEffect(() => {
    Object.keys(TESTIMONIALS?.review).map((key, index) => {
      setHeightObj(heightObj => ({ ...heightObj, [key]: swiperHeight }));
    });
  }, []);

  const changeSwiperHeight = (key) => {
    setHeightObj(heightObj => ({ ...heightObj, [key]: heightObj[key] === swiperHeight ? expandedSwiperHeight : swiperHeight }));
  }



  useEffect(() => {
    setTestimonialsData(TESTIMONIALS);
    setTotalPages(TESTIMONIALS.total_pages);
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
        <Text style={styles.categoryName}>{category.toUpperCase()}</Text>
        <Swiper
          innerContainerStyle={{ height: heightObj[category] }}
          controlsProps={{
            dotsTouchable: true,
            prevPos: false,
            nextPos: false,
            dotActiveStyle: { backgroundColor: theme.colors.$pink, height: 12, width: 12, borderRadius: 10 }
          }}
        >
          {items.length > 0 && items.map((item, i) => (
            <View key={i}>
              {item.title ? <Text style={styles.title} >"{item.title}"</Text> : null}
              <Text style={styles.content} >{item.body}</Text>
              <View style={{ alignItems: 'center', marginVertical: 8 }}>
                <StarRating rating={item?.rating} />
                <Text style={styles.author} >- {item.author}
                  <Text style={styles.date} >{", "} {format(new Date(item?.review_date), "MMMM do, yyyy")}</Text>
                </Text>
              </View>
            </View>
          ))}
        </Swiper>
        {showExpandBtn ?
          <TouchableOpacity activeOpacity={.8} onPress={() => changeSwiperHeight(category)} style={styles.viewMoreBtn}>
            <Text style={styles.viewMoreText}>{(heightObj[category] === swiperHeight) ? "Expand" : 'View Less'}{" "}
              <Ionicons name={(heightObj[category] === swiperHeight) ? 'arrow-down' : 'arrow-up'} size={14} color={theme.colors.$white} />
            </Text>
          </TouchableOpacity> : null
        }

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
      backgroundColor: theme.colors.$white,
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
    categoryName: {
      textAlign: "center",
      fontSize: theme.fonts.$font_xl,
      color: theme.colors.$light_green,
      paddingVertical: 18,
      textTransform: "capitalize",
      fontFamily: theme.fonts.$serifReg,
    },
    title: {
      color: theme.colors.$text,
      fontFamily: theme.fonts.$serifBold,
      fontSize: theme.fonts.$font_std,
      fontStyle: 'italic',
    },
    content: {
      color: theme.colors.$text,
      fontFamily: theme.fonts.$sansReg,
      fontSize: theme.fonts.$font_sm,
      opacity: 0.8
    },
    author: {
      color: theme.colors.$text,
      fontFamily: theme.fonts.$serifBold,
      fontSize: theme.fonts.$font_sm,
      fontStyle: 'italic',
    },
    date: {
      color: theme.colors.$text,
      fontFamily: theme.fonts.$sansReg,
      fontSize: 10,
      opacity: 0.6
    },
    item: {
      paddingHorizontal: 20,
      backgroundColor: theme.colors.$white,
      position: 'relative'
    },
    oddItem: {
      backgroundColor: theme.colors.$light,
    },
    viewMoreBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      alignSelf: 'center',
      bottom: 35
    },
    viewMoreText: {
      color: theme.colors.$white,
      fontFamily: theme.fonts.$sansBold,
      fontSize: theme.fonts.$font_xs,
      backgroundColor: theme.colors.$pink,
      borderRadius: 50,
      paddingHorizontal: 12,
      paddingVertical: 3,
      shadowColor: '#000',
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.9,
      shadowRadius: 3,
      elevation: 15,

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

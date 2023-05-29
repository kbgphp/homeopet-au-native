import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { useTheme } from 'react-native-paper';
import { NavBar } from "../../../components/global";
import { SkeletonLoader, ActivityLoader } from '../../../components/elements';
import { _REST } from "../../../services";





export default function Blog(props) {

  const theme = useTheme();
  const styles = makeStyles(theme);

  const [blogData, setBlogData] = React.useState([]);
  const [Pages, setPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);


  const handleBlogDetails = () => {
    props?.navigation?.navigate("BlogDetails");
  }


  React.useEffect(() => {

    fetchBlogData();

  }, [Pages]);

  const fetchMoreData = () => {
    if (Pages < totalPages) {
      setPages(Pages + 1);
      setLoading(true)
    }
  };

  const fetchBlogData = async () => {
    const res = await _REST.CUSTOM_POST("pages", {
      page: "blog",
      record_per_page: 7,
      paged: Pages,
    });

    if (res?.data) setBlogData([...blogData, ...res?.data?.blog]);
    if (res?.data?.total_pages) {
      setTotalPages(res?.data?.total_pages);
    }
    setLoading(false);
  }

  const header = () => (
    <View style={styles.body}>
      <View>
        <Text style={styles.sideHeader}>HomeoPet Natural Pet Care Center</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>
          Latest from The HomeoPet Natural Pet Care Center
        </Text>
        <Text style={styles.miniHeader}>
          Our guide to natural health care for your pets.
        </Text>
      </View>
    </View>
  );




  return (
    <>
      <NavBar props={props} />

      <>
        {blogData && blogData?.length > 0 ? (
          <FlatList
            data={blogData}
            ListHeaderComponent={header}
            renderItem={(ele, i) => (
              <View style={styles.body}>
                <View style={styles.container}>
                  <TouchableOpacity
                    key={i}
                    style={styles.viewData}
                    onPress={handleBlogDetails}
                  >
                    <View style={styles.image}>
                      <Image
                        source={{ uri: ele?.item?.featured_image }}
                        style={{ width: "100%", height: 200 }}
                      />
                      <View style={styles.date}>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          {ele?.item?.date}
                        </Text>
                        <Text style={{ color: "white" }}>
                          {ele?.item?.month}
                        </Text>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.loopheader}>
                        {ele?.item?.title}
                      </Text>
                    </View>
                    <View style={styles.devider}></View>

                    <View>
                      <Text style={styles.contant}>
                        {ele?.item?.desc.slice(0, 90)}...
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, i) => i}
            onEndReached={fetchMoreData}
          />
        ) : (
          <ScrollView style={{ marginRight: 20 }}>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </ScrollView>
        )}

        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator />
            <Text style={styles.loaderText}>Loading more data...</Text>
          </View>
        )}
      </>
    </>
  );
}



const makeStyles = (theme) =>
  StyleSheet.create({
    body: {
      backgroundColor: "#ffff",
    },
    container: {
      marginLeft: 20,
      marginRight: 20,
    },
    sideHeader: {
      textAlign: "right",
      paddingRight: 20,
      marginTop: 12,
      textDecorationLine: "underline",
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$sansReg,
    },

    header: {
      marginTop: 10,
      flex: 1,
    },

    headerText: {
      textAlign: "center",
      color: theme.colors.$pink,
      fontSize: 20,
      marginLeft: 46,
      marginRight: 46,
      fontWeight: 400,
      marginTop: 18,
      marginBottom: 10,
      fontFamily: theme.fonts.$serifReg,
    },
    miniHeader: {
      color: theme.colors.$text,
      textAlign: "center",
      fontSize: 14,
      justifyContent: "center",
      marginLeft: 90,
      marginRight: 90,
      maxWidth: 300,
      fontFamily: theme.fonts.$sansReg,
      fontWeight: 400,
    },

    viewData: {
      marginVertical: 10,
      borderColor: "#ccc",
      borderWidth: 1,
    },
    date: {
      backgroundColor: "#7fab20",

      padding: 7,
      position: "absolute",
      top: 20,
      left: 0,
      textAlign: "center",
    },
    loopheader: {
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10,
      marginBottom: 2,
      fontSize: 16,
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$serifReg,
    },
    devider: {
      width: 40,
      height: 3,
      backgroundColor: "#ccc",
      marginLeft: 15,
      marginTop: 5,
    },
    contant: {
      fontSize: 14,
      color: theme.colors.$text,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10,
      marginBottom: 15,
      fontFamily: theme.fonts.$sansReg,
    },

    loaderText: {
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$sansReg,
      textAlign: "center",
    },
    loader: {
      backgroundColor: "#ffff",
    },
  });

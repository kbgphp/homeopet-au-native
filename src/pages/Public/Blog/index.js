import React from 'react';
import { StyleSheet, Text,  View,  FlatList, } from "react-native";
import { useTheme } from 'react-native-paper';
import { NavBar } from "../../../components/global";
import { _REST } from "../../../services";
import { useSelector } from 'react-redux';
import { QuickSearch } from "../../../components/global";
import BlogCard from "./components/BlogCard"


export default function Blog(props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const blogData = useSelector((state) => state.appData.BIG_DATA.blogs);


  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.topRightHeader}>HomeoPet Natural Pet Care Center</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.mainHeader}>Latest from The HomeoPet Natural Pet Care Center </Text>
        <Text style={styles.headerDesc}>Our guide to natural health care for your pets.</Text>
      </View>
    </View>
  );




  return (
    <>
      <NavBar props={props} />
      <FlatList
        data={blogData}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => <BlogCard props={props} data={item} />}
        keyExtractor={(item, i) => i}
      />
      <QuickSearch props={props} />
    </>
  );
}



const makeStyles = (theme) =>
  StyleSheet.create({
    headerContainer: {
      backgroundColor: theme.colors.$white,
      paddingHorizontal: 20
    },
    topRightHeader: {
      textAlign: "right",
      marginTop: 12,
      textDecorationLine: "underline",
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$sansReg,
    },
    mainHeader: {
      color: theme.colors.$pink,
      fontSize: theme.fonts.$font_lg,
      marginTop: 18,
      marginBottom: 10,
      fontFamily: theme.fonts.$serifReg,
      maxWidth: 240,
      textAlign: "center",
    },
    headerDesc: {
      color: theme.colors.$text,
      fontSize: theme.fonts.$sm,
      maxWidth: 200,
      fontFamily: theme.fonts.$sansReg,
      textAlign: "center",
      marginBottom:12
    }
  });

import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  
  ScrollView,
  
} from "react-native";

import { useTheme } from "react-native-paper";
import { NavBar } from "../../../components/global";
import { ActivityLoader } from "../../../components/elements";
import { _REST } from "../../../services";


export default function About(props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [aboutusdata, aboutUsData] = React.useState([]);
  

  React.useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    const res = await _REST.CUSTOM_POST("pages", {
      page: "about",
    });

    if (res?.data) aboutUsData(res);
   
   
  };

  
  return (
    <>
      <NavBar props={props} />

      {aboutusdata?.data && aboutusdata?.data?.length > 0 ? (
        <ScrollView style={styles.body}>
          <Image
            source={{
              uri: aboutusdata?.data[0].banner_url,
            }}
            style={{ width: "100%", height: 170 }}
          />

          <View style={styles.innerbody}>
            <Text style={styles.bodyText}>{"About Us"}</Text>
            <View>
              <Text style={styles.heading}>
                HomeoPet LLC is a US Owned family business , with its originis
                rooted deep in the wilds of the South West of ireland.
              </Text>
            </View>

            <View>
              <Text style={styles.contant}>{aboutusdata?.data[0].content}</Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ActivityLoader />
      )}
    </>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    body: {
      backgroundColor: "#fff",
    },
    innerbody: {
      margin: 20,
    },
    bodyText: {
      fontSize: 20,
      textAlign: "center",
      color: theme.colors.$pink,
      marginTop: 12,
      marginBottom: 10,
      fontFamily: theme.fonts.$serifReg,
    },
    heading: {
      fontFamily: theme.fonts.$serifReg,
      fontSize: 17,
      marginTop: 5,
      color: theme.colors.$light_green,
    },
    contant: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 14,
      color: theme.colors.$text,
      fontWeight: 400,
      fontFamily: theme.fonts.$sansReg,
    },
    miniheading: {
      fontWeight: 600,
      color: theme.colors.$text,
    },
  });

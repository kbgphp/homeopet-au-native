import React from "react";
import { StyleSheet, Text, Image, View, ScrollView, } from "react-native";
import { useWindowDimensions } from 'react-native';
import { useTheme } from "react-native-paper";
import { NavBar } from "../../../components/global";
import RenderHtml from 'react-native-render-html';
import { useSelector } from 'react-redux';

export default function About(props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { width } = useWindowDimensions();
  const ABOUT = useSelector((state) => state.appData.BIG_DATA.about);
  const source = { html: `${ABOUT[0]?.content}` };
  return (
    <>
      <NavBar props={props} />
      <ScrollView style={styles.section}>
        <Image source={{ uri: ABOUT[0]?.banner_url, }} style={{ width: "100%", height: 180 }} />

        <View style={styles.container}>
          <Text style={styles.pageTitle}>{"About Us"}</Text>
          <View>
            <Text style={styles.pageDesc}>
              HomeoPet LLC is a AU Owned family business , with its origins
              rooted deep in the wilds of the South West of ireland.
            </Text>
          </View>

          <View>
            <RenderHtml contentWidth={width} source={source} />
          </View>
        </View>
      </ScrollView>

    </>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    section: {
      backgroundColor: "#fff",
    },
    container: {
      margin: 20,
    },
    pageTitle: {
      marginTop: 14,
      marginBottom: 12,
      fontSize: theme.fonts.$font_xl,
      textAlign: "center",
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$serifReg,
    },
    pageDesc: {
      fontFamily: theme.fonts.$serifReg,
      fontSize: 17,
      marginTop: 5,
      color: theme.colors.$light_green,
    }

  });

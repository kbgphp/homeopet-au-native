import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { useTheme } from "react-native-paper";

import { NavBar } from "../../../components/global";

import { List, MD3Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { ActivityLoader } from "../../../components/elements";
import { _REST } from "../../../services";

export default function FAQs(props) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [expanded, setExpanded] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState([]);
  const [feqdata, setfeqData] = React.useState([]);

  React.useEffect(() => {
    fetchFaqData();
  }, []);

  const fetchFaqData = async () => {
    const res = await _REST.CUSTOM_POST("pages", { page: "faq" });
    if (res?.data) setfeqData(res?.data);
  };

  const toggleItem = (i) => {
    if (expandedItems.includes(i)) {
      setExpandedItems(expandedItems.filter((item) => item !== i));
    } else {
      setExpandedItems([...expandedItems, i]);
    }
    //  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const renderItem = ({ item, index }) => {
    const expanded = expandedItems.includes(index);

    return (
      <View style={styles.body}>
        <View style={styles.innerbody}>
          <View key={index}>
            <View>
              <TouchableOpacity
                style={styles.accordHeader}
                onPress={() => toggleItem(index)}
                activeOpacity={0.9}
              >
                <Icon
                  name={expanded ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#bbb"
                />

                <Text style={[styles.inneracc, expanded && styles.ques]}>
                  {item.ques}
                </Text>
              </TouchableOpacity>
            </View>

            {expanded && (
              <View style={styles.accordBody}>
                <Text style={styles.listitem}>{item.ans}</Text>
              </View>
            )}
            <View style={styles.devider} />
          </View>
        </View>
      </View>
    );
  };

  const header = () => (
    <View style={styles.body}>
      <Text style={styles.bodyText}>{"FAQs"}</Text>

      <View style={styles.innerbody}>
        <View>
          <Text style={styles.heading}>
            We have compiled an FAQ to help answer some of the more common
            questions asked about HomeoPet.
          </Text>
        </View>

        <View>
          <Text style={styles.contant}>
            If for any reason you don't find what you're looking for, please
            feel free to contact us or drop us an email with your questions. One
            of our customer support staff will do their very best to address
            your query. Alternatively, you can call us on our Toll-Free number
            which you will find at the top right of our homepage, or click here
            for more details.
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <NavBar props={props} />

      {feqdata?.faq && feqdata?.faq?.length > 0 ? (
        <FlatList
          data={feqdata?.faq}
          renderItem={renderItem}
          ListHeaderComponent={header}
        />
      ) : (
        <ActivityLoader />
      )}
    </>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    body: {
      backgroundColor: "#ffff",
    },
    innerbody: {
      marginHorizontal: 20,
      backgroundColor: "#ffff",
    },
    bodyText: {
      fontSize: 20,
      textAlign: "center",
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$serifReg,
      marginBottom: 10,
      marginTop: 10,
    },
    heading: {
      color: theme.colors.$light_green,
      fontFamily: theme.fonts.$serifReg,
      fontSize: 18,
      paddingRight: 20,
    },
    contant: {
      marginBottom: 15,
      marginTop: 15,
      color: theme.colors.$text,
      fontFamily: theme.fonts.$sansReg,
      fontSize: 14,
    },
    Accordion: {
      marginTop: 5,
      marginBottom: 5,
    },

    inneracc: {
      fontSize: 12,
      color: "#666",
      marginLeft: 10,
    },
    listitem: {
      fontSize: 12,
      color: "#666",
      marginHorizontal: 26,
      marginVertical: 10,
    },
    accordHeader: {
      justifyContent: "flex-start",
      flexDirection: "row",
    },
    devider: {
      height: 1,
      backgroundColor: "#ccc",

      marginTop: 5,
      marginBottom: 5,
    },
    loader: {
      flex: 1,
      height: 250,
      justifyContent: "center",
      alignItems: "center",
    },
    ques: {
      color: theme.colors.$light_green,
    },
  });

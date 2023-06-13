import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";

import { ActivityLoader } from "../../../components/elements";
import { NavBar } from "../../../components/global";


export default function FAQs(props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [expanded, setExpanded] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState([]);
  const FAQs = useSelector((state) => state.appData.BIG_DATA.faqs);


  const toggleItem = (i) => {
    if (expandedItems.includes(i)) {
      setExpandedItems(expandedItems.filter((item) => item !== i));
    } else {
      setExpandedItems([...expandedItems, i]);
    }
    setExpanded(!expanded);
  };

  const renderItem = ({ item, index }) => {
    const expanded = expandedItems.includes(index);

    return (
      <View style={styles.section}>
        <View style={styles.container}>
          <View key={index}>
            <View>
              <TouchableOpacity
                style={styles.accordHeader}
                onPress={() => toggleItem(index)}
                activeOpacity={0.9}
              >
                <Icon name={expanded ? "chevron-up" : "chevron-down"} size={16} color="#bbb" />
                <Text style={[styles.header, expanded && styles.ques]}>{item.ques}</Text>
              </TouchableOpacity>
            </View>

            {expanded && (
              <View style={styles.accordBody}>
                <Text style={styles.listitem}>{item.ans}</Text>
              </View>
            )}
            <View style={styles.divider} />
          </View>
        </View>
      </View>
    );
  };

  const header = () => (
    <View style={styles.section}>
      <Text style={styles.pageTitle}>{"FAQs"}</Text>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}> We have compiled an FAQ to help answer some of the more common questions asked about HomeoPet.</Text>
        </View>
        <View>
          <Text style={styles.pageDesc}>
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
      {FAQs?.faq && FAQs?.faq?.length > 0 ? (
        <FlatList
          data={FAQs?.faq}
          renderItem={renderItem}
          ListHeaderComponent={header}
          style={{backgroundColor:'#ffffff'}}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ActivityLoader />
      )}
    </>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    section: {
      backgroundColor: "#ffffff",
    },
    container: {
      marginHorizontal: 20,
      backgroundColor: "#ffffff",
    },
    pageTitle: {
      marginTop:14,
      marginBottom:12,
      fontSize: theme.fonts.$font_xl,
      textAlign: "center",
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$serifReg,
    },
    heading: {
      color: theme.colors.$light_green,
      fontFamily: theme.fonts.$sansReg,
      fontSize: theme.fonts.$font_md,
      paddingRight: 20,
    },
    pageDesc: {
      marginVertical:16,
      color: theme.colors.$text,
      fontFamily: theme.fonts.$sansReg,
      fontSize: theme.fonts.$font_sm,
    },
    Accordion: {
      marginVertical:5
    },

    header: {
      fontSize: theme.fonts.$font_xs,
      color: theme.colors.$text,
      marginLeft: 10,
    },
    listitem: {
      fontSize: theme.fonts.$font_xs,
      color: theme.colors.$text,
      marginHorizontal: 26,
      marginVertical: 10,
    },
    accordHeader: {
      justifyContent: "flex-start",
      flexDirection: "row",
    },
    divider: {
      height: 1.5,
      backgroundColor:  theme.colors.$border,
      marginVertical: 5

    },
    loader: {
      flex: 1,
      height: 250,
      justifyContent: "center",
      alignItems: "center",
    },
    ques: {
      color: theme.colors.$light_green,
      fontFamily: theme.fonts.$sansBold,
    },
  });

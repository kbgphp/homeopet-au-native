import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";

import { useTheme } from "react-native-paper";
import { NavBar } from "../../../components/global";
import Swiper from "react-native-web-swiper";

export default function ContactUs(props) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [emailValidError, setEmailValidError] = React.useState("");
  const [validate, setValidate] = React.useState(false);

  const handleValidEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (val.length === 0) {
      setEmailValidError("Required*");
    } else if (reg.test(val) === false) {
      setEmailValidError("enter valid email address");
    } else if (reg.test(val) === true) {
      setEmailValidError("");
      setEmail(val);
    }
  };

  const handleSubmit = () => {
    if (!name || !email || !subject || !message) {
      setValidate(true);
    } else {
      console.warn("all data", name, email, subject, message);
    }
  };

  return (
    <>
      <NavBar props={props} />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >

        <View style={styles.innerbody}>
          <Text style={styles.bodyText}>{"Contact Us"}</Text>

          <View>
            <View>
              <Text style={styles.headerText}>
                Our <Text style={styles.span}>FAQ page</Text> provides answers to
                some of the more common question about our products.However,if you
                haven't found the answer to your question or for any other
                information,please contact us using the form below and we''ll get
                back to you as soon as we can.
              </Text>
            </View>

            <Swiper
              innerContainerStyle={{ height: 230 }}
              controlsProps={{ prevPos: false, nextPos: false }}
            >
              <View>
                <Text style={styles.addressHeader}>HomeoPet Australia</Text>
                <Text style={styles.addressText}>HomeoPet Australia Pty Ltd</Text>
                <Text style={styles.addressText}>JErvis bay , NSW Australia</Text>
                <Text style={styles.addressText}>Phone : +612 443 9669</Text>
                <Text style={styles.addressText}>
                  Email :{" "}
                  <Text style={styles.addressHighlight}>
                    Info@homeopet.com.au
                  </Text>
                </Text>
                <Text style={styles.addressText}>
                  Website :{" "}
                  <Text style={styles.addressHighlight}> www.homeopet.au</Text>
                </Text>
              </View>

              <View>
                <Text style={styles.addressHeader}>HomeoPet Australia</Text>
                <Text style={styles.addressText}>HomeoPet Australia Pty Ltd</Text>
                <Text style={styles.addressText}>JErvis bay , NSW Australia</Text>
                <Text style={styles.addressText}>Phone : +612 443 9669</Text>
                <Text style={styles.addressText}>
                  Email :{" "}
                  <Text style={styles.addressHighlight}>
                    Info@homeopet.com.au
                  </Text>
                </Text>
                <Text style={styles.addressText}>
                  Website :{" "}
                  <Text style={styles.addressHighlight}> www.homeopet.au</Text>
                </Text>
              </View>
            </Swiper>
          </View>

          {/* contact us form */}
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.bodyText}>Get in touch</Text>
            </View>

            <View>
              <Text style={styles.inputLable}>Your Name (required)</Text>
              <View style={styles.inputfield}>
                <TextInput value={name} onChangeText={(e) => setName(e)} />
              </View>

              <View style={{ marginBottom: 10 }}>
                {validate && !name && <Text style={styles.error}>Required*</Text>}
              </View>
            </View>

            <View>
              <Text style={styles.inputLable}>Your Email (required)</Text>
              <View style={styles.inputfield}>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    handleValidEmail(value);
                  }}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                {emailValidError ? (
                  <Text style={styles.error}>{emailValidError}</Text>
                ) : null}
              </View>
            </View>

            <View>
              <Text style={styles.inputLable}>Subject (required)</Text>
              <View style={styles.inputfield}>
                <TextInput
                  value={subject}
                  onChangeText={(value) => setSubject(value)}
                />
              </View>

              <View style={{ marginBottom: 10 }}>
                {validate && !subject && (
                  <Text style={styles.error}>Required*</Text>
                )}
              </View>
            </View>

            <View>
              <Text style={styles.inputLable}>Your Message (required)</Text>
              <View style={styles.inputfield}>
                <TextInput
                  multiline
                  numberOfLines={4}
                  value={message}
                  onChangeText={(value) => setMessage(value)}
                />
              </View>
              <View style={{ marginBottom: 15 }}>
                {validate && !message && (
                  <Text style={styles.error}>Required*</Text>
                )}
              </View>
            </View>

            <View style={styles.button}>
              <Button
                title="Send"
                onPress={handleSubmit}
                color={theme.colors.$pink}
              />
            </View>
          </View>
        </View>

      </ScrollView>

    </>

  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    body: {
      backgroundColor: "#ffff",
      flex: 1,
    },
    innerbody: {
      marginLeft: 20,
      marginRight: 20,
    },
    bodyText: {
      fontSize: 20,
      textAlign: "center",
      color: theme.colors.$pink,
      marginTop: 22,
      marginBottom: 10,

      fontWeight: 400,
      fontFamily: theme.fonts.$serifReg,
    },
    headerText: {
      fontSize: 18,
      color: theme.colors.$light_green,
      paddingBottom: 22,
      fontFamily: theme.fonts.$serifReg,
    },
    span: {
      fontSize: 20,
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$serifReg,
    },
    addressHeader: {
      color: theme.colors.$light_green,
      fontSize: 18,
      fontFamily: theme.fonts.$serifReg,
    },
    addressText: {
      color: theme.colors.$text,
      fontFamily: theme.fonts.$sansReg,
      fontSize: 14,
    },
    addressHighlight: {
      color: theme.colors.$pink,
    },
    inputfield: {
      padding: 8,
      height: 43,
      borderColor: "lightgray",
      borderWidth: 1,
      marginBottom: 12,
    },

    inputLable: {
      fontSize: 12,
      color: "#0000008f",
      fontFamily: theme.fonts.$sansReg,
      fontWeight: 700,
      marginBottom: 4,
    },
    error: {
      color: "#df3e3e",
      fontSize: 11,
      textAlign: "left",
    },
    button: {
      width: 260,
      marginBottom: 20,
    },
  });

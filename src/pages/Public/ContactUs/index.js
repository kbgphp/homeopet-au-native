import React from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, Button, } from "react-native";
import Swiper from "react-native-web-swiper";
import { useSelector } from 'react-redux';
import { useTheme } from "react-native-paper";
import { NavBar } from "@src/components/global";
import { _REST } from "@src/services";
import { ActivityLoader } from '@src/components/elements';
import { TOAST } from "@src/utils";


export default function ContactUs(props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [emailValidError, setEmailValidError] = React.useState("");
  const [validate, setValidate] = React.useState(false);
  const [contactLoader, setContactLoader] = React.useState(false);
  const contactData = useSelector((state) => state.appData.BIG_DATA.contact[0]);

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

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      setValidate(true);
    } else {
      setContactLoader(true);
      const res = await _REST.CUSTOM_POST("contact", {
        full_name: name,
        email: email,
        subject: subject,
        message: message,
        origin: "au"
      });

      if (res?.data?.contact_id) {
        setContactLoader(false);
        TOAST.show("success", "successfully submitted");
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    }
  };


  return (
    <>
      <NavBar props={props} />
      <ScrollView
        style={styles.section}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.innerSection}>
          <Text style={styles.pageTitle}>{"Contact Us"}</Text>
          <View>
            <View>
              <Text style={styles.pageDesc}>{contactData?.heading}</Text>
            </View>

            {contactData?.address && contactData?.address?.length > 0 ?
              <Swiper
                innerContainerStyle={{ height: 160 }}
                controlsEnabled={false}
              >
                {contactData?.address?.map((ele,i) => (
                  <View key={i}>
                    {ele?.name && <Text style={styles.addressHeader}>{ele?.name}</Text>}
                    {ele?.company && <Text style={styles.addressText}>{ele?.company}</Text>}
                    {ele?.address && <Text style={styles.addressText}>{ele?.address}</Text>}
                    {ele?.distribution &&
                      <Text>
                        <Text style={styles.bold}>Distribution : </Text>
                        <Text style={styles.addressText}>{ele?.distribution}</Text>
                      </Text>
                    }

                    {ele?.phone?.home &&
                      <Text >
                        <Text style={styles.bold}>Home : </Text>
                        <Text style={styles.addressText}>{ele?.phone?.home}</Text>
                      </Text>
                    }

                    {ele?.phone?.isd &&
                      <Text >
                        <Text style={styles.bold}>INTL. : </Text>
                        <Text style={styles.addressText}>{ele?.phone?.isd}</Text>
                      </Text>
                    }

                    {
                      ele?.email &&
                      <Text >
                        <Text style={styles.bold}>Email : </Text>
                        <Text style={styles?.addressHighlight}>
                          {ele.email}
                        </Text>
                      </Text>
                    }

                    {
                      ele?.website &&
                      <Text >
                        <Text style={styles.bold}>Website :{" "}</Text>
                        <Text style={styles.addressHighlight}> {ele?.website}</Text>
                      </Text>
                    }
                  </View>
                )
                )}
              </Swiper> : <ActivityLoader />
            }

          </View>
          {/* contact us form */}
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.formHeader}>Get in touch</Text>
            </View>
            <View>
              <Text style={styles.inputLabel}>Your Name*</Text>
              <View style={styles.inputField}>
                <TextInput value={name} onChangeText={(e) => setName(e)} />
              </View>
              <View style={{ marginBottom: 10 }}>
                {validate && !name && <Text style={styles.error}>Required*</Text>}
              </View>
            </View>

            <View>
              <Text style={styles.inputLabel}>Your Email*</Text>
              <View style={styles.inputField}>
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
              <Text style={styles.inputLabel}>Subject*</Text>
              <View style={styles.inputField}>
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
              <Text style={styles.inputLabel}>Your Message*</Text>
              <View style={styles.inputField}>
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
                title={contactLoader ? "Sending.." : "Send"}
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
    section: {
      backgroundColor: "#ffffff",
      flex: 1,
    },
    innerSection: {
      marginLeft: 20,
      marginRight: 20,
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
      fontSize: theme.fonts.$font_sm,
      color: theme.colors.$text,
      paddingBottom: 22,
      fontFamily: theme.fonts.$sansReg,
    },
    link: {
      fontSize: theme.fonts.$font_std,
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$serifReg,
    },
    addressHeader: {
      color: theme.colors.$light_green,
      fontSize: theme.fonts.$font_md,
      fontFamily: theme.fonts.$serifReg,
    },
    addressText: {
      color: theme.colors.$text,
      fontFamily: theme.fonts.$sansReg,
      fontSize: theme.fonts.$font_sm,
    },
    addressHighlight: {
      color: theme.colors.$pink,
    },
    bold: {
      color: theme.colors.$text,
      fontFamily: theme.fonts.$sansBold,
    },
    formHeader:{
      fontSize: theme.fonts.$font_std,
      color: theme.colors.$pink,
      fontFamily: theme.fonts.$serifBold,
      marginBottom:18
    },
    inputField: {
      paddingVertical: 0,
      paddingHorizontal: 10,
      height: 43,
      borderColor: theme.colors.$border,
      borderWidth: 1,
      marginBottom: 12,
    },
    inputLabel: {
      fontSize: theme.fonts.$font_xs,
      color: theme.colors.$text,
      fontFamily: theme.fonts.$sansBold,
      marginBottom: 4,
    },
    error: {
      color: theme.colors.$error,
      fontSize: theme.fonts.$font_xs,
      textAlign: "left",
    },
    button: {
      width: 260,
      marginBottom: 20,
    },
  });
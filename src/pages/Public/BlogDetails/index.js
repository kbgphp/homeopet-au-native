import React from 'react';
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useTheme } from 'react-native-paper';
import { ActivityLoader, BlogImage } from '@src/components/elements';
import { BackTextButton } from "@src/components/global";
import { _REST } from "@src/services";

export default function BlogDetails(props) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [blogDetails, setBlogDetails] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await _REST.CUSTOM_POST("single-blog-data", { id: props?.route?.params?.id });
            setIsLoading(false);
            if (res?.data) {
                setBlogDetails(res?.data[0]);
            }
        };
        getData();
    }, [])


    return (
        <>
            <BackTextButton props={props} />
            {isLoading ? <ActivityLoader /> :
                <ScrollView style={styles.rootContainer}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                >
                    <View style={{}}>
                        <View style={{}}>
                            <Text style={styles.topRightHeader}>HomeoPet Natural Pet Care Center</Text>
                            <View style={{}}>
                                <Text style={styles.tags}>{blogDetails?.tags ? blogDetails?.tags : 'HEALTH ISSUES IN PETS'}</Text>
                                <Text style={styles.blogHeader}>{blogDetails?.title}</Text>
                            </View>
                            <View style={styles.divider}></View>
                            <Text style={styles.postDate}>POSTED ON {" "}
                                <Text style={{ color: theme.colors.$pink }}>{blogDetails?.date?.day} {blogDetails?.date?.month}</Text>
                                {" "} BY {" "}
                                <Text style={{ color: theme.colors.$pink }}> {blogDetails?.author}</Text>
                            </Text>
                        </View>
                        <BlogImage image={blogDetails?.image} day={blogDetails?.date?.day} month={blogDetails?.date?.month} />
                        <Text style={styles.blogDetailsContent}>{blogDetails?.description}</Text>
                    </View>
                </ScrollView>
            }
        </>
    );
}



const makeStyles = (theme) =>
    StyleSheet.create({
        rootContainer: {
            backgroundColor: theme.colors.$white,
            flex: 1,
            paddingHorizontal: 20
        },
        topRightHeader: {
            textAlign: "right",
            marginVertical: 12,
            textDecorationLine: "underline",
            color: theme.colors.$pink,
            fontFamily: theme.fonts.$sansReg,
        },
        tags: {
            color: theme.colors.$pink,
            fontSize: theme.fonts.$sm,
            justifyContent: "center",
            textTransform: 'capitalize',
            maxWidth: 300,
            fontFamily: theme.fonts.$sansReg,
            paddingBottom: 8
        },
        blogHeader: {
            color: theme.colors.$pink,
            fontSize: theme.fonts.$font_lg,
            fontFamily: theme.fonts.$sansReg,
            marginBottom: 10,
        },
        divider: {
            width: 40,
            height: 3,
            backgroundColor: theme.colors.$border,
            marginVertical: 6,
        },
        postDate: {
            marginVertical: 6,
            marginBottom: 12,
            color: theme.colors.$text,
            fontSize: theme.fonts.$font_xs,
            fontFamily: theme.fonts.$sansReg,
            textTransform: 'uppercase'
        },
        imgContainer: {
            width: "100%",
            height: 200,
            position: 'relative'
        },
        blogDetailsContent: {
            fontFamily: theme.fonts.$sansReg,
            color: theme.colors.$text,
            fontSize: theme.fonts.$font_xs,
            marginVertical: 12
        },
    });

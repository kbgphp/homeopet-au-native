import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavBar, ProductListItem, Disclaimer, ProblemAreaKey } from "../../../components/global"
import { PinkHeaderWithBird, ActivityLoader, NoDataFound } from "../../../components/elements"
import Canine from "./components/Canine"
import Feline from "./components/Feline"
import Equine from "./components/Equine"
import SegmentSelector from "./components/SegmentSelector";
import { _REST } from '../../../services';
import Spinner from 'react-native-loading-spinner-overlay';

export default function SymptomsCheckerTab(props) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [selectedPet, setSelectedPet] = React.useState('canine');
    const [symptomPoint, setSymptomPoint] = React.useState(null);
    const [areaExpanded, setAreaExpanded] = React.useState(true);

    const [isSymptomsLoading, setIsSymptomsLoading] = React.useState(false);
    const [isSymptomsDataLoaded, setIsSymptomsDataLoaded] = React.useState(false);
    const [symptomIndex, setSymptomIndex] = React.useState(null);

    const [symptomsList, setSymptomsList] = React.useState([]);
    const [symptomTypeName, setSymptomTypeName] = React.useState('');

    const [causesList, setCausesList] = React.useState([]);
    const [productsList, setProductsList] = React.useState([]);
    const [isCauseAndMedLoaded, setIsCauseAndMedLoaded] = React.useState(false);


    React.useEffect(() => {
        const fetchSymptoms = async () => {
            if (!!symptomPoint) {
                setAreaExpanded(false); setIsSymptomsLoading(true);
                const pet = selectedPet === 'canine' ? 'Dog' : selectedPet === 'feline' ? 'Cat' : 'Horse';
                const res = await _REST.CUSTOM_POST("symptoms", { identifier: symptomPoint });
                setSymptomsList(res?.data);
                setSymptomTypeName(symptomPoint.replace(/_/g, ' ').split(" ").slice(1).join(" "));
                setIsSymptomsDataLoaded(true)
                setIsSymptomsLoading(false);
                scrollRef.current?.scrollTo({ y: 600, animated: true });
            }
        };
        fetchSymptoms()
    }, [symptomPoint])

    const scrollRef = React.useRef();

    const fetchCausesAndProducts = async (symptom_id) => {
        setIsSymptomsLoading(true);
        const res = await _REST.CUSTOM_POST("cause", { symptom_id, origin: 'au' });
        setCausesList(res?.data?.causes);
        setProductsList(res?.data?.medicines);
        setIsCauseAndMedLoaded(true);
        setIsSymptomsLoading(false);
        scrollRef.current?.scrollTo({ y: 800, animated: true });
    };


    return (
        <>
            <NavBar props={props} />
            <ScrollView style={styles.scrollView}
                ref={scrollRef}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
            >
                {isSymptomsLoading && <Spinner visible customIndicator={<ActivityLoader />} />}
                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <PinkHeaderWithBird text={'Symptom Checker'} />
                    </View>
                </View>

                <SegmentSelector selectedPet={selectedPet} setSelectedPet={setSelectedPet} />

                {selectedPet === 'canine' && <Canine symptomPoint={symptomPoint} setSymptomPoint={setSymptomPoint} />}
                {selectedPet === 'feline' && <Feline symptomPoint={symptomPoint} setSymptomPoint={setSymptomPoint} />}
                {selectedPet === 'equine' && <Equine symptomPoint={symptomPoint} setSymptomPoint={setSymptomPoint} />}

                {(symptomPoint && isSymptomsDataLoaded) ? (
                    <View style={{ paddingHorizontal: 20 }} >
                        {!!symptomsList && !!symptomsList.length > 0 ? (
                            <View>
                                <Text style={styles.symptomType}>{symptomTypeName}</Text>
                                <Text style={styles.subHeader}>Select Symptom</Text>
                                {symptomsList.map((item, i) => (
                                    <TouchableOpacity key={i} activeOpacity={.8} onPress={() => { setSymptomIndex(i); fetchCausesAndProducts(item?.id) }} >
                                        <Text style={[styles.symptomText, symptomIndex === i ? styles.selectedSymptom : '']}>{item?.symptom}</Text>
                                    </TouchableOpacity>

                                ))}
                            </View>
                        ) : (
                            <NoDataFound text={'No data found'} />
                        )}
                    </View>
                ) : null}


                {(symptomIndex >= 0 && isCauseAndMedLoaded) ? (
                    <View>
                        {(causesList && causesList?.length > 0) ?
                            <View style={styles.possibleCauses}>
                                <Text style={styles.subHeader}>Possible Causes</Text>
                                {causesList?.map((item, i) => (
                                    <View key={i} >
                                        <Text style={[styles.symptomText, { marginBottom: 2 }]}>{i + 1}.{" "}{item?.value}</Text>
                                    </View>
                                ))}
                            </View> : null
                        }

                        {(productsList && productsList?.length > 0) ?
                            <View style={styles.recommendedFormulas}>
                                <Text style={[styles.subHeader, { paddingHorizontal: 20 }]}>Recommended {(productsList?.length > 1 ? 'Medicines' : 'Medicine')}</Text>
                                {productsList.map((item, i) => (
                                    <View key={i}>
                                        <ProductListItem props={props} data={item} img={item?.featured_image} />
                                    </View>
                                ))}
                            </View>
                            :
                            <NoDataFound text={'No product found'} />
                        }
                    </View>
                ) : null}


            </ScrollView>

            <ProblemAreaKey areaExpanded={areaExpanded} setAreaExpanded={setAreaExpanded} />
            <Disclaimer />
        </>
    );
}


const makeStyles = (theme) => StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: theme.colors.$white,
    },
    symptomType: {
        fontSize: theme.fonts.$font_md,
        color: theme.colors.$light_green,
        fontFamily: theme.fonts.$serifReg,
        marginVertical: 4,
        textTransform: 'capitalize'
    },
    subHeader: {
        fontSize: theme.fonts.$font_sm,
        color: theme.colors.$light_green,
        fontFamily: theme.fonts.$sansReg,
        marginBottom: 4
    },
    symptomText: {
        fontSize: theme.fonts.$font_xs,
        color: theme.colors.$text,
        fontFamily: theme.fonts.$sansReg,
        marginBottom: 6
    },
    selectedSymptom: {
        textDecorationLine: 'underline',
        color: theme.colors.$light_green,
    },
    possibleCauses: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: theme.colors.$border,
        borderStyle: 'solid'
    },
    recommendedFormulas: {
        paddingTop: 18
    }
});

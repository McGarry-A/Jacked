import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "native-base";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store";
import { startWorkout } from "../../store/currentWorkoutSlice";
import { faFolder } from "@fortawesome/free-regular-svg-icons/faFolder";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Folder from "../../components/Templates/Folder";
import AddFolderModal from "../../components/Modals/AddFolderModal";
import { useState } from "react";
import CtaButton from "../../components/Layout/Buttons/CtaButton";
import useColorScheme from "../../hooks/useColorScheme";
import useTemplatesAndFolders from "../../hooks/useTemplatesAndFolders";
import { constants } from "../../constants";

export default function Start() {
    const [folderModalIsVisible, setFolderModalIsVisible] =
        useState<boolean>(false);

    const { userId } = useAppSelector((state) => state.userSlice.user);
    const { folders, status } = useAppSelector((state) => state.templateSlice);
    const { isActive } = useAppSelector((state) => state.currentWorkoutSlice);

    const {
        h1ColorMode,
        h2ColorMode,
        buttonColorMode,
        ctaIconColorMode,
        screenColorMode,
    } = useColorScheme();

    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    // NOTE: This is a temporary solution to get the folders and templates
    useTemplatesAndFolders();

    const handlePressQuickStart = () => {
        dispatch(startWorkout({ userId }));
        navigation.navigate("ActiveWorkout");
    };

    const handleContinueWorkout = () => {
        navigation.navigate("ActiveWorkout");
    };

    const renderHeading = () => (
        <Text style={styles.startHeading}>Start A Workout</Text>
    );

    const renderQuickStart = () => (
        <View style={styles.quickStartContainer}>
            <Text style={styles.quickStartHeading}>Quick Start</Text>
            {renderStartOrContinue()}
        </View>
    );

    const renderStartOrContinue = () => {
        if (!isActive) {
            return (
                <Pressable onPress={handlePressQuickStart} style={styles.quickStartCta}>
                    <Text style={styles.quickStartCtaText}>Start an Empty Workout</Text>
                </Pressable>
            );
        }

        return (
            <Pressable onPress={handleContinueWorkout} style={styles.continueCta}>
                <Text style={styles.continueCtaText}>Continue Workout</Text>
            </Pressable>
        );
    };

    const renderTemplatesSectionHeader = () => (
        <View style={styles.templateContainer}>
            <Text style={styles.templateHeader}>Folders</Text>
            <CtaButton
                onPress={() => setFolderModalIsVisible(true)}
                leftIcon={
                    <FontAwesomeIcon icon={faFolder} color={ctaIconColorMode} size={12} />
                }
            >
                Add Folder
            </CtaButton>
        </View>
    );

    const renderFolders = () => {
        const isLoaded = status === "fulfilled";
        return (
            <>
                {renderTemplatesSectionHeader()}
                <Skeleton h={"48"} endColor={"gray.200"} isLoaded={isLoaded}>
                    {Object.values(folders).map(({ id, name, templates }) => {
                        return (
                            <Folder key={id} templates={templates} id={id} name={name} />
                        );
                    })}
                </Skeleton>
            </>
        );
    };

    const renderAddFolderModal = () => {
        return (
            <AddFolderModal
                isVisible={folderModalIsVisible}
                setIsVisible={setFolderModalIsVisible}
            />
        );
    };

    return (
        <View style={styles.startContainer}>
            <View style={styles.mainContainer}>
                {renderHeading()}
                {renderQuickStart()}
                {renderFolders()}
            </View>
            {renderAddFolderModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    startContainer: {
        padding: 12,
        backgroundColor: "white",
        flex: 1,
    },

    mainContainer: {
        flexDirection: "column",
        gap: 4,
    },

    templateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    templateHeader: {
        fontSize: constants.fonts.heading.size.xs,
        fontWeight: "bold",
    },

    startHeading: {
        fontSize: constants.fonts.heading.size.md,
        marginVertical: 4,
        fontWeight: "bold",
    },

    quickStartContainer: {
        marginVertical: 4,
    },

    quickStartHeading: {
        fontSize: constants.fonts.heading.size.xs,
        fontWeight: "bold",
    },

    quickStartCta: {
        backgroundColor: "skyblue",
        borderRadius: 4,
        overflow: "hidden",
        marginVertical: 8
    },

    quickStartCtaText: {
        margin: 8,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },

    continueCta: {
        backgroundColor: "success",
        borderRadius: 4,
        overflow: "hidden",
        marginVertical: 8
    },

    continueCtaText: {
        margin: 8,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    }
});


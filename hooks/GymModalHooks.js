import {useState} from "react";


export default function GymModalHooks() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedGymInfo, setSelectedGymInfo] = useState(null);

    const openGymModal = (gym) => {
        setModalVisible(true);
        setSelectedGymInfo(gym);
    };

    const closeGymModal = () => {

        setModalVisible(false);
        setSelectedGymInfo(null);
    };



    return{
        modalVisible,
        selectedGymInfo,
        openGymModal,
        closeGymModal,

    }
}
